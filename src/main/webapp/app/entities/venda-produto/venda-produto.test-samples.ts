import { IVendaProduto, NewVendaProduto } from './venda-produto.model';

export const sampleWithRequiredData: IVendaProduto = {
  id: 97219,
  qtd: 69260,
  valorUnitario: 59893,
};

export const sampleWithPartialData: IVendaProduto = {
  id: 84510,
  qtd: 11559,
  valorUnitario: 56330,
};

export const sampleWithFullData: IVendaProduto = {
  id: 77572,
  qtd: 79868,
  valorUnitario: 44710,
  desconto: 89314,
};

export const sampleWithNewData: NewVendaProduto = {
  qtd: 58530,
  valorUnitario: 82338,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
