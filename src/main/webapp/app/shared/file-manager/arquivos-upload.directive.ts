import {Directive, HostBinding, HostListener} from '@angular/core';
import {ArquivosComponent} from './arquivos.component';

@Directive({
  selector: '[jhiUploadArquivos]',
})
export class UploadArquivosDirective {
  @HostBinding('style.background') private background = 'rgba(28, 148, 205, 0.14)';
  @HostBinding('style.border') private border = 'border: 10px dashed rgba(44, 156, 209, 0.56)';

  constructor(private component: ArquivosComponent) {}

  @HostListener('dragover', ['$event'])
  public onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = 'rgba(28, 148, 205, 0.3)';
    this.border = 'border: 10px dashed rgba(44, 156, 209, 0.8)';
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = 'rgba(28, 148, 205, 0.05)';
    this.border = 'border: 10px dashed rgba(44, 156, 209, 0.4)';
  }

  @HostListener('drop', ['$event'])
  public onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    const files = evt?.dataTransfer?.files;
    this.component.readFileList(files);
    if (files && files.length > 0) {
      this.background = 'rgba(28, 148, 205, 0.05)';
      this.border = 'border: 10px dashed rgba(44, 156, 209, 0.4)';
    }
  }
}
