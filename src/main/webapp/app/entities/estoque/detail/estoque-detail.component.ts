import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEstoque } from '../estoque.model';

@Component({
  selector: 'jhi-estoque-detail',
  templateUrl: './estoque-detail.component.html',
})
export class EstoqueDetailComponent implements OnInit {
  estoque: IEstoque | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ estoque }) => {
      this.estoque = estoque;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
