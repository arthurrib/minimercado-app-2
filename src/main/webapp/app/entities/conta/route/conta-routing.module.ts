import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ContaComponent } from '../list/conta.component';
import { ContaDetailComponent } from '../detail/conta-detail.component';
import { ContaUpdateComponent } from '../update/conta-update.component';
import { ContaRoutingResolveService } from './conta-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const contaRoute: Routes = [
  {
    path: '',
    component: ContaComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ContaDetailComponent,
    resolve: {
      conta: ContaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ContaUpdateComponent,
    resolve: {
      conta: ContaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ContaUpdateComponent,
    resolve: {
      conta: ContaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(contaRoute)],
  exports: [RouterModule],
})
export class ContaRoutingModule {}
