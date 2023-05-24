import {IProduto} from "../produto/produto.model";

export interface IVendaProduto {
  id: number;
  qtd?: number | null;
  valorUnitario?: number | null;
  desconto?: number | null;
  produto?: Pick<IProduto, 'id' | 'nome'> | null;
}

export type NewVendaProduto = Omit<IVendaProduto, 'id'> & { id: null };

export class VendaProduto {
  constructor(
    public id?: number,
    public qtd?: number | null,
    public valorUnitario?: number | null,
    public desconto?: number | null,
    public produto?: Pick<IProduto, 'id' | 'nome'> | null,
  ) {
  }
}
