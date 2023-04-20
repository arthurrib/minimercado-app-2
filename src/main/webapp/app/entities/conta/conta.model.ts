export interface IConta {
  id: number;
  nome?: string | null;
  telefone?: string | null;
  equipe?: string | null;
  status?: string | null;
}

export type NewConta = Omit<IConta, 'id'> & { id: null };
