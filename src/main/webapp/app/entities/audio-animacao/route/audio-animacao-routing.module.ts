import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AudioAnimacaoComponent } from '../list/audio-animacao.component';
import { AudioAnimacaoDetailComponent } from '../detail/audio-animacao-detail.component';
import { AudioAnimacaoUpdateComponent } from '../update/audio-animacao-update.component';
import { AudioAnimacaoRoutingResolveService } from './audio-animacao-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const audioAnimacaoRoute: Routes = [
  {
    path: '',
    component: AudioAnimacaoComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AudioAnimacaoDetailComponent,
    resolve: {
      audioAnimacao: AudioAnimacaoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AudioAnimacaoUpdateComponent,
    resolve: {
      audioAnimacao: AudioAnimacaoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AudioAnimacaoUpdateComponent,
    resolve: {
      audioAnimacao: AudioAnimacaoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(audioAnimacaoRoute)],
  exports: [RouterModule],
})
export class AudioAnimacaoRoutingModule {}
