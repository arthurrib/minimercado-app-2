import { IEstoque, NewEstoque } from './estoque.model';

export const sampleWithRequiredData: IEstoque = {
  id: 46991,
  qtd: 51795,
  valor: 60536,
};

export const sampleWithPartialData: IEstoque = {
  id: 83489,
  qtd: 51958,
  valor: 38612,
};

export const sampleWithFullData: IEstoque = {
  id: 83209,
  qtd: 55913,
  valor: 20606,
};

export const sampleWithNewData: NewEstoque = {
  qtd: 8841,
  valor: 96443,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
