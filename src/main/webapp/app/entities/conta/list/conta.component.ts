import {Component, OnInit} from '@angular/core';
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Data, ParamMap, Router} from '@angular/router';
import {combineLatest, filter, Observable, switchMap, tap} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {Conta, IConta} from '../conta.model';

import {PAGE_HEADER, TOTAL_COUNT_RESPONSE_HEADER} from 'app/config/pagination.constants';
import {ASC, DEFAULT_SORT_DATA, DESC, ITEM_DELETED_EVENT, SORT} from 'app/config/navigation.constants';
import {ContaService, EntityArrayResponseType} from '../service/conta.service';
import {ContaDeleteDialogComponent} from '../delete/conta-delete-dialog.component';
import {VendaComProduto} from "../../venda/venda.model";
import {VendaService} from "../../venda/service/venda.service";
import {InformarPagamentoDialogComponent} from "../informar-pagamento-dialog/informar-pagamento-dialog.component";

@Component({
  selector: 'jhi-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['conta.scss']
})
export class ContaComponent implements OnInit {
  contas?: Conta[];
  isLoading = false;

  predicate = 'id';
  ascending = true;
  itemsPerPage = 100;
  totalItems = 0;
  page = 1;

  constructor(
    protected contaService: ContaService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected modalService: NgbModal,
    protected vendaService: VendaService
  ) {
  }

  trackId = (_index: number, item: IConta): number => this.contaService.getContaIdentifier(item);

  ngOnInit(): void {
    this.load();
  }

  delete(conta: IConta): void {
    const modalRef = this.modalService.open(ContaDeleteDialogComponent, {size: 'lg', backdrop: 'static'});
    modalRef.componentInstance.conta = conta;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed
      .pipe(
        filter(reason => reason === ITEM_DELETED_EVENT),
        switchMap(() => this.loadFromBackendWithRouteInformations())
      )
      .subscribe({
        next: (res: EntityArrayResponseType) => {
          this.onResponseSuccess(res);
        },
      });
  }

  load(): void {
    this.loadFromBackendWithRouteInformations().subscribe({
      next: (res: EntityArrayResponseType) => {
        this.onResponseSuccess(res);
      },
    });
  }

  navigateToWithComponentValues(): void {
    this.handleNavigation(this.page, this.predicate, this.ascending);
  }

  navigateToPage(page = this.page): void {
    this.handleNavigation(page, this.predicate, this.ascending);
  }

  protected loadFromBackendWithRouteInformations(): Observable<EntityArrayResponseType> {
    return combineLatest([this.activatedRoute.queryParamMap, this.activatedRoute.data]).pipe(
      tap(([params, data]) => this.fillComponentAttributeFromRoute(params, data)),
      switchMap(() => this.queryBackend(this.page, this.predicate, this.ascending))
    );
  }

  protected fillComponentAttributeFromRoute(params: ParamMap, data: Data): void {
    const page = params.get(PAGE_HEADER);
    this.page = +(page ?? 1);
    const sort = (params.get(SORT) ?? data[DEFAULT_SORT_DATA]).split(',');
    this.predicate = sort[0];
    this.ascending = sort[1] === ASC;
  }

  protected onResponseSuccess(response: EntityArrayResponseType): void {
    this.fillComponentAttributesFromResponseHeader(response.headers);
    const dataFromBody = this.fillComponentAttributesFromResponseBody(response.body);
    this.contas = dataFromBody;
    this.contas.forEach(c => {
      this.vendaService.findByConta(c.id).subscribe(
        (res: HttpResponse<VendaComProduto[]>) => c.vendaComProduto = res.body ?? []
      );
    })
  }

  protected fillComponentAttributesFromResponseBody(data: IConta[] | null): IConta[] {
    return data ?? [];
  }

  protected fillComponentAttributesFromResponseHeader(headers: HttpHeaders): void {
    this.totalItems = Number(headers.get(TOTAL_COUNT_RESPONSE_HEADER));
  }

  protected queryBackend(page?: number, predicate?: string, ascending?: boolean): Observable<EntityArrayResponseType> {
    this.isLoading = true;
    const pageToLoad: number = page ?? 1;
    const queryObject = {
      page: pageToLoad - 1,
      size: this.itemsPerPage,
      sort: this.getSortQueryParam(predicate, ascending),
    };
    return this.contaService.queryComSaldo(queryObject).pipe(tap(() => (this.isLoading = false)));
  }

  protected handleNavigation(page = this.page, predicate?: string, ascending?: boolean): void {
    const queryParamsObj = {
      page,
      size: this.itemsPerPage,
      sort: this.getSortQueryParam(predicate, ascending),
    };

    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute,
      queryParams: queryParamsObj,
    });
  }

  protected getSortQueryParam(predicate = this.predicate, ascending = this.ascending): string[] {
    const ascendingQueryParam = ascending ? ASC : DESC;
    if (predicate === '') {
      return [];
    } else {
      return [predicate + ',' + ascendingQueryParam];
    }
  }

  getWppLink(conta) {
    const url = `https%3A%2F%2Fapi.whatsapp.com%2Fsend%3Fphone%3D55%24%7Bconta.telefone%7D%26text%3DOpaa%2C+bom+dia%21+%0D%0APassando+pra+lembrar+que+voc%C3%AA+tem+uma+continha+aberta+no+minimercado%21%0D%0AVoc%C3%AA+pode+acessar+sua+fatura+no+link+abaixo%2C+fazer+o+pix+e+mandar+o+comprovante+pra+gente%21+Ou+ent%C3%A3o+passa+aqui+na+nossa+sala+se+tiver+qualquer+d%C3%BAvida.%0D%0APIX%3A+CPF+TODO%0D%0A%0D%0Alink+da+fatura%3A+%0D%0Ahttps%3A%2F%2Fpsocorrolagosul.app.br%2Faccount%2Fminha-conta%2F${conta.telefone}`;
    //@ts-ignore
    window.open(url, '_blank').focus();
  }

  informarPagamento(conta: IConta) {
    const modalRef = this.modalService.open(InformarPagamentoDialogComponent, {size: 'lg', backdrop: 'static'});
    modalRef.componentInstance.conta = conta;
    modalRef.closed.subscribe(reason => {
      if (reason === 'success') {
        this.load();
      }
    });
  }

  getTelefone(telefone: any) {
    return telefone ?? '';
  }
}
