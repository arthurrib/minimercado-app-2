import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IVenda } from '../venda.model';
import { VendaService } from '../service/venda.service';

@Injectable({ providedIn: 'root' })
export class VendaRoutingResolveService implements Resolve<IVenda | null> {
  constructor(protected service: VendaService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IVenda | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((venda: HttpResponse<IVenda>) => {
          if (venda.body) {
            return of(venda.body);
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
