import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {IAudioAnimacao, NewAudioAnimacao} from "../audio-animacao.model";


/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAudioAnimacao for edit and NewAudioAnimacaoFormGroupInput for create.
 */
type AudioAnimacaoFormGroupInput = IAudioAnimacao | PartialWithRequiredKeyOf<NewAudioAnimacao>;

type AudioAnimacaoFormDefaults = Pick<NewAudioAnimacao, 'id'>;

type AudioAnimacaoFormGroupContent = {
  id: FormControl<IAudioAnimacao['id'] | NewAudioAnimacao['id']>;
  peca: FormControl<IAudioAnimacao['peca']>;
  cena: FormControl<IAudioAnimacao['cena']>;
  descricao: FormControl<IAudioAnimacao['descricao']>;
  comecaEm: FormControl<IAudioAnimacao['comecaEm']>;
};

export type AudioAnimacaoFormGroup = FormGroup<AudioAnimacaoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AudioAnimacaoFormService {
  createAudioAnimacaoFormGroup(audioAnimacao: AudioAnimacaoFormGroupInput = { id: null }): AudioAnimacaoFormGroup {
    const audioAnimacaoRawValue = {
      ...this.getFormDefaults(),
      ...audioAnimacao,
    };
    return new FormGroup<AudioAnimacaoFormGroupContent>({
      id: new FormControl(
        { value: audioAnimacaoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      peca: new FormControl(audioAnimacaoRawValue.peca, {
        validators: [Validators.required],
      }),
      cena: new FormControl(audioAnimacaoRawValue.cena, {
        validators: [Validators.required],
      }),
      descricao: new FormControl(audioAnimacaoRawValue.descricao),
      comecaEm: new FormControl(audioAnimacaoRawValue.comecaEm)
    });
  }

  getAudioAnimacao(form: AudioAnimacaoFormGroup): IAudioAnimacao | NewAudioAnimacao {
    return form.getRawValue() as IAudioAnimacao | NewAudioAnimacao;
  }

  resetForm(form: AudioAnimacaoFormGroup, audioAnimacao: AudioAnimacaoFormGroupInput): void {
    const audioAnimacaoRawValue = { ...this.getFormDefaults(), ...audioAnimacao };
    form.reset(
      {
        ...audioAnimacaoRawValue,
        id: { value: audioAnimacaoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AudioAnimacaoFormDefaults {
    return {
      id: null,
    };
  }
}
