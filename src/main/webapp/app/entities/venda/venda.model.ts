import {IConta} from "../conta/conta.model";
import {VendaProduto} from "../venda-produto/venda-produto.model";

export interface IVenda {
  id: number;
  conta?: Pick<IConta, 'id' | 'nome' | 'equipe'> | null;
  observacoes?: string | null;
}

export type NewVenda = Omit<IVenda, 'id'> & { id: null };


export class VendaComProduto {
  constructor(
    public id?: number,
    public observacoes?: string,
    public createdDate?: any,
    public conta?: IConta,
    public produtos?: VendaProduto[],
    public expand?: boolean
  ) {

  }
}
