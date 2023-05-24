import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {isPresent} from 'app/core/util/operators';
import {ApplicationConfigService} from 'app/core/config/application-config.service';
import {createRequestOption} from 'app/core/request/request-util';
import {IVenda, NewVenda} from '../venda.model';

export type PartialUpdateVenda = Partial<IVenda> & Pick<IVenda, 'id'>;

export type EntityResponseType = HttpResponse<IVenda>;
export type EntityArrayResponseType = HttpResponse<IVenda[]>;

@Injectable({providedIn: 'root'})
export class VendaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/vendas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {
  }

  create(venda: NewVenda): Observable<EntityResponseType> {
    return this.http.post<IVenda>(this.resourceUrl, venda, {observe: 'response'});
  }

  update(venda: IVenda): Observable<EntityResponseType> {
    return this.http
      .put<IVenda>(`${this.resourceUrl}/${this.getVendaIdentifier(venda)}`, venda, {observe: 'response'});
  }

  partialUpdate(venda: PartialUpdateVenda): Observable<EntityResponseType> {
    return this.http
      .patch<IVenda>(`${this.resourceUrl}/${this.getVendaIdentifier(venda)}`, venda, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IVenda>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IVenda[]>(this.resourceUrl, {params: options, observe: 'response'});
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  getVendaIdentifier(venda: Pick<IVenda, 'id'>): number {
    return venda.id;
  }

  compareVenda(o1: Pick<IVenda, 'id'> | null, o2: Pick<IVenda, 'id'> | null): boolean {
    return o1 && o2 ? this.getVendaIdentifier(o1) === this.getVendaIdentifier(o2) : o1 === o2;
  }

  addVendaToCollectionIfMissing<Type extends Pick<IVenda, 'id'>>(
    vendaCollection: Type[],
    ...vendasToCheck: (Type | null | undefined)[]
  ): Type[] {
    const vendas: Type[] = vendasToCheck.filter(isPresent);
    if (vendas.length > 0) {
      const vendaCollectionIdentifiers = vendaCollection.map(vendaItem => this.getVendaIdentifier(vendaItem)!);
      const vendasToAdd = vendas.filter(vendaItem => {
        const vendaIdentifier = this.getVendaIdentifier(vendaItem);
        if (vendaCollectionIdentifiers.includes(vendaIdentifier)) {
          return false;
        }
        vendaCollectionIdentifiers.push(vendaIdentifier);
        return true;
      });
      return [...vendasToAdd, ...vendaCollection];
    }
    return vendaCollection;
  }

}
