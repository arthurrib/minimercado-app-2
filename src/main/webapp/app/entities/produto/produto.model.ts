export interface IProduto {
  id: number;
  nome?: string | null;
  valor?: number | null;
  categoria?: string | null;
}

export type NewProduto = Omit<IProduto, 'id'> & { id: null };

export class Produto {
  constructor(
    public id: number,
    public nome?: string | null,
    public valor?: number | null,
    public categoria?: string | null,
  ) {
  }
}
