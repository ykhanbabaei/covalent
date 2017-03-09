/*
 * Copyright (C) 2016-2017 by Teradata Corporation. All rights reserved.
 * TERADATA CORPORATION CONFIDENTIAL AND TRADE SECRET
 */

import { Component } from '@angular/core';

@Component({
  selector: 'td-toolbar',
  templateUrl: '././toolbar.component.html',
  styleUrls: ['././toolbar.component.scss'],
})
export class ToolbarComponent {
  searchVisible: boolean = true;

  updates: Object[] = [{
      description: 'File Input component',
      icon: 'space_bar',
      route: 'components/file-input',
      title: 'New component',
    }, {
      description: 'NGX Translate',
      icon: 'language',
      route: 'components/ngx-translate',
      title: 'New supported feature',
    }, {
      description: 'Route on toolbar logos',
      icon: 'dashboard',
      route: 'layouts',
      title: 'Component updated',
    }, {
      description: 'Data Table additional features',
      icon: 'grid_on',
      route: 'components/data-table',
      title: 'Component updated',
    }, {
      description: 'File upload refactored',
      icon: 'attach_file',
      route: 'components/file-upload',
      title: 'Component updated',
    }, {
      description: 'Paging Bar additional features',
      icon: 'swap_horiz',
      route: 'components/paging',
      title: 'Component updated',
    },
  ];

  // Autocomplete
  currentState: string = '';

  reactiveStates: any;
  tdStates: any[];

  tdDisabled: boolean = false;

  // components
  components: Object[] = [{
    description: 'A wizard-line sequence of logical & numbered steps',
    icon: 'view_list',
    route: 'steps',
    title: 'Stepper (Wizard)',
  }, {
    description: 'Expanding & collapsing panels like an accordion',
    icon: 'open_with',
    route: 'expansion-panel',
    title: 'Expansion Panels',
  }, {
    description: 'Text input for file upload',
    icon: 'space_bar',
    route: 'file-input',
    title: 'File Input',
  }, {
    description: 'All-in-one upload button for file uploads',
    icon: 'attach_file',
    route: 'file-upload',
    title: 'File Upload Button',
  }, {
    description: 'Small chips with autocomplete for multiple items',
    icon: 'label_outline',
    route: 'chips',
    title: 'Chips & Autocomplete',
  }, {
    description: 'Circular loaders or linear progress loading bars',
    icon: 'hourglass_empty',
    route: 'loading',
    title: 'Loading',
  }, {
    description: 'Quick way to use alert, confirm and prompt dialogs (modals)',
    icon: 'open_in_browser',
    route: 'dialogs',
    title: 'Simple Dialogs',
  }, {
    description: 'Display sets of raw data in a table with rows and columns',
    icon: 'grid_on',
    route: 'data-table',
    title: 'Data Table',
  }, {
    description: 'Formatted JSON object tree with collapsible nodes',
    icon: 'format_indent_increase',
    route: 'json-formatter',
    title: 'JSON Formatter',
  }, {
    description: 'Pagination for lists and tables',
    icon: 'swap_horiz',
    route: 'paging',
    title: 'Paging',
  }, {
    description: 'Notification count/alert & menu dropdown',
    icon: 'notifications',
    route: 'notifications',
    title: 'Notifications',
  }, {
    description: 'Search and filter items in search bar',
    icon: 'search',
    route: 'search',
    title: 'Search',
  }, {
    description: 'Responsive media query service & directive',
    icon: 'devices',
    route: 'media',
    title: 'Media Queries',
  }, {
    description: 'Core directives & utilities',
    icon: 'wb_iridescent',
    route: 'directives',
    title: 'Directives',
  }, {
    description: 'Custom Angular pipes (filters)',
    icon: 'filter_list',
    route: 'pipes',
    title: 'Pipes',
  }, {
    description: 'Syntax highlighting your code snippets via highlight.js',
    icon: 'code',
    route: 'syntax-highlighting',
    title: 'Syntax Highlighting',
  }, {
    description: 'Parse markdown code from .md files and snippets',
    icon: 'chrome_reader_mode',
    route: 'markdown',
    title: 'Markdown',
  }, {
    description: 'Dynamically generate forms from a JS object',
    icon: 'format_align_center',
    route: 'dynamic-forms',
    title: 'Dynamic Forms',
  }, {
    description: 'Angular HTTP service wrappers and helpers',
    icon: 'http',
    route: 'http',
    title: 'HTTP Service',
  }, {
    description: 'Declarative D3 chart framework for Angular',
    icon: 'insert_chart',
    route: 'ngx-charts',
    title: 'NGX-Charts',
  }, {
    description: 'Internationalization i18n and localization l10n library for ng2',
    icon: 'language',
    route: 'ngx-translate',
    title: 'NGX-Translate',
  }];

  constructor() {
    this.tdStates = this.components;
  }

  displayFn(value: any): string {
    return value && typeof value === 'object' ? value.description : value;
  }

  filterStates(val: string): Object[] {
    return val ? this.components.filter((s: any) => s.description.match(new RegExp(val, 'gi'))) : this.components;
  }

  toggleSearch(): void {
    this.searchVisible = !this.searchVisible;
  }
}
