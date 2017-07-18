import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Bug624Component } from './bug-624.component';
import {MdIconModule, MdInputModule, MdMenuModule, MdMenuTrigger} from '@angular/material';
import {MdCardModule} from '@angular/material';
import {CovalentDynamicFormsModule} from '../../platform/dynamic-forms/dynamic-forms.module';
import { FormsModule }   from '@angular/forms';
import {MdSelectModule} from '@angular/material';

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
    FormsModule,
    MdSelectModule,
  ],
})
export class Bug624Module {}
