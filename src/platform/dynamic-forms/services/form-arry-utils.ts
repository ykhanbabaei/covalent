import { AbstractControl, FormArray, FormBuilder } from '@angular/forms';
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

  getControlName(control: AbstractControl): string {
    if (control) {
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
}
