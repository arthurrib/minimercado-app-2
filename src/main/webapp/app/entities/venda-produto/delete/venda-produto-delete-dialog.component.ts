import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IVendaProduto } from '../venda-produto.model';
import { VendaProdutoService } from '../service/venda-produto.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './venda-produto-delete-dialog.component.html',
})
export class VendaProdutoDeleteDialogComponent {
  vendaProduto?: IVendaProduto;

  constructor(protected vendaProdutoService: VendaProdutoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.vendaProdutoService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
