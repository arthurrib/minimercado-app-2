import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IConta } from '../conta.model';
import { ContaService } from '../service/conta.service';

@Injectable({ providedIn: 'root' })
export class ContaRoutingResolveService implements Resolve<IConta | null> {
  constructor(protected service: ContaService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IConta | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((conta: HttpResponse<IConta>) => {
          if (conta.body) {
            return of(conta.body);
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
