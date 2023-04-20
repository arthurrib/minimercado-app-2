import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { VendaProdutoComponent } from './list/venda-produto.component';
import { VendaProdutoDetailComponent } from './detail/venda-produto-detail.component';
import { VendaProdutoUpdateComponent } from './update/venda-produto-update.component';
import { VendaProdutoDeleteDialogComponent } from './delete/venda-produto-delete-dialog.component';
import { VendaProdutoRoutingModule } from './route/venda-produto-routing.module';

@NgModule({
  imports: [SharedModule, VendaProdutoRoutingModule],
  declarations: [VendaProdutoComponent, VendaProdutoDetailComponent, VendaProdutoUpdateComponent, VendaProdutoDeleteDialogComponent],
})
export class VendaProdutoModule {}
