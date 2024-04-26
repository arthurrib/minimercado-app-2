import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAudioAnimacao } from '../audio-animacao.model';
import { AudioAnimacaoService } from '../service/audio-animacao.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './audio-animacao-delete-dialog.component.html',
})
export class AudioAnimacaoDeleteDialogComponent {
  audioAnimacao?: IAudioAnimacao;

  constructor(protected audioAnimacaoService: AudioAnimacaoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.audioAnimacaoService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
