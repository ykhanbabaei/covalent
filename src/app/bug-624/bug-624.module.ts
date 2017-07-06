import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Bug624Component } from './bug-624.component';
import {MdIconModule, MdInputModule, MdMenuModule, MdMenuTrigger} from '@angular/material';
import {MdCardModule} from '@angular/material';
import {CovalentDynamicFormsModule} from '../../platform/dynamic-forms/dynamic-forms.module';

@NgModule({
  declarations: [
    Bug624Component,
  ],
  imports: [
    /** Angular Modules */
    CommonModule,
    MdInputModule,
    MdCardModule,
    MdMenuModule,
    MdIconModule,
    CovalentDynamicFormsModule,
  ],
})
export class Bug624Module {}
