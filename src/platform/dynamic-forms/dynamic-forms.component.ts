import { Component, Input, ChangeDetectorRef, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, FormArray, Validators, Form, FormControl } from '@angular/forms';

import { TdDynamicFormsService, ITdDynamicElementConfig, ITdFormGroup } from './services/dynamic-forms.service';
import { FormArrayUtils } from './services/form-arry-utils';

export enum constant {
  FORM_ARRAY = <any>'formArray',
}

@Component({
  selector: 'td-dynamic-forms',
  templateUrl: './dynamic-forms.component.html',
})
export class TdDynamicFormsComponent implements DoCheck {

  private _elements: string[];

  // dirty check
  private _elementsLength: number = 0;
  private _formArrayUtils: FormArrayUtils;

  dynamicForm: FormGroup;
  elementConfigs: { [key: string ]: ITdDynamicElementConfig } = {};

  /**
   * elements: ITdDynamicElementConfig[]
   * JS Object that will render the elements depending on its config.
   * [name] property is required.
   */
  @Input('elements') elements: ITdDynamicElementConfig[] = [];

// (elements: ITdDynamicElementConfig[]) {
//
//     console.log(elements);

  // if (elements) {
  //   if (this._elements) {
  //     this._elements.forEach((elem: ITdDynamicElementConfig) => {
  //       this.dynamicForm.removeControl(elem.name);
  //     });
  //   }
  //   let duplicates: string[] = [];
  //   elements.forEach((elem: ITdDynamicElementConfig) => {
  //     this._dynamicFormsService.validateDynamicElementName(elem.name);
  //     if (duplicates.indexOf(elem.name) > -1) {
  //       throw new Error(`Dynamic element name: "${elem.name}" is duplicated`);
  //     }
  //     duplicates.push(elem.name);
  //     this.dynamicForm.registerControl(elem.name, this._dynamicFormsService.createFormControl(elem));
  //   });
  //   this._elements = elements;
  //   this._changeDetectorRef.detectChanges();
  // }
  // }

  // Getter
  // get elements(): ITdDynamicElementConfig[] {
  //   return this._elements;
  // }

  /**
   * Getter property for dynamic [FormGroup].
   */
  get form(): FormGroup {
    return this.dynamicForm;
  }

  /**
   * Getter property for [valid] of dynamic [FormGroup].
   */
  get valid(): boolean {
    if (this.dynamicForm) {
      return this.dynamicForm.valid;
    }
    return false;
  }

  /**
   * Getter property for [value] of dynamic [FormGroup].
   */
  get value(): any {
    if (this.dynamicForm) {
      return this._formArrayUtils.getValue();
    }
    return {};
  }

  /**
   * Getter property for [errors] of dynamic [FormGroup].
   */
  get errors(): { [name: string]: any } {
    if (this.dynamicForm) {
      let errors: { [name: string]: any } = {};
      for (let name in this.dynamicForm.controls) {
        errors[ name ] = this.dynamicForm.controls[ name ].errors;
      }
      return errors;
    }
    return {};
  }

  /**
   * Getter property for [controls] of dynamic [FormGroup].
   */
  get controls(): { [key: string]: AbstractControl } {
    if (this.dynamicForm) {
      return this.dynamicForm.controls;
    }
    return {};
  }

  constructor(private _formBuilder: FormBuilder,
              private _dynamicFormsService: TdDynamicFormsService,
              private _changeDetectorRef: ChangeDetectorRef) {
    this.dynamicForm = this._formBuilder.group({
      formArray: this._formBuilder.array([]),
    });

    this._formArrayUtils = new FormArrayUtils();
    this._formArrayUtils.formArray = <FormArray>this.dynamicForm.controls[ constant.FORM_ARRAY ];
  }

  ngDoCheck(): void {
    // manual dirty check
    if (this.elements.length !== this._elementsLength) {
      let doAdd: boolean = this.elements.length > this._elementsLength;

      // set pristine
      this._elementsLength = this.elements.length;

      if (doAdd) {
        this.pushControls();
      } else {
        this.removeControls();
      }
    }

  }

  pushControls(): void {

    this.elements.forEach((elem: ITdDynamicElementConfig) => {

      if (!this._formArrayUtils.contains(elem.name)) {

        let group: any = {};
        let defaultValue: any = elem.default || '';

        group[ elem.name ] = [ defaultValue, Validators.required ];

        let newGroup: FormGroup = this._formBuilder.group(group);

        (<ITdFormGroup>newGroup).tdElementConfig = elem;
        // tslint:disable-next-line
        this.elementConfigs[ elem.name ] = elem;

        // Let FormGroup API create the control
        // tslint:disable-next-line
        (<FormArray>this.dynamicForm.controls[ constant.FORM_ARRAY ]).push(newGroup);
      }
    });

  }

  removeControls(): void {
    // tslint:disable-next-line
    let arrayControl: FormArray = <FormArray>this.dynamicForm.controls[ constant.FORM_ARRAY ];

    let removeControlsByName: string[] = this._formArrayUtils.getControlNamesToRemoveByElements(this.elements);

    removeControlsByName.forEach((name: string) => {

      // Need to get index every iteration
      // since remove control re-indexes array.
      let indexInFormArray: number = this._formArrayUtils.indexOf(name);
      arrayControl.removeAt(indexInFormArray);
    });
  }
}
