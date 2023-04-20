import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IProduto } from '../produto.model';
import { ProdutoService } from '../service/produto.service';

@Injectable({ providedIn: 'root' })
export class ProdutoRoutingResolveService implements Resolve<IProduto | null> {
  constructor(protected service: ProdutoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProduto | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((produto: HttpResponse<IProduto>) => {
          if (produto.body) {
            return of(produto.body);
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
