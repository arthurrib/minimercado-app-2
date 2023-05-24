import {NgModule} from '@angular/core';
import {SharedModule} from 'app/shared/shared.module';
import {ContaComponent} from './list/conta.component';
import {ContaDetailComponent} from './detail/conta-detail.component';
import {ContaUpdateComponent} from './update/conta-update.component';
import {ContaDeleteDialogComponent} from './delete/conta-delete-dialog.component';
import {ContaRoutingModule} from './route/conta-routing.module';
import {NgxCurrencyModule} from 'ngx-currency';
import {NgxMaskModule} from 'ngx-mask';

@NgModule({
  imports: [SharedModule, ContaRoutingModule, NgxCurrencyModule, NgxMaskModule.forRoot()],
  declarations: [ContaComponent, ContaDetailComponent, ContaUpdateComponent, ContaDeleteDialogComponent],
})
export class ContaModule {
}
