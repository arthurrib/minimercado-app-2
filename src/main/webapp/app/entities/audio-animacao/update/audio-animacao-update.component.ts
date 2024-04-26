import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { AudioAnimacaoService } from '../service/audio-animacao.service';
import { AbstractControl } from '@angular/forms';
import {IAudioAnimacao} from "../audio-animacao.model";
import {AudioAnimacaoFormGroup, AudioAnimacaoFormService} from "./audio-animacao-form.service";
import {Arquivo} from "../../../shared/file-manager/arquivo.model";

@Component({
  selector: 'jhi-audio-animacao-update',
  templateUrl: './audio-animacao-update.component.html',
})
export class AudioAnimacaoUpdateComponent implements OnInit {
  isSaving = false;
  audioAnimacao: IAudioAnimacao | null = null;

  editForm: AudioAnimacaoFormGroup = this.audioAnimacaoFormService.createAudioAnimacaoFormGroup();
  arquivoSelecionado: Arquivo;

  constructor(
    protected audioAnimacaoService: AudioAnimacaoService,
    protected audioAnimacaoFormService: AudioAnimacaoFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ audioAnimacao }) => {
      this.audioAnimacao = audioAnimacao;
      if (audioAnimacao) {
        this.updateForm(audioAnimacao);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const audioAnimacao = this.audioAnimacaoFormService.getAudioAnimacao(this.editForm);
    audioAnimacao.arquivo = this.arquivoSelecionado?.arquivo;
    if (audioAnimacao.id !== null) {
      this.subscribeToSaveResponse(this.audioAnimacaoService.update(audioAnimacao));
    } else {
      this.subscribeToSaveResponse(this.audioAnimacaoService.create(audioAnimacao));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAudioAnimacao>>): void {
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

  protected updateForm(audioAnimacao: IAudioAnimacao): void {
    this.audioAnimacao = audioAnimacao;
    this.audioAnimacaoFormService.resetForm(this.editForm, audioAnimacao);
  }

  getField(field: string): AbstractControl<any, any> | null{
    return this.editForm.get(field);
  }

  onChangeArquivo($event: Arquivo) {
    this.arquivoSelecionado = $event;
  }
}
