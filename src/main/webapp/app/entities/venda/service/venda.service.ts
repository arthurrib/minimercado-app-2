import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IVenda, NewVenda } from '../venda.model';

export type PartialUpdateVenda = Partial<IVenda> & Pick<IVenda, 'id'>;

type RestOf<T extends IVenda | NewVenda> = Omit<T, 'data'> & {
  data?: string | null;
};

export type RestVenda = RestOf<IVenda>;

export type NewRestVenda = RestOf<NewVenda>;

export type PartialUpdateRestVenda = RestOf<PartialUpdateVenda>;

export type EntityResponseType = HttpResponse<IVenda>;
export type EntityArrayResponseType = HttpResponse<IVenda[]>;

@Injectable({ providedIn: 'root' })
export class VendaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/vendas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(venda: NewVenda): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(venda);
    return this.http.post<RestVenda>(this.resourceUrl, copy, { observe: 'response' }).pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(venda: IVenda): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(venda);
    return this.http
      .put<RestVenda>(`${this.resourceUrl}/${this.getVendaIdentifier(venda)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(venda: PartialUpdateVenda): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(venda);
    return this.http
      .patch<RestVenda>(`${this.resourceUrl}/${this.getVendaIdentifier(venda)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestVenda>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestVenda[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
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

  protected convertDateFromClient<T extends IVenda | NewVenda | PartialUpdateVenda>(venda: T): RestOf<T> {
    return {
      ...venda,
      data: venda.data?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restVenda: RestVenda): IVenda {
    return {
      ...restVenda,
      data: restVenda.data ? dayjs(restVenda.data) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestVenda>): HttpResponse<IVenda> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestVenda[]>): HttpResponse<IVenda[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
