import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProduto } from '../produto.model';

@Component({
  selector: 'jhi-produto-detail',
  templateUrl: './produto-detail.component.html',
})
export class ProdutoDetailComponent implements OnInit {
  produto: IProduto | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ produto }) => {
      this.produto = produto;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
