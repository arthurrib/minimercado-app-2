import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVenda } from '../venda.model';

@Component({
  selector: 'jhi-venda-detail',
  templateUrl: './venda-detail.component.html',
})
export class VendaDetailComponent implements OnInit {
  venda: IVenda | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ venda }) => {
      this.venda = venda;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
