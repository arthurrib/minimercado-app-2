import dayjs from 'dayjs/esm';

import { IVenda, NewVenda } from './venda.model';

export const sampleWithRequiredData: IVenda = {
  id: 28928,
  data: dayjs('2023-04-19T14:01'),
};

export const sampleWithPartialData: IVenda = {
  id: 6637,
  data: dayjs('2023-04-19T19:08'),
  status: 'Chicken Practical',
};

export const sampleWithFullData: IVenda = {
  id: 24267,
  data: dayjs('2023-04-19T08:57'),
  status: 'transmit integrate',
};

export const sampleWithNewData: NewVenda = {
  data: dayjs('2023-04-19T12:01'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
