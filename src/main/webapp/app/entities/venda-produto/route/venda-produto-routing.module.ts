import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { VendaProdutoComponent } from '../list/venda-produto.component';
import { VendaProdutoDetailComponent } from '../detail/venda-produto-detail.component';
import { VendaProdutoUpdateComponent } from '../update/venda-produto-update.component';
import { VendaProdutoRoutingResolveService } from './venda-produto-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const vendaProdutoRoute: Routes = [
  {
    path: '',
    component: VendaProdutoComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: VendaProdutoDetailComponent,
    resolve: {
      vendaProduto: VendaProdutoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: VendaProdutoUpdateComponent,
    resolve: {
      vendaProduto: VendaProdutoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: VendaProdutoUpdateComponent,
    resolve: {
      vendaProduto: VendaProdutoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(vendaProdutoRoute)],
  exports: [RouterModule],
})
export class VendaProdutoRoutingModule {}
