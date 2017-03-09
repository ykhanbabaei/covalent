/*
 * Copyright (C) 2016-2017 by Teradata Corporation. All rights reserved.
 * TERADATA CORPORATION CONFIDENTIAL AND TRADE SECRET
 */

import {
  TestBed,
  inject,
  async,
  ComponentFixture,
} from '@angular/core/testing';
import { ToolbarComponent } from './toolbar.component';

describe('Component: Copyright', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ToolbarComponent,
      ],
    });
    TestBed.compileComponents();
  }));

  it('should create the component', async(inject([], () => {
    let fixture: ComponentFixture<any> = TestBed.createComponent(ToolbarComponent);
    let component: ToolbarComponent = fixture.debugElement.componentInstance;

    expect(component).toBeTruthy();
  })));
});
