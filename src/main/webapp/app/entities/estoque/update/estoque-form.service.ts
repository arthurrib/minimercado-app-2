import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IEstoque, NewEstoque } from '../estoque.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEstoque for edit and NewEstoqueFormGroupInput for create.
 */
type EstoqueFormGroupInput = IEstoque | PartialWithRequiredKeyOf<NewEstoque>;

type EstoqueFormDefaults = Pick<NewEstoque, 'id'>;

type EstoqueFormGroupContent = {
  id: FormControl<IEstoque['id'] | NewEstoque['id']>;
  qtd: FormControl<IEstoque['qtd']>;
  valor: FormControl<IEstoque['valor']>;
  produto: FormControl<IEstoque['produto']>;
};

export type EstoqueFormGroup = FormGroup<EstoqueFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EstoqueFormService {
  createEstoqueFormGroup(estoque: EstoqueFormGroupInput = { id: null }): EstoqueFormGroup {
    const estoqueRawValue = {
      ...this.getFormDefaults(),
      ...estoque,
    };
    return new FormGroup<EstoqueFormGroupContent>({
      id: new FormControl(
        { value: estoqueRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      qtd: new FormControl(estoqueRawValue.qtd, {
        validators: [Validators.required],
      }),
      valor: new FormControl(estoqueRawValue.valor, {
        validators: [Validators.required],
      }),
      produto: new FormControl(estoqueRawValue.produto, {
        validators: [Validators.required],
      }),
    });
  }

  getEstoque(form: EstoqueFormGroup): IEstoque | NewEstoque {
    return form.getRawValue() as IEstoque | NewEstoque;
  }

  resetForm(form: EstoqueFormGroup, estoque: EstoqueFormGroupInput): void {
    const estoqueRawValue = { ...this.getFormDefaults(), ...estoque };
    form.reset(
      {
        ...estoqueRawValue,
        id: { value: estoqueRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): EstoqueFormDefaults {
    return {
      id: null,
    };
  }
}
