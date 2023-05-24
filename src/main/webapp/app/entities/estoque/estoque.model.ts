import {IProduto} from "../produto/produto.model";

export interface IEstoque {
  id: number;
  qtd?: number | null;
  valor?: number | null;
  produto?: Pick<IProduto, 'id' | 'nome'> | null;
}

export type NewEstoque = Omit<IEstoque, 'id'> & { id: null };
