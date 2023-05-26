import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {IConta} from '../conta.model';
import {VendaComProduto} from "../../venda/venda.model";
import {ContaService} from "../service/conta.service";
import {VendaService} from "../../venda/service/venda.service";
import {VendaProduto} from "../../venda-produto/venda-produto.model";
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'jhi-conta-detail',
  templateUrl: './conta-detail.component.html',
})
export class ContaDetailComponent implements OnInit {
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
      if (params['id']) {
        const id = params['id'];
        return this.contaService.find(id).subscribe(
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
    this.vendaComProduto.forEach(v => total += this.getValorTotal(v.produtos));
    return total;
  }
}
