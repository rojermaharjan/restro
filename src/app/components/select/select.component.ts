import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild, forwardRef, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, Validator, ValidationErrors, FormControl } from '@angular/forms';
import { fromEvent, of } from 'rxjs';
import { distinctUntilChanged, switchMap, debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    }
  ]
})
export class SelectComponent implements OnInit, ControlValueAccessor, Validator {

  @Input() options: Array<any>;
  @Input() displayKey: string;
  @Input() styleGuide: any;
  @Input() isDatalist: boolean;
  @Input() disable: boolean;
  @Input() searchKeys: Array<string>;

  @ViewChild('searchInput') searchInput: ElementRef;

  @Output() selectChange = new EventEmitter();

  selectedItem: any;
  searchTerm: FormControl;
  filterOptions: Array<any>;

  active = false;
  positionTop: any;
  positionRight: any;

  constructor(private el: ElementRef) {
    this.searchTerm = new FormControl();
  }

  private propagateChange = (_: any) => { };

  writeValue(obj: any): void {
    this.selectedItem = obj;
    obj && Object.keys(obj).length ? this.searchTerm.setValue(obj[this.displayKey] || obj) : null;
  }

  registerOnTouched(): void { }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  validate(): ValidationErrors {
    return this.selectedItem ? null : { required: true };
  }


  ngOnInit(): void {
    this.selectedItem = this.options[0];

    if (!this.displayKey && typeof this.options[0] === 'object') {
      this.displayKey = Object.keys(this.options[0])[0];
    }
    this.searchTerm.setValue(this.options[0][this.displayKey] || this.options[0]);
    this.filterOptions = Object.assign([], this.options);
    if (this.isDatalist) {
      this.initSearch();
    }
  }

  initSearch(): void {
    if ((!this.searchKeys || !this.searchKeys.length) && this.displayKey && typeof this.options[0] === 'object') {
      this.searchKeys = [this.displayKey];
    }
    else if (!this.displayKey || typeof this.options[0] !== 'object') {
      this.searchKeys = ['0'];
    }

    fromEvent(this.searchInput.nativeElement, 'input')
      .pipe(
        map((e: any) => e.target.value),
        debounceTime(100),
        distinctUntilChanged(),
        switchMap(term => {
          return of(
            this.options.filter(option => {
              for (let i = 0, len = this.searchKeys.length; i < len; i++) {
                if (typeof option === 'object' && option[this.searchKeys[i]].toString().toLowerCase().indexOf(term.toLowerCase()) > -1) {
                  return option;
                } else if (typeof option !== 'object' && option.toString().toLowerCase().indexOf(term.toLowerCase()) > -1) {
                  return option;
                }
              }
            })
          )
        }
        ))
      .subscribe(list => {
        this.filterOptions = list;
      });
  }

  changeValue(option: any): void {
    this.searchTerm.setValue(option[this.displayKey] || option);
    this.propagateChange(option);
    this.selectChange.emit(option);
    this.selectedItem = option;
    this.filterOptions = this.isDatalist ? Object.assign([], this.options) : this.filterOptions;
  }

  closeDropdown(event: any): void {
    if (!this.el.nativeElement.contains(event.target)) {
      this.active = false;
      this.searchTerm.setValue(this.selectedItem[this.displayKey] || this.selectedItem);
      this.filterOptions = Object.assign([], this.options);
    }
  }
}
