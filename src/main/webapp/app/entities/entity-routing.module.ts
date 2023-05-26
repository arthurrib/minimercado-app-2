import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'produto',
        data: { pageTitle: 'Produtos' },
        loadChildren: () => import('./produto/produto.module').then(m => m.ProdutoModule),
      },
      {
        path: 'relatorio',
        data: { pageTitle: 'Relatório' },
        loadChildren: () => import('./relatorio/relatorio.module').then(m => m.RelatorioModule),
      },
      {
        path: 'conta',
        data: { pageTitle: 'Contas' },
        loadChildren: () => import('./conta/conta.module').then(m => m.ContaModule),
      },
      {
        path: 'estoque',
        data: { pageTitle: 'Estoques' },
        loadChildren: () => import('./estoque/estoque.module').then(m => m.EstoqueModule),
      },
      {
        path: 'venda',
        data: { pageTitle: 'Vendas' },
        loadChildren: () => import('./venda/venda.module').then(m => m.VendaModule),
      },
      {
        path: 'venda-produto',
        data: { pageTitle: 'VendaProdutos' },
        loadChildren: () => import('./venda-produto/venda-produto.module').then(m => m.VendaProdutoModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
