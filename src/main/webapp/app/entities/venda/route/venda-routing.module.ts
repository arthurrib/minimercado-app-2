import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { VendaComponent } from '../list/venda.component';
import { VendaDetailComponent } from '../detail/venda-detail.component';
import { VendaUpdateComponent } from '../update/venda-update.component';
import { VendaRoutingResolveService } from './venda-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const vendaRoute: Routes = [
  {
    path: '',
    component: VendaComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: VendaDetailComponent,
    resolve: {
      venda: VendaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: VendaUpdateComponent,
    resolve: {
      venda: VendaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: VendaUpdateComponent,
    resolve: {
      venda: VendaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(vendaRoute)],
  exports: [RouterModule],
})
export class VendaRoutingModule {}
