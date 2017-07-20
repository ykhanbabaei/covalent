import {
  AfterViewInit, ChangeDetectorRef, Component, HostBinding, OnInit, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {slideInDownAnimation} from '../app.animations';
import {
  ITdDynamicElementConfig, TdDynamicElement,
  TdDynamicType,
} from '../../platform/dynamic-forms/services/dynamic-forms.service';
import { TdDynamicFormsComponent } from '../../platform/dynamic-forms/dynamic-forms.component';

@Component({
  selector: 'bug-624',
  styleUrls: ['./bug-624.component.scss'],
  templateUrl: './bug-624.component.html',
  animations: [slideInDownAnimation],
  encapsulation: ViewEncapsulation.None,
})
export class Bug624Component implements OnInit, AfterViewInit {

  @HostBinding('@routeAnimation') routeAnimation: boolean = true;
  @HostBinding('class.td-route-animation') classAnimation: boolean = true;
  @ViewChild('tdFormAddedElements') tdFormAddedElements: TdDynamicFormsComponent;
  // Dynamically add elements at runtime
  elements: ITdDynamicElementConfig[] = [];

  // Options to add
  addedElements: any[] = [];
  addedElementsSubArrays: any[] = [];

  elementOptions: string[] = [];

  elementInput: any[] = [];

  elementInputRows: any[] = [];

  // Template Form
  createFieldModel: any = [
    {
      name: '',
      label: '',
      type: '',
      required: false,
    },
  ];

  constructor(private _changeDetectorRef: ChangeDetectorRef) {

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

  }

  ngAfterViewInit(): void {

  }

  createElement(model: any): void {

    if (model.name) {

      this.createFieldModel.push({
        name: '',
        label: '',
        type: '',
        required: false,
      });

      // Adding entire array for td-dynamic-forms
      // works
      this.addedElements.push({
        name: model.name,
        label: model.label,
        type: model.type,
        required: !!model.required,
      });
    }

    this._changeDetectorRef.detectChanges();
  }

  // updateElment(index: number): void {
  //   console.log(index);
  // }

  deleteElment(index: number): void {
    this.createFieldModel.splice(index, 1);
    this.addedElements.splice(index, 1);
    this._changeDetectorRef.detectChanges();
  }

}
