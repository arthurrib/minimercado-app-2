import {VendaComProduto} from "../venda/venda.model";

export interface IConta {
  id: number;
  nome?: string | null;
  telefone?: string | null;
  equipe?: string | null;
  status?: string | null;
}

export type NewConta = Omit<IConta, 'id'> & { id: null };

export class Conta {
  constructor(
  public id: number,
  public nome?: string | null,
  public telefone?: string | null,
  public equipe?: string | null,
  public status?: string | null,
  public vendaComProduto?: VendaComProduto[]
  ) {
  }
}
