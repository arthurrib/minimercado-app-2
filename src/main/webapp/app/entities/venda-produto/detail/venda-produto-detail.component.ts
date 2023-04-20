import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVendaProduto } from '../venda-produto.model';

@Component({
  selector: 'jhi-venda-produto-detail',
  templateUrl: './venda-produto-detail.component.html',
})
export class VendaProdutoDetailComponent implements OnInit {
  vendaProduto: IVendaProduto | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ vendaProduto }) => {
      this.vendaProduto = vendaProduto;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
