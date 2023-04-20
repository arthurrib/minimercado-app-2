import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IVenda, NewVenda } from '../venda.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IVenda for edit and NewVendaFormGroupInput for create.
 */
type VendaFormGroupInput = IVenda | PartialWithRequiredKeyOf<NewVenda>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IVenda | NewVenda> = Omit<T, 'data'> & {
  data?: string | null;
};

type VendaFormRawValue = FormValueOf<IVenda>;

type NewVendaFormRawValue = FormValueOf<NewVenda>;

type VendaFormDefaults = Pick<NewVenda, 'id' | 'data'>;

type VendaFormGroupContent = {
  id: FormControl<VendaFormRawValue['id'] | NewVenda['id']>;
  data: FormControl<VendaFormRawValue['data']>;
  status: FormControl<VendaFormRawValue['status']>;
};

export type VendaFormGroup = FormGroup<VendaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class VendaFormService {
  createVendaFormGroup(venda: VendaFormGroupInput = { id: null }): VendaFormGroup {
    const vendaRawValue = this.convertVendaToVendaRawValue({
      ...this.getFormDefaults(),
      ...venda,
    });
    return new FormGroup<VendaFormGroupContent>({
      id: new FormControl(
        { value: vendaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      data: new FormControl(vendaRawValue.data, {
        validators: [Validators.required],
      }),
      status: new FormControl(vendaRawValue.status),
    });
  }

  getVenda(form: VendaFormGroup): IVenda | NewVenda {
    return this.convertVendaRawValueToVenda(form.getRawValue() as VendaFormRawValue | NewVendaFormRawValue);
  }

  resetForm(form: VendaFormGroup, venda: VendaFormGroupInput): void {
    const vendaRawValue = this.convertVendaToVendaRawValue({ ...this.getFormDefaults(), ...venda });
    form.reset(
      {
        ...vendaRawValue,
        id: { value: vendaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): VendaFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      data: currentTime,
    };
  }

  private convertVendaRawValueToVenda(rawVenda: VendaFormRawValue | NewVendaFormRawValue): IVenda | NewVenda {
    return {
      ...rawVenda,
      data: dayjs(rawVenda.data, DATE_TIME_FORMAT),
    };
  }

  private convertVendaToVendaRawValue(
    venda: IVenda | (Partial<NewVenda> & VendaFormDefaults)
  ): VendaFormRawValue | PartialWithRequiredKeyOf<NewVendaFormRawValue> {
    return {
      ...venda,
      data: venda.data ? venda.data.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
