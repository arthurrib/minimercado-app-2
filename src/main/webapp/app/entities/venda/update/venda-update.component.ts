import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { VendaFormService, VendaFormGroup } from './venda-form.service';
import { IVenda } from '../venda.model';
import { VendaService } from '../service/venda.service';
import {IProduto} from "../../produto/produto.model";
import {IConta} from "../../conta/conta.model";
import {ContaService} from "../../conta/service/conta.service";
import {ASC, DESC} from "../../../config/navigation.constants";
import { AbstractControl } from '@angular/forms';
import {ProdutoService} from "../../produto/service/produto.service";
import {VendaProdutoService} from "../../venda-produto/service/venda-produto.service";

@Component({
  selector: 'jhi-venda-update',
  templateUrl: './venda-update.component.html',
})
export class VendaUpdateComponent implements OnInit {
  isSaving = false;
  venda: IVenda | null = null;
  contasSharedCollection: IConta[] = [];
  produtosSharedCollection: IConta[] = [];
  predicate = 'equipe,nome';
  ascending = true;

  editForm: VendaFormGroup = this.vendaFormService.createVendaFormGroup();

  constructor(
    protected vendaService: VendaService,
    protected vendaFormService: VendaFormService,
    protected activatedRoute: ActivatedRoute,
    protected contaService: ContaService,
    protected produtoService: ProdutoService,
    protected vendaProdutoService: VendaProdutoService
  ) {}

  compareConta = (o1: IConta | null, o2: IConta | null): boolean => this.contaService.compareConta(o1, o2);
  compareProduto = (o1: IProduto | null, o2: IProduto | null): boolean => this.produtoService.compareProduto(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ venda }) => {
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
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
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
}
