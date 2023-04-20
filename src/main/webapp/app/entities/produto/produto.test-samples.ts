import { IProduto, NewProduto } from './produto.model';

export const sampleWithRequiredData: IProduto = {
  id: 79836,
  nome: 'Extended end-to-end Steel',
  categoria: 'THX',
};

export const sampleWithPartialData: IProduto = {
  id: 25058,
  nome: 'Berkshire AGP',
  valor: 61511,
  categoria: 'global Rubber',
};

export const sampleWithFullData: IProduto = {
  id: 75144,
  nome: 'user-centric product',
  valor: 19143,
  categoria: 'Coordinator',
};

export const sampleWithNewData: NewProduto = {
  nome: 'matrix Rubber Rupee',
  categoria: 'synthesize Intelligent',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
