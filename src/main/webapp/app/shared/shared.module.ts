import {NgModule} from '@angular/core';

import {SharedLibsModule} from './shared-libs.module';
import {AlertComponent} from './alert/alert.component';
import {AlertErrorComponent} from './alert/alert-error.component';
import {HasAnyAuthorityDirective} from './auth/has-any-authority.directive';
import {DurationPipe} from './date/duration.pipe';
import {FormatMediumDatetimePipe} from './date/format-medium-datetime.pipe';
import {FormatMediumDatePipe} from './date/format-medium-date.pipe';
import {SortByDirective} from './sort/sort-by.directive';
import {SortDirective} from './sort/sort.directive';
import {ItemCountComponent} from './pagination/item-count.component';
import {FilterComponent} from './filter/filter.component';
import {FormFieldContainerComponent} from "./forms/form-field-container.component";
import {UploadArquivosDirective} from "./file-manager/arquivos-upload.directive";
import {ArquivosComponent} from "./file-manager/arquivos.component";

@NgModule({
  imports: [SharedLibsModule],
  declarations: [
    AlertComponent,
    AlertErrorComponent,
    HasAnyAuthorityDirective,
    DurationPipe,
    FormatMediumDatetimePipe,
    FormatMediumDatePipe,
    SortByDirective,
    SortDirective,
    ItemCountComponent,
    FilterComponent,
    FormFieldContainerComponent,
    UploadArquivosDirective,
    ArquivosComponent
  ],
  exports: [
    SharedLibsModule,
    AlertComponent,
    AlertErrorComponent,
    HasAnyAuthorityDirective,
    DurationPipe,
    FormatMediumDatetimePipe,
    FormatMediumDatePipe,
    SortByDirective,
    SortDirective,
    ItemCountComponent,
    FilterComponent,
    FormFieldContainerComponent,
    UploadArquivosDirective,
    ArquivosComponent
  ],
})
export class SharedModule {
}
