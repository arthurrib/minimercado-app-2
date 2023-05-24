import {IConta} from "../conta/conta.model";

export interface IVenda {
  id: number;
  conta?: Pick<IConta, 'id' | 'nome' | 'equipe'> | null;
  observacoes?: string | null;
}

export type NewVenda = Omit<IVenda, 'id'> & { id: null };
