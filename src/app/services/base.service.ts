import {
  ListState,
  LoadStates,
  DetailState,
  IComponentState,
} from './contracts/component.state';
import { IStore } from './contracts/istore';
import { IStateService } from './contracts/iapiclient';
import { IRestService } from './contracts/irestservice';
import { DbQuery, Result, ResultList } from './contracts/dbquery';

export class BaseService<T> implements IStateService<T> {
  constructor(
    protected store: IStore,
    protected svc: IRestService,
    protected endpoint: string
  ) { }

  async loadMore(stateKey: string, filter: any, subpath = '/'): Promise<T[]> {
    try {
      const state = this.store.get(stateKey) as ListState<T>;

      if (
        state.loadMoreState === LoadStates.RESULTSEND ||
        state.loadMoreState === LoadStates.LOADING
      ) {
        return;
      }

      this.store.update(stateKey, {
        loadMoreState: LoadStates.LOADING,
      });
      const page = filter.page + 1;
      filter.page = page;

      const response = (await this.svc.get(
        this.endpoint + subpath,
        filter
      )) as ResultList<T>;
      const items = response.results;

      this.store.update(stateKey, {
        items: [...state.items, ...items],
        page,
      });
      if (items.length < filter.pageSize) {
        this.store.update(stateKey, {
          loadMoreState: LoadStates.RESULTSEND,
        });
      } else {
        this.store.update(stateKey, {
          loadMoreState: LoadStates.COMPLETE,
        });
      }

      return items;
    } catch (err) {
      this.store.update(stateKey, {
        loadMoreState: LoadStates.ERROR,
      });
      console.error(err);
      throw err;
    }
  }

  async refresh(stateKey: string, filter: DbQuery): Promise<T[]> {
    try {
      this.store.update(stateKey, { refreshState: LoadStates.LOADING });

      const items = (await this.svc.get(this.endpoint, filter)) as T[];

      this.store.update(stateKey, {
        items,
        page: 1,
        refreshState: LoadStates.COMPLETE,
        loadMoreState: LoadStates.COMPLETE,
      });

      return items;
    } catch (err) {
      this.store.update(stateKey, {
        refreshState: LoadStates.ERROR,
      });
      console.error(err);
      throw err;
    }
  }

  async getItems(
    stateKey: string,
    filter?: any,
    subpath = ''
  ): Promise<T[]> {
    try {
      this.store.update(stateKey, { state: LoadStates.LOADING });

      const response = (await this.svc.get(
        this.endpoint + subpath,
        filter
      )) as T[];

      const count = (await this.svc.get(
        this.endpoint + subpath + '/count',
        filter
      )) as number;

      const page = filter.page || 0;
      const items = response;
      const pageSize = filter.pageSize || 10;
      const total_rows = count;

      this.store.update(stateKey, {
        items,
        page,
        pageSize,
        total_rows,
      });

      if (items.length === 0) {
        this.store.update(stateKey, {
          state: LoadStates.NORESULT,
          loadMoreState: LoadStates.NORESULT,
        });
      } else if (items.length < pageSize) {
        this.store.update(stateKey, {
          loadMoreState: LoadStates.RESULTSEND,
          state: LoadStates.COMPLETE,
        });
      } else {
        this.store.update(stateKey, {
          state: LoadStates.COMPLETE,
          loadMoreState: LoadStates.INIT,
        });
      }

      return items;
    } catch (err) {
      this.store.update(stateKey, {
        state: LoadStates.ERROR,
      });
      console.error(err);
      throw err;
    }
  }

  async queryItems(
    stateKey: string,
    filter?: any,
    subpath = '/'
  ): Promise<T[]> {
    try {
      this.store.update(stateKey, { state: LoadStates.LOADING });

      const response = (await this.svc.post(
        `${this.endpoint}/query` + subpath,
        filter
      )) as ResultList<T>;

      const page = filter.page || 0;
      const items = response.results;
      const pageSize = filter.pageSize || 10;
      const total_rows = response.total_match;

      this.store.update(stateKey, {
        items,
        page,
        pageSize,
        total_rows,
      });

      if (items.length === 0) {
        this.store.update(stateKey, {
          state: LoadStates.NORESULT,
          loadMoreState: LoadStates.NORESULT,
        });
      } else if (items.length < pageSize) {
        this.store.update(stateKey, {
          loadMoreState: LoadStates.RESULTSEND,
          state: LoadStates.COMPLETE,
        });
      } else {
        this.store.update(stateKey, {
          state: LoadStates.COMPLETE,
          loadMoreState: LoadStates.INIT,
        });
      }

      return items;
    } catch (err) {
      this.store.update(stateKey, {
        state: LoadStates.ERROR,
      });
      console.error(err);
      throw err;
    }
  }

  async getItem(
    stateKey: string,
    id: any,
    filter?: any,
    subPath = '/'
  ): Promise<T> {
    try {
      this.store.update<DetailState<T>>(stateKey, {
        state: LoadStates.LOADING,
        item: null,
      });

      const item = (await this.svc.get(
        `${this.endpoint}${subPath}${encodeURIComponent(id)}`,
        filter
      )) as T;
      console.log('Get item: ', item);

      this.store.update(stateKey, {
        item,
        state: LoadStates.COMPLETE,
      });
      return item;
    } catch (err) {
      console.log('Get items error: ', err);
      this.store.update<DetailState<T>>(stateKey, {
        state: LoadStates.ERROR,
      });
    }
  }

  async setStateLoading(stateKey: string) {
    await this.store.update<DetailState<T>>(stateKey, {
      state: LoadStates.LOADING,
    });
  }

  async loadAll<S extends IComponentState<T>>(
    stateKey: string,
    filter?: any,
    initState?: S
  ) {
    try {
      await this.store.update(stateKey, { state: LoadStates.LOADING });
      const pageSize = 100;
      if (initState) {
        const state = initState;
        state.state = LoadStates.LOADING;
        await this.store.set(stateKey, state);
      }

      const loadAllFilter = {
        ...filter,
        pageSize: 100,
        page: 0,
      };

      const response: ResultList<T> = await this.svc.get(
        this.endpoint,
        loadAllFilter
      );
      const items = response.results;
      const total_rows = response.total_match;

      await this.store.update(stateKey, {
        items,
        total_rows,
        pageSize,
        page: 0,
      });
      if (items.length === 0) {
        this.store.update(stateKey, { state: LoadStates.NORESULT });
      } else {
        this.store.update(stateKey, { state: LoadStates.COMPLETE });
      }

      return items;
    } catch (err) {
      this.store.update(stateKey, {
        state: LoadStates.ERROR,
      });
      console.error(err);
      throw err;
    }
  }

  async upsert(data: any, stateKey?: string) {
    try {
      const res = data.id
        ? await this.svc.patch(
          `${this.endpoint}/${encodeURIComponent(data.id)}`,
          data
        )
        : await this.svc.put(this.endpoint, data);
      return res;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async findItem(stateKey: string, filter: any) {
    try {
      this.store.update<DetailState<T>>(stateKey, {
        state: LoadStates.LOADING,
        item: null,
      });

      const response = (await this.svc.get(
        `${this.endpoint}/find_by`,
        filter
      )) as Result<T>;

      this.store.update(stateKey, {
        item: response.result,
        state: LoadStates.COMPLETE,
      });
      return response.result;
    } catch (err) {
      this.store.update<DetailState<T>>(stateKey, {
        state: LoadStates.ERROR,
      });
    }
  }

  async deleteItem(stateKey: string, id: any) {
    try {
      await this.store.update(stateKey, { state: LoadStates.LOADING });
      const res = await this.svc.delete(`${this.endpoint}/${id}`);
      const state = this.store.get(stateKey);
      if (state.items && Array.isArray(state.items)) {
        const items = state.items.filter((i) => i.id !== id);
        await this.store.update(stateKey, { items: items });
      }
      await this.store.update(stateKey, { state: LoadStates.COMPLETE });
      return res;
    } catch (err) {
      await this.store.update(stateKey, { state: LoadStates.ERROR });
      throw err;
    }
  }

  async postItem(stateKey: string, data: any, subpath = '/') {
    try {
      await this.store.update(stateKey, { state: LoadStates.LOADING });
      const res = await this.svc.post(`${this.endpoint}${subpath}`, data);

      await this.store.update(stateKey, { state: LoadStates.COMPLETE });
      return res;
    } catch (err) {
      await this.store.update(stateKey, { state: LoadStates.ERROR });
      throw err;
    }
  }

  async deleteLocal(stateKey: string, predicate: (item) => boolean) {
    try {
      await this.store.update(stateKey, { state: LoadStates.LOADING });
      const state = this.store.get(stateKey);
      if (state.items && Array.isArray(state.items)) {
        const items = state.items.filter((i) => predicate(i));
        await this.store.update(stateKey, { items: items });
      }
      await this.store.update(stateKey, { state: LoadStates.COMPLETE });
    } catch (err) {
      await this.store.update(stateKey, { state: LoadStates.ERROR });
      throw err;
    }
  }

  async updateAll(stateKey: string, data: T[]): Promise<T[]> {
    try {
      await this.store.update(stateKey, { state: LoadStates.LOADING });
      const response = (await this.svc.post(
        `${this.endpoint}/update_all`,
        data
      )) as ResultList<T>;
      const items = response.results;
      await this.store.update(stateKey, {
        state: LoadStates.COMPLETE,
        items,
      });
      return items;
    } catch (err) {
      await this.store.update(stateKey, { state: LoadStates.ERROR });
      throw err;
    }
  }

  async importData(
    stateKey: string,
    data: T[],
    importRoute: string
  ): Promise<T[]> {
    try {
      await this.store.update(stateKey, { state: LoadStates.LOADING });
      const response = (await this.svc.post(
        `${this.endpoint}/${importRoute}`,
        data
      )) as ResultList<T>;
      const items = response.results;
      await this.store.update(stateKey, {
        state: LoadStates.COMPLETE,
        items,
      });
      return items;
    } catch (err) {
      await this.store.update(stateKey, { state: LoadStates.ERROR });
      throw err;
    }
  }
}
