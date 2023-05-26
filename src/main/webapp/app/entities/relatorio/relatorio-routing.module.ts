import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UserRouteAccessService} from 'app/core/auth/user-route-access.service';
import {RelatorioComponent} from "./relatorio.component";

const produtoRoute: Routes = [
  {
    path: '',
    component: RelatorioComponent,
    data: {
      pageTitle: 'Relatório'
    },
    canActivate: [UserRouteAccessService],
  },

];

@NgModule({
  imports: [RouterModule.forChild(produtoRoute)],
  exports: [RouterModule],
})
export class RelatorioRoutingModule {
}
