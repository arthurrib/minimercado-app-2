import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAudioAnimacao } from '../audio-animacao.model';

@Component({
  selector: 'jhi-audioAnimacao-detail',
  templateUrl: './audio-animacao-detail.component.html',
})
export class AudioAnimacaoDetailComponent implements OnInit {
  audioAnimacao: IAudioAnimacao | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ audioAnimacao }) => {
      this.audioAnimacao = audioAnimacao;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
