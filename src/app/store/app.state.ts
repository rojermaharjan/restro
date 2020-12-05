import { IProduct } from '../product/product';
import { initTableState } from '../services/contracts/component.state';

export interface State {
    [key: string]: any;
}
export const INITIAL_STATE = {
    user: null,
    token: null,
    profiles: null,
};
export const AppState = () => {
    return {
        ...INITIAL_STATE,
        products_table: initTableState<IProduct>(),
        category_table: initTableState<any>(),
        users_table: initTableState<any>(),
        customers_table: initTableState<any>()

    };
};
