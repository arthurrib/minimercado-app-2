import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ProdutoComponent } from '../list/produto.component';
import { ProdutoDetailComponent } from '../detail/produto-detail.component';
import { ProdutoUpdateComponent } from '../update/produto-update.component';
import { ProdutoRoutingResolveService } from './produto-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const produtoRoute: Routes = [
  {
    path: '',
    component: ProdutoComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProdutoDetailComponent,
    resolve: {
      produto: ProdutoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProdutoUpdateComponent,
    resolve: {
      produto: ProdutoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProdutoUpdateComponent,
    resolve: {
      produto: ProdutoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(produtoRoute)],
  exports: [RouterModule],
})
export class ProdutoRoutingModule {}
