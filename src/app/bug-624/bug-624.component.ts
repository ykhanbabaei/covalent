import {Component, HostBinding, OnInit, ViewEncapsulation} from '@angular/core';
import {slideInDownAnimation} from '../app.animations';
import {
  ITdDynamicElementConfig, TdDynamicElement,
  TdDynamicType,
} from '../../platform/dynamic-forms/services/dynamic-forms.service';

@Component({
  selector: 'bug-624',
  styleUrls: ['./bug-624.component.scss'],
  templateUrl: './bug-624.component.html',
  animations: [slideInDownAnimation],
  encapsulation: ViewEncapsulation.None,
})
export class Bug624Component implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation: boolean = true;
  @HostBinding('class.td-route-animation') classAnimation: boolean = true;

  textElements: ITdDynamicElementConfig[] = [{
    name: 'name',
    label: 'Name',
    type: TdDynamicElement.Input,
    required: true,
  }, {
    name: 'description',
    label: 'Description',
    type: TdDynamicElement.Input,
    required: false,
  }];

  // Dynamically add elements at runtime
  elements: ITdDynamicElementConfig[] = [];

  // Options to add
  addedElements: any[] = [];

  elementOptions: string[] = [];

  elementInput: any[] = [];

  elementInputRows: any[] = [];

  constructor() {

    // ADD ELEMENT OPTIONS TO this.elementOptions
    // First character of string is Cap
    let initialCapRegex: RegExp = /^[A-Z]/;

    let tdDynamicTypeKeys: string[] = Object.keys(TdDynamicType);
    for (let type of tdDynamicTypeKeys) {
      let _type: string = TdDynamicType[type];
      if (!this.elementOptions.includes(_type) && initialCapRegex.test(_type)) {
        this.elementOptions.push(TdDynamicType[_type]);
      }
    }

    let tdDynamicElementKeys: string[] = Object.keys(TdDynamicElement);
    for (let type of tdDynamicElementKeys) {
      let _type: string = TdDynamicElement[type];
      if (!this.elementOptions.includes(_type) && initialCapRegex.test(_type)) {
        this.elementOptions.push(TdDynamicElement[_type]);
      }
    }

    this.elementInputRows.push(this.elementInput);

  }

  ngOnInit(): void { /* noop */
    this.addInputRow();
  }

  createElement(form: any): void {
    console.log(form);
    if (form.valid) {
      this.addInputRow();
      this.addedElements.push({
        name: form.value.addName,
        label: form.value.addLabel,
        type: form.value.addType,
        required: form.value.addRequired,
      });
    }
  }

  private addInputRow(): void {
    this.elementInputRows.push([
      {
        name: 'addName',
        label: 'Name',
        type: TdDynamicType.Text,
        required: true,
      }, {
        name: 'addLabel',
        label: 'Label',
        type: TdDynamicType.Text,
        required: false,
      }, {
        name: 'addType',
        label: 'Type',
        type: TdDynamicType.Array,
        required: true,
        selections: this.elementOptions,
      }, {
        name: 'addRequire',
        label: 'Required',
        type: TdDynamicElement.Checkbox,
        required: false,
      }]);

  }
}
