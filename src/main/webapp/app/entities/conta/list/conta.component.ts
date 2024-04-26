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
    // const url =  `https://api.whatsapp.com/send?phone=55${conta.telefone}&text=Oi%2C%20${conta.nome}!%20Aqui%20%C3%A9%20do%20minimercado%20do%20segue-me.%20Passando%20pra%20lembrar%20que%20voc%C3%AA%20tem%20uma%20conta%20aberta%20por%20aqui!%20%0AS%C3%B3%20vamos%20fechar%20as%20contas%20amanh%C3%A3%2C%20mas%20por%20enquanto%20voc%C3%AA%20consegue%20consultar%20no%20link%3A%0Ahttps%3A%2F%2Fminimercado-app.herokuapp.com%2Faccount%2Fminha-conta%2F${conta.telefone}`;
    // const url =  `https://api.whatsapp.com/send?phone=55${conta.telefone}&text=Opaa,%20bom%20dia!%20%0APassando%20pra%20lembrar%20que%20voc%C3%AA%20tem%20uma%20continha%20aberta%20no%20minimercado%20do%20Segue-me!%0AVoc%C3%AA%20pode%20acessar%20sua%20fatura%20no%20link%20abaixo,%20fazer%20o%20pix%20e%20mandar%20o%20comprovante%20pra%20gente!%20Ou%20ent%C3%A3o%20passa%20aqui%20na%20nossa%20sala%20se%20tiver%20qualquer%20d%C3%BAvida.%0APIX:%2055seguemelagosul@gmail.com%0AJ%C3%BAlia%20Bernardes%0A%0Alink%20da%20fatura:%20%0Ahttps://minimercado-app.herokuapp.com/account/minha-conta/${conta.telefone}`;
    // const url = `https://api.whatsapp.com/send?phone=55${conta.telefone}&text=Opaa%2C%20bom%20dia!%20%0APassando%20pra%20lembrar%20que%20voc%C3%AA%20tem%20uma%20continha%20aberta%20na%20renovendas!%0AVoc%C3%AA%20pode%20acessar%20sua%20fatura%20no%20link%20abaixo%2C%20fazer%20o%20pix%20e%20mandar%20o%20comprovante%20pra%20gente!%20Ou%20ent%C3%A3o%20passa%20aqui%20na%20nossa%20sala%20se%20tiver%20qualquer%20d%C3%BAvida.%0APIX%3A%2055seguemelagosul%40gmail.com%0AJ%C3%BAlia%20Bernardes%0A%0Alink%20da%20fatura%3A%20%0Ahttps%3A%2F%2Fminimercado-app.herokuapp.com%2Faccount%2Fminha-conta%2F${conta.telefone}`;
    const url = `https://api.whatsapp.com/send?phone=55${conta.telefone}&text=Opaa%2C+bom+dia%21+%0D%0APassando+pra+lembrar+que+voc%C3%AA+tem+uma+continha+aberta+na+renovendas%21%0D%0AVoc%C3%AA+pode+acessar+sua+fatura+no+link+abaixo%2C+fazer+o+pix+e+mandar+o+comprovante+pra+gente%21+Ou+ent%C3%A3o+passa+aqui+na+nossa+sala+se+tiver+qualquer+d%C3%BAvida.%0D%0APIX%3A+CPF+040.997.501-08+%0D%0ALaura+Beatriz+Carvalho+Granja%0D%0A%0D%0Alink+da+fatura%3A+%0D%0Ahttps%3A%2F%2Fminimercado-app.herokuapp.com%2Faccount%2Fminha-conta%2F${conta.telefone}`;
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
