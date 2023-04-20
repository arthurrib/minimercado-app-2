import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IVendaProduto } from '../venda-produto.model';
import { VendaProdutoService } from '../service/venda-produto.service';

@Injectable({ providedIn: 'root' })
export class VendaProdutoRoutingResolveService implements Resolve<IVendaProduto | null> {
  constructor(protected service: VendaProdutoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IVendaProduto | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((vendaProduto: HttpResponse<IVendaProduto>) => {
          if (vendaProduto.body) {
            return of(vendaProduto.body);
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
