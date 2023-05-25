import {IProduto} from "../produto/produto.model";
import {IVenda} from "../venda/venda.model";

export interface IVendaProduto {
  id: number;
  qtd?: number | null;
  valorUnitario?: number | null;
  produto?: Pick<IProduto, 'id' | 'nome'> | null;
  venda?: Pick<IVenda, 'id'> | null;
}

export type NewVendaProduto = Omit<IVendaProduto, 'id'> & { id: null };

export class VendaProduto {
  constructor(
    public id?: number,
    public qtd?: number | null,
    public valorUnitario?: number | null,
    public produto?: Pick<IProduto, 'id' | 'nome'> | null,
    public venda?: Pick<IVenda, 'id'> | null,
  ) {
  }
}
