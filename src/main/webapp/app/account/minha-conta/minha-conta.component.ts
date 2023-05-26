import {HttpResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IConta} from "../../entities/conta/conta.model";
import {ContaService} from "../../entities/conta/service/conta.service";
import {VendaService} from "../../entities/venda/service/venda.service";
import {VendaComProduto} from "../../entities/venda/venda.model";
import {VendaProduto} from "../../entities/venda-produto/venda-produto.model";

@Component({
  selector: 'jhi-minha-conta',
  templateUrl: './minha-conta.component.html',
})
export class MinhaContaComponent implements OnInit {
  conta: IConta | null = null;
  routeSub: any;
  vendaComProduto: VendaComProduto[];
  trackId = (_index: number, item: VendaComProduto): number => item.id ?? 0;

  constructor(private activatedRoute: ActivatedRoute,
              protected contaService: ContaService,
              protected vendaService: VendaService) {
  }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe(params => {
      if (params['telefone']) {
        const telefone = params['telefone'];
        return this.contaService.findByTelefone(telefone).subscribe(
          (res: HttpResponse<IConta>) => this.onSuccess(res.body)
        );
      }
      return null;
    });
  }

  previousState(): void {
    window.history.back();
  }

  private onSuccess(body: IConta | null) {
    this.conta = body;
    if (!!this.conta) {
      this.vendaService.findByConta(this.conta.id).subscribe(
        (res: HttpResponse<VendaComProduto[]>) => this.vendaComProduto = res.body ?? []
      );
    }
  }

  getValorTotal(vendas: VendaProduto[] | undefined) {
    let valorTotal = 0;
    if (vendas)
      vendas.forEach(v => {
        // @ts-ignore
        valorTotal += (v.valorUnitario * v.qtd)
      });
    return valorTotal;
  }

  getValorTotalProduto(produto) {
    // @ts-ignore
    return (produto.valorUnitario * produto.qtd)
  }

  getTotalDaFatura() {
    let total = 0;
    this.vendaComProduto.forEach(v => total+= this.getValorTotal(v.produtos));
    return total;
  }
}
