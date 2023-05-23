import {NgModule} from '@angular/core';
import {SharedModule} from 'app/shared/shared.module';
import {EstoqueComponent} from './list/estoque.component';
import {EstoqueDetailComponent} from './detail/estoque-detail.component';
import {EstoqueUpdateComponent} from './update/estoque-update.component';
import {EstoqueDeleteDialogComponent} from './delete/estoque-delete-dialog.component';
import {EstoqueRoutingModule} from './route/estoque-routing.module';
import {NgxMaskModule} from 'ngx-mask';
import {NgxCurrencyModule} from 'ngx-currency';

@NgModule({
  imports: [SharedModule, EstoqueRoutingModule, NgxCurrencyModule, NgxMaskModule.forRoot()],
  declarations: [EstoqueComponent, EstoqueDetailComponent, EstoqueUpdateComponent, EstoqueDeleteDialogComponent],
})
export class EstoqueModule {
}
