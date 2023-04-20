export interface IVendaProduto {
  id: number;
  qtd?: number | null;
  valorUnitario?: number | null;
  desconto?: number | null;
}

export type NewVendaProduto = Omit<IVendaProduto, 'id'> & { id: null };
