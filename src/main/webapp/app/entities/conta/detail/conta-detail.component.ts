import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IConta } from '../conta.model';

@Component({
  selector: 'jhi-conta-detail',
  templateUrl: './conta-detail.component.html',
})
export class ContaDetailComponent implements OnInit {
  conta: IConta | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ conta }) => {
      this.conta = conta;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
