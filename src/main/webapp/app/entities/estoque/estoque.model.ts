export interface IEstoque {
  id: number;
  qtd?: number | null;
  valor?: number | null;
}

export type NewEstoque = Omit<IEstoque, 'id'> & { id: null };
