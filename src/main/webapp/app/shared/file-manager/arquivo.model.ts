export class Arquivo {
  constructor(
    public arquivo?: any,
    public nomeArquivo?: string,
    public contentType?: string,
    public loaded?: boolean,
    public error?: string,
  ) {}
}
