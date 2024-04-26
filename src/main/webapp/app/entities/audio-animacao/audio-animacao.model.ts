export interface IAudioAnimacao {
  id: number;
  peca?: string | null;
  cena?: number | null;
  arquivo?: any | null;
  descricao?: string | null;
  comecaEm?: string | null;
}

export type NewAudioAnimacao = Omit<IAudioAnimacao, 'id'> & { id: null };

export class AudioAnimacao {
  constructor(
    public id: number,
    public peca?: string,
    public cena?: number,
    public arquivo?: any,
    public descricao?: string | null,
    public comecaEm?: string | null,
  ) {
  }
}
