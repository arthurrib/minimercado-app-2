import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { EstoqueFormService, EstoqueFormGroup } from './estoque-form.service';
import { IEstoque } from '../estoque.model';
import { EstoqueService } from '../service/estoque.service';

@Component({
  selector: 'jhi-estoque-update',
  templateUrl: './estoque-update.component.html',
})
export class EstoqueUpdateComponent implements OnInit {
  isSaving = false;
  estoque: IEstoque | null = null;

  editForm: EstoqueFormGroup = this.estoqueFormService.createEstoqueFormGroup();

  constructor(
    protected estoqueService: EstoqueService,
    protected estoqueFormService: EstoqueFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ estoque }) => {
      this.estoque = estoque;
      if (estoque) {
        this.updateForm(estoque);
      }
    });
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
  }
}
