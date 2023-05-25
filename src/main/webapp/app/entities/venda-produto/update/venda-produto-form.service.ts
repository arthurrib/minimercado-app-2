import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IVendaProduto, NewVendaProduto } from '../venda-produto.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IVendaProduto for edit and NewVendaProdutoFormGroupInput for create.
 */
type VendaProdutoFormGroupInput = IVendaProduto | PartialWithRequiredKeyOf<NewVendaProduto>;

type VendaProdutoFormDefaults = Pick<NewVendaProduto, 'id'>;

type VendaProdutoFormGroupContent = {
  id: FormControl<IVendaProduto['id'] | NewVendaProduto['id']>;
  qtd: FormControl<IVendaProduto['qtd']>;
  valorUnitario: FormControl<IVendaProduto['valorUnitario']>;
};

export type VendaProdutoFormGroup = FormGroup<VendaProdutoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class VendaProdutoFormService {
  createVendaProdutoFormGroup(vendaProduto: VendaProdutoFormGroupInput = { id: null }): VendaProdutoFormGroup {
    const vendaProdutoRawValue = {
      ...this.getFormDefaults(),
      ...vendaProduto,
    };
    return new FormGroup<VendaProdutoFormGroupContent>({
      id: new FormControl(
        { value: vendaProdutoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      qtd: new FormControl(vendaProdutoRawValue.qtd, {
        validators: [Validators.required],
      }),
      valorUnitario: new FormControl(vendaProdutoRawValue.valorUnitario, {
        validators: [Validators.required],
      }),
    });
  }

  getVendaProduto(form: VendaProdutoFormGroup): IVendaProduto | NewVendaProduto {
    return form.getRawValue() as IVendaProduto | NewVendaProduto;
  }

  resetForm(form: VendaProdutoFormGroup, vendaProduto: VendaProdutoFormGroupInput): void {
    const vendaProdutoRawValue = { ...this.getFormDefaults(), ...vendaProduto };
    form.reset(
      {
        ...vendaProdutoRawValue,
        id: { value: vendaProdutoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): VendaProdutoFormDefaults {
    return {
      id: null,
    };
  }
}
