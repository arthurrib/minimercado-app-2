import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EstoqueComponent } from '../list/estoque.component';
import { EstoqueDetailComponent } from '../detail/estoque-detail.component';
import { EstoqueUpdateComponent } from '../update/estoque-update.component';
import { EstoqueRoutingResolveService } from './estoque-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const estoqueRoute: Routes = [
  {
    path: '',
    component: EstoqueComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EstoqueDetailComponent,
    resolve: {
      estoque: EstoqueRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EstoqueUpdateComponent,
    resolve: {
      estoque: EstoqueRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EstoqueUpdateComponent,
    resolve: {
      estoque: EstoqueRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(estoqueRoute)],
  exports: [RouterModule],
})
export class EstoqueRoutingModule {}
