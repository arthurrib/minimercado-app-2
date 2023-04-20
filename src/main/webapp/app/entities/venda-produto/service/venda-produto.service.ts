import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IVendaProduto, NewVendaProduto } from '../venda-produto.model';

export type PartialUpdateVendaProduto = Partial<IVendaProduto> & Pick<IVendaProduto, 'id'>;

export type EntityResponseType = HttpResponse<IVendaProduto>;
export type EntityArrayResponseType = HttpResponse<IVendaProduto[]>;

@Injectable({ providedIn: 'root' })
export class VendaProdutoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/venda-produtos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(vendaProduto: NewVendaProduto): Observable<EntityResponseType> {
    return this.http.post<IVendaProduto>(this.resourceUrl, vendaProduto, { observe: 'response' });
  }

  update(vendaProduto: IVendaProduto): Observable<EntityResponseType> {
    return this.http.put<IVendaProduto>(`${this.resourceUrl}/${this.getVendaProdutoIdentifier(vendaProduto)}`, vendaProduto, {
      observe: 'response',
    });
  }

  partialUpdate(vendaProduto: PartialUpdateVendaProduto): Observable<EntityResponseType> {
    return this.http.patch<IVendaProduto>(`${this.resourceUrl}/${this.getVendaProdutoIdentifier(vendaProduto)}`, vendaProduto, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IVendaProduto>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IVendaProduto[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getVendaProdutoIdentifier(vendaProduto: Pick<IVendaProduto, 'id'>): number {
    return vendaProduto.id;
  }

  compareVendaProduto(o1: Pick<IVendaProduto, 'id'> | null, o2: Pick<IVendaProduto, 'id'> | null): boolean {
    return o1 && o2 ? this.getVendaProdutoIdentifier(o1) === this.getVendaProdutoIdentifier(o2) : o1 === o2;
  }

  addVendaProdutoToCollectionIfMissing<Type extends Pick<IVendaProduto, 'id'>>(
    vendaProdutoCollection: Type[],
    ...vendaProdutosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const vendaProdutos: Type[] = vendaProdutosToCheck.filter(isPresent);
    if (vendaProdutos.length > 0) {
      const vendaProdutoCollectionIdentifiers = vendaProdutoCollection.map(
        vendaProdutoItem => this.getVendaProdutoIdentifier(vendaProdutoItem)!
      );
      const vendaProdutosToAdd = vendaProdutos.filter(vendaProdutoItem => {
        const vendaProdutoIdentifier = this.getVendaProdutoIdentifier(vendaProdutoItem);
        if (vendaProdutoCollectionIdentifiers.includes(vendaProdutoIdentifier)) {
          return false;
        }
        vendaProdutoCollectionIdentifiers.push(vendaProdutoIdentifier);
        return true;
      });
      return [...vendaProdutosToAdd, ...vendaProdutoCollection];
    }
    return vendaProdutoCollection;
  }
}
