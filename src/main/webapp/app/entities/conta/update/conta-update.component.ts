import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ContaFormService, ContaFormGroup } from './conta-form.service';
import { IConta } from '../conta.model';
import { ContaService } from '../service/conta.service';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'jhi-conta-update',
  templateUrl: './conta-update.component.html',
})
export class ContaUpdateComponent implements OnInit {
  isSaving = false;
  conta: IConta | null = null;

  editForm: ContaFormGroup = this.contaFormService.createContaFormGroup();

  constructor(
    protected contaService: ContaService,
    protected contaFormService: ContaFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ conta }) => {
      this.conta = conta;
      if (conta) {
        this.updateForm(conta);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const conta = this.contaFormService.getConta(this.editForm);
    if (conta.id !== null) {
      this.subscribeToSaveResponse(this.contaService.update(conta));
    } else {
      this.subscribeToSaveResponse(this.contaService.create(conta));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IConta>>): void {
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

  protected updateForm(conta: IConta): void {
    this.conta = conta;
    this.contaFormService.resetForm(this.editForm, conta);
  }

  getField(field: string): AbstractControl<any, any> | null{
    return this.editForm.get(field);
  }
}
