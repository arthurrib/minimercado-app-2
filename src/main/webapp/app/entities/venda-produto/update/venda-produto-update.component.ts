import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { VendaProdutoFormService, VendaProdutoFormGroup } from './venda-produto-form.service';
import { IVendaProduto } from '../venda-produto.model';
import { VendaProdutoService } from '../service/venda-produto.service';

@Component({
  selector: 'jhi-venda-produto-update',
  templateUrl: './venda-produto-update.component.html',
})
export class VendaProdutoUpdateComponent implements OnInit {
  isSaving = false;
  vendaProduto: IVendaProduto | null = null;

  editForm: VendaProdutoFormGroup = this.vendaProdutoFormService.createVendaProdutoFormGroup();

  constructor(
    protected vendaProdutoService: VendaProdutoService,
    protected vendaProdutoFormService: VendaProdutoFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ vendaProduto }) => {
      this.vendaProduto = vendaProduto;
      if (vendaProduto) {
        this.updateForm(vendaProduto);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const vendaProduto = this.vendaProdutoFormService.getVendaProduto(this.editForm);
    if (vendaProduto.id !== null) {
      this.subscribeToSaveResponse(this.vendaProdutoService.update(vendaProduto));
    } else {
      this.subscribeToSaveResponse(this.vendaProdutoService.create(vendaProduto));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVendaProduto>>): void {
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

  protected updateForm(vendaProduto: IVendaProduto): void {
    this.vendaProduto = vendaProduto;
    this.vendaProdutoFormService.resetForm(this.editForm, vendaProduto);
  }
}
