import {NgModule} from '@angular/core';
import {SharedModule} from 'app/shared/shared.module';
import {ProdutoComponent} from './list/produto.component';
import {ProdutoDetailComponent} from './detail/produto-detail.component';
import {ProdutoUpdateComponent} from './update/produto-update.component';
import {ProdutoDeleteDialogComponent} from './delete/produto-delete-dialog.component';
import {ProdutoRoutingModule} from './route/produto-routing.module';
import { NgxMaskModule } from 'ngx-mask';
import {NgxCurrencyModule} from 'ngx-currency';

@NgModule({
  imports: [SharedModule, ProdutoRoutingModule, NgxCurrencyModule, NgxMaskModule.forRoot(),],
  declarations: [ProdutoComponent, ProdutoDetailComponent, ProdutoUpdateComponent, ProdutoDeleteDialogComponent],
})
export class ProdutoModule {
}
