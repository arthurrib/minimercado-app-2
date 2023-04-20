import dayjs from 'dayjs/esm';

export interface IVenda {
  id: number;
  data?: dayjs.Dayjs | null;
  status?: string | null;
}

export type NewVenda = Omit<IVenda, 'id'> & { id: null };
