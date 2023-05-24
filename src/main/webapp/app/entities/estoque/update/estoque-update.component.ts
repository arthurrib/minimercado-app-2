import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {finalize, map} from 'rxjs/operators';

import {EstoqueFormGroup, EstoqueFormService} from './estoque-form.service';
import {IEstoque} from '../estoque.model';
import {EstoqueService} from '../service/estoque.service';
import {AbstractControl} from '@angular/forms';
import {IProduto} from "../../produto/produto.model";
import {ProdutoService} from "../../produto/service/produto.service";
import {ASC, DESC} from "../../../config/navigation.constants";

@Component({
  selector: 'jhi-estoque-update',
  templateUrl: './estoque-update.component.html',
})
export class EstoqueUpdateComponent implements OnInit {
  isSaving = false;
  estoque: IEstoque | null = null;

  editForm: EstoqueFormGroup = this.estoqueFormService.createEstoqueFormGroup();
  produtosSharedCollection: IProduto[] = [];
  predicate = 'categoria,nome';
  ascending = true;

  constructor(
    protected estoqueService: EstoqueService,
    protected estoqueFormService: EstoqueFormService,
    protected activatedRoute: ActivatedRoute,
    protected produtoService: ProdutoService
  ) {
  }

  compareProduto = (o1: IProduto | null, o2: IProduto | null): boolean => this.produtoService.compareProduto(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({estoque}) => {
      this.estoque = estoque;
      if (estoque) {
        this.updateForm(estoque);
      }
    });
    this.loadRelationshipsOptions();
  }

  protected getSortQueryParam(predicate = this.predicate, ascending = this.ascending): string[] {
    const ascendingQueryParam = ascending ? ASC : DESC;
    if (predicate === '') {
      return [];
    } else {
      return [predicate + ',' + ascendingQueryParam];
    }
  }

  protected fillComponentAttributesFromResponseBody(data: IProduto[] | null): IProduto[] {
    return data ?? [];
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const estoque = this.estoqueFormService.getEstoque(this.editForm);
    if (estoque.id !== null) {
      this.subscribeToSaveResponse(this.estoqueService.update(estoque));
    } else {
      this.subscribeToSaveResponse(this.estoqueService.create(estoque));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEstoque>>): void {
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

  protected updateForm(estoque: IEstoque): void {
    this.estoque = estoque;
    this.estoqueFormService.resetForm(this.editForm, estoque);

    this.produtosSharedCollection = this.produtoService.addProdutoToCollectionIfMissing<IProduto>(
      this.produtosSharedCollection,
      estoque.produto
    );
  }

  getField(field: string): AbstractControl<any, any> | null {
    return this.editForm.get(field);
  }

  protected loadRelationshipsOptions(): void {
    this.produtoService
      .query({sort: this.getSortQueryParam(), size: 200})
      .pipe(map((res: HttpResponse<IProduto[]>) => res.body ?? []))
      .pipe(map((produtos: IProduto[]) => this.estoqueService.addEstoqueToCollectionIfMissing<IProduto>(produtos, this.estoque?.produto)))
      .subscribe((produtos: IProduto[]) => (this.produtosSharedCollection = produtos));
  }
}
