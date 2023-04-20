import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IConta, NewConta } from '../conta.model';

export type PartialUpdateConta = Partial<IConta> & Pick<IConta, 'id'>;

export type EntityResponseType = HttpResponse<IConta>;
export type EntityArrayResponseType = HttpResponse<IConta[]>;

@Injectable({ providedIn: 'root' })
export class ContaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/contas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(conta: NewConta): Observable<EntityResponseType> {
    return this.http.post<IConta>(this.resourceUrl, conta, { observe: 'response' });
  }

  update(conta: IConta): Observable<EntityResponseType> {
    return this.http.put<IConta>(`${this.resourceUrl}/${this.getContaIdentifier(conta)}`, conta, { observe: 'response' });
  }

  partialUpdate(conta: PartialUpdateConta): Observable<EntityResponseType> {
    return this.http.patch<IConta>(`${this.resourceUrl}/${this.getContaIdentifier(conta)}`, conta, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IConta>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IConta[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getContaIdentifier(conta: Pick<IConta, 'id'>): number {
    return conta.id;
  }

  compareConta(o1: Pick<IConta, 'id'> | null, o2: Pick<IConta, 'id'> | null): boolean {
    return o1 && o2 ? this.getContaIdentifier(o1) === this.getContaIdentifier(o2) : o1 === o2;
  }

  addContaToCollectionIfMissing<Type extends Pick<IConta, 'id'>>(
    contaCollection: Type[],
    ...contasToCheck: (Type | null | undefined)[]
  ): Type[] {
    const contas: Type[] = contasToCheck.filter(isPresent);
    if (contas.length > 0) {
      const contaCollectionIdentifiers = contaCollection.map(contaItem => this.getContaIdentifier(contaItem)!);
      const contasToAdd = contas.filter(contaItem => {
        const contaIdentifier = this.getContaIdentifier(contaItem);
        if (contaCollectionIdentifiers.includes(contaIdentifier)) {
          return false;
        }
        contaCollectionIdentifiers.push(contaIdentifier);
        return true;
      });
      return [...contasToAdd, ...contaCollection];
    }
    return contaCollection;
  }
}
