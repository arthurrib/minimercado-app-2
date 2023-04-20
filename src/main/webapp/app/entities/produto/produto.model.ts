export interface IProduto {
  id: number;
  nome?: string | null;
  valor?: number | null;
  categoria?: string | null;
}

export type NewProduto = Omit<IProduto, 'id'> & { id: null };
