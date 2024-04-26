import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Arquivo} from './arquivo.model';

@Component({
  selector: 'jhi-arquivos',
  templateUrl: './arquivos.component.html',
  styleUrls: ['./arquivo.scss'],
})
export class ArquivosComponent implements OnInit {
  /**
   * Deve ser de acordo com a URL que sera acionada para realizar o upload (criar ou trocar o arquivo)
   */
  @Input()
  tipo: string;

  @Input()
  nomeArquivo?: string = 'arquivo';

  @Input()
  value?: Arquivo;

  @Input()
  readonly?: boolean = false;

  @Output()
  onChange = new EventEmitter<Arquivo>();

  arquivos: Arquivo;

  loadingUpload: boolean = false;
  loadingView: boolean = false;

  constructor() {
  }

  ngOnInit() {
    if (this.value) {
      this.arquivos = this.value;
    }
  }

  readFile(target: any) {
    this.loadingUpload = true;
    const files: FileList | null = (<HTMLInputElement>target).files;
    this.readFileList(files);
  }

  readFileList(files?: FileList | null) {
    this.loadingUpload = true;
    if (!files || files.length === 0) {
      return;
    }
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      const file: Arquivo = new Arquivo();
      reader.onload = function (e) {
        file.contentType = (<string>e?.target?.result).split(',')[0];
        file.arquivo = (<string>e?.target?.result).split(',')[1];
        file.loaded = true;
      };

      reader.readAsDataURL(files[i]);
      this.arquivos = file;
      this.onChange.emit(this.arquivos);
    }
  }

  delete() {
    this.onChange.emit(undefined);
  }
}
