import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ProdutoComponent } from './list/produto.component';
import { ProdutoDetailComponent } from './detail/produto-detail.component';
import { ProdutoUpdateComponent } from './update/produto-update.component';
import { ProdutoDeleteDialogComponent } from './delete/produto-delete-dialog.component';
import { ProdutoRoutingModule } from './route/produto-routing.module';

@NgModule({
  imports: [SharedModule, ProdutoRoutingModule],
  declarations: [ProdutoComponent, ProdutoDetailComponent, ProdutoUpdateComponent, ProdutoDeleteDialogComponent],
})
export class ProdutoModule {}
