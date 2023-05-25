import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {finalize, map} from 'rxjs/operators';

import {VendaFormGroup, VendaFormService} from './venda-form.service';
import {IVenda} from '../venda.model';
import {VendaService} from '../service/venda.service';
import {IProduto, Produto} from "../../produto/produto.model";
import {IConta} from "../../conta/conta.model";
import {ContaService} from "../../conta/service/conta.service";
import {ASC, DESC} from "../../../config/navigation.constants";
import {AbstractControl} from '@angular/forms';
import {ProdutoService} from "../../produto/service/produto.service";
import {VendaProdutoService} from "../../venda-produto/service/venda-produto.service";
import {IVendaProduto, VendaProduto} from "../../venda-produto/venda-produto.model";

@Component({
  selector: 'jhi-venda-update',
  templateUrl: './venda-update.component.html',
})
export class VendaUpdateComponent implements OnInit {
  isSaving = false;
  venda: IVenda | null = null;
  contasSharedCollection: IConta[] = [];
  produtosSharedCollection: IProduto[] = [];
  predicate = 'equipe,nome';
  ascending = true;
  vendaProdutos: VendaProduto[] = [];

  editForm: VendaFormGroup = this.vendaFormService.createVendaFormGroup();
  produtoSelected: Produto | undefined;

  constructor(
    protected vendaService: VendaService,
    protected vendaFormService: VendaFormService,
    protected activatedRoute: ActivatedRoute,
    protected contaService: ContaService,
    protected produtoService: ProdutoService,
    protected vendaProdutoService: VendaProdutoService
  ) {
  }

  compareConta = (o1: IConta | null, o2: IConta | null): boolean => this.contaService.compareConta(o1, o2);
  compareProduto = (o1: IProduto | null, o2: IProduto | null): boolean => this.produtoService.compareProduto(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({venda}) => {
      this.venda = venda;
      if (venda) {
        this.updateForm(venda);
      }
    });
    this.loadRelationshipsOptions();
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const venda = this.vendaFormService.getVenda(this.editForm);
    if (venda.id !== null) {
      this.subscribeToSaveResponse(this.vendaService.update(venda));
    } else {
      this.subscribeToSaveResponse(this.vendaService.create(venda));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVenda>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: (res: HttpResponse<IVenda>) => this.onSaveSuccess(res.body),
      error: () => this.onSaveError(),
    });
  }


  protected onSaveSuccess(venda: IVenda | null): void {
    this.vendaProdutos.forEach(vp => {
      vp.venda = venda;
      if (vp.id) {
        this.subscribeToSaveResponseVendaProduto(this.vendaProdutoService.updateFix(vp));
      } else {
        this.subscribeToSaveResponseVendaProduto(this.vendaProdutoService.createFix(vp));
      }
    });
  }

  private onSaveSuccessVendaProduto() {
    this.previousState();
  }

  protected subscribeToSaveResponseVendaProduto(result: Observable<HttpResponse<IVendaProduto>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: (res: HttpResponse<IVendaProduto>) => this.onSaveSuccessVendaProduto(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(venda: IVenda): void {
    this.venda = venda;
    this.vendaFormService.resetForm(this.editForm, venda);
  }

  protected loadRelationshipsOptions(): void {
    this.contaService
      .query({sort: this.getSortQueryParam(), size: 200})
      .pipe(map((res: HttpResponse<IConta[]>) => res.body ?? []))
      .pipe(map((contas: IConta[]) => this.vendaService.addVendaToCollectionIfMissing<IConta>(contas, this.venda?.conta)))
      .subscribe((contas: IConta[]) => (this.contasSharedCollection = contas));

    this.produtoService
      .query({sort: this.getSortQueryParam('categoria,nome'), size: 200})
      .pipe(map((res: HttpResponse<IProduto[]>) => res.body ?? []))
      .subscribe((produtos: IProduto[]) => (this.produtosSharedCollection = produtos));
  }

  protected getSortQueryParam(predicate = this.predicate, ascending = this.ascending): string[] {
    const ascendingQueryParam = ascending ? ASC : DESC;
    if (predicate === '') {
      return [];
    } else {
      return [predicate + ',' + ascendingQueryParam];
    }
  }

  getField(field: string): AbstractControl<any, any> | null {
    return this.editForm.get(field);
  }

  createNew() {
    if (!this.produtoSelected) return;
    const vendaProduto = new VendaProduto();
    vendaProduto.qtd = 1;
    vendaProduto.produto = this.produtoSelected;
    vendaProduto.valorUnitario = this.produtoSelected?.valor;
    this.produtoSelected = undefined;
    this.vendaProdutos.push(vendaProduto);
  }

  remove(index: number) {
    this.vendaProdutos.splice(index, 1);
  }

  calcTotal(valor: any, quantidade: any) {
    if (!valor) return 0;
    if (!quantidade) return 0;
    return 'R$ ' + (valor * quantidade).toFixed(2);
  }

  getValorTotal() {
    let valorTotal = 0;
    this.vendaProdutos.forEach(vp => {
      // @ts-ignore
      valorTotal += (vp.valorUnitario * vp.qtd)
    });
    return 'R$ ' + valorTotal.toFixed(2);
  }

  validateProdutos() {
    let result = true;
    this.vendaProdutos.forEach(vp => {
      result = result && !!vp.qtd && !!vp.produto && !!vp.valorUnitario;
    });
    return result;
  }
}
