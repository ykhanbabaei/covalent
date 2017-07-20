import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ITdDynamicElementConfig } from './dynamic-forms.service';
export class FormArrayUtils {

  private _formArray: FormArray;
  set formArray(val: FormArray) {
    this._formArray = val;
  }

  constructor(// private _formArray: FormArray,
  ) {
    /* noop */
  }

  /**
   * There is only one property per control.
   *
   * @param index
   * @returns {string}
   */
  getControlNameByIndex(index: number): string {

    if (this._formArray.controls && this._formArray.controls[ index ]) {
      let control: any = this._formArray.controls[ index ];
      return this.getControlName(control.controls);
    }

    return undefined;
  }

  getControlNames(): string[] {

    if (this._formArray.controls) {
      return this._formArray.controls.reduce((acc: any, ctrl: any, index: number) => {
        acc.push(this.getControlName(ctrl.controls));
        return acc;
      }, []);
    }

    return [];
  }

  /**
   * Since these Sub FormGroup controls are managed
   * specifically for dynamic-forms use case,
   * it is safely assumed there is only one
   * control per FormGroup.
   *
   * @param control
   * @returns {any}
   */
  getControlName(control: AbstractControl): string {
    if (control) {

      // Return the only Control key in FormGroup controls.
      return Object.keys(control)[ 0 ];
    }

    return undefined;
  }

  contains(name: string): boolean {
    return this.getControlNames().indexOf(name) !== -1;
  }

  indexOf(name: string): number {
    return this.getControlNames().indexOf(name);
  }

  getControlNamesToRemove( newControlNames: string[]): string[] {
    return this.getControlNames().reduce((acc: any, name: string) => {
      if (newControlNames.indexOf(name) === -1) {
        acc.push(name);
      }
      return acc;
    }, []);
  }

  getElementNames( elements: ITdDynamicElementConfig[] ): string[] {
    return elements.reduce((acc: any, elem: any) => {
      acc.push(elem.name);
      return acc;
    }, []);
  }

  getControlNamesToRemoveByElements(elements: ITdDynamicElementConfig[]): string[] {
    return this.getControlNamesToRemove(this.getElementNames(elements));
  }

  getValue(): { [key: string]: any } {
    let names: string[] = this.getControlNames();

    let value: any =  names.reduce((acc: any, name: string) => {
      let indexOfControl: number = this.indexOf(name);
      acc[name] = (<FormGroup>this._formArray.controls[indexOfControl]).controls[name].value;
      return acc;
    }, {});

    return value || {};

  }

  getErrors(): { [key: string]: any } {
    let names: string[] = this.getControlNames();

    let value: any =  names.reduce((acc: any, name: string) => {
      let indexOfControl: number = this.indexOf(name);
      acc[name] = (<FormGroup>this._formArray.controls[indexOfControl]).controls[name].errors;
      return acc;
    }, {});

    return value || {};

  }
}
