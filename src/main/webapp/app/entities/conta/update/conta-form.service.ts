import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IConta, NewConta } from '../conta.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IConta for edit and NewContaFormGroupInput for create.
 */
type ContaFormGroupInput = IConta | PartialWithRequiredKeyOf<NewConta>;

type ContaFormDefaults = Pick<NewConta, 'id'>;

type ContaFormGroupContent = {
  id: FormControl<IConta['id'] | NewConta['id']>;
  nome: FormControl<IConta['nome']>;
  telefone: FormControl<IConta['telefone']>;
  equipe: FormControl<IConta['equipe']>;
  status: FormControl<IConta['status']>;
};

export type ContaFormGroup = FormGroup<ContaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ContaFormService {
  createContaFormGroup(conta: ContaFormGroupInput = { id: null }): ContaFormGroup {
    const contaRawValue = {
      ...this.getFormDefaults(),
      ...conta,
    };
    return new FormGroup<ContaFormGroupContent>({
      id: new FormControl(
        { value: contaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nome: new FormControl(contaRawValue.nome, {
        validators: [Validators.required],
      }),
      telefone: new FormControl(contaRawValue.telefone, {
        validators: [Validators.required],
      }),
      equipe: new FormControl(contaRawValue.equipe, {
        validators: [Validators.required],
      }),
      status: new FormControl(contaRawValue.status, {
        validators: [Validators.required],
      }),
    });
  }

  getConta(form: ContaFormGroup): IConta | NewConta {
    return form.getRawValue() as IConta | NewConta;
  }

  resetForm(form: ContaFormGroup, conta: ContaFormGroupInput): void {
    const contaRawValue = { ...this.getFormDefaults(), ...conta };
    form.reset(
      {
        ...contaRawValue,
        id: { value: contaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ContaFormDefaults {
    return {
      id: null,
    };
  }
}
