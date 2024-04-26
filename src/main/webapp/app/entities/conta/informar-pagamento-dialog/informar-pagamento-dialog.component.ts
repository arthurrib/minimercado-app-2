import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {IConta} from "../conta.model";
import {ContaService} from "../service/conta.service";


@Component({
  selector: 'jhi-informar-pagamento-dialog',
  templateUrl: './informar-pagamento-dialog.component.html',
})
export class InformarPagamentoDialogComponent {
  conta?: IConta;
  valorPagamento: number;
  formaPagamento: string;
  observacoesPagamento: string;

  constructor(private service: ContaService, private activeModal: NgbActiveModal) {
  }

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirm(): void {
    if (!this.valorPagamento) return;
    this.service.informarPagamento(this.conta?.id, this.valorPagamento, this.observacoesPagamento, this.formaPagamento)
      .subscribe(() => this.activeModal.close('success'));
  }

  get getTelefone() {
    return this.conta?.telefone || '';
  }
}
