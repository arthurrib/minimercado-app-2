import { IConta, NewConta } from './conta.model';

export const sampleWithRequiredData: IConta = {
  id: 17789,
  nome: 'RAM reboot',
  telefone: 'Wooden',
  equipe: 'Frozen',
};

export const sampleWithPartialData: IConta = {
  id: 34410,
  nome: 'Flats Account',
  telefone: 'synthesize Berkshire Account',
  equipe: 'Ghana',
  status: 'Sandwich Guilder Baht',
};

export const sampleWithFullData: IConta = {
  id: 40809,
  nome: 'Concrete',
  telefone: 'user',
  equipe: 'Unions bandwidth',
  status: 'Tasty payment Savings',
};

export const sampleWithNewData: NewConta = {
  nome: 'Configuration applications Borders',
  telefone: 'connect partnerships Lira',
  equipe: 'blockchains input',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
