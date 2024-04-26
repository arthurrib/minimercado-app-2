import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAudioAnimacao } from '../audio-animacao.model';
import { AudioAnimacaoService } from '../service/audio-animacao.service';

@Injectable({ providedIn: 'root' })
export class AudioAnimacaoRoutingResolveService implements Resolve<IAudioAnimacao | null> {
  constructor(protected service: AudioAnimacaoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAudioAnimacao | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((audioAnimacao: HttpResponse<IAudioAnimacao>) => {
          if (audioAnimacao.body) {
            return of(audioAnimacao.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
