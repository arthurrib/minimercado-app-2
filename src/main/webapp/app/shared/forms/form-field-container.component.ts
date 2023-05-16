import {Component, Input} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';

@Component({
  selector: 'app-form-field',
  styleUrls: ['./form-fields.scss'],
  template: `
    <div class="form-group {{ containerClasses }}">
      <ng-content></ng-content>
      <div *ngIf="control && control.invalid && control.errors && (control.dirty || control.touched)">
        <small class="text-danger" *ngIf="control.hasError('required')"> Este campo é obrigatório. </small>
        <small class="text-danger" *ngIf="control.hasError('minlength')">
          O tamanho mínimo deste campo é de {{ control.errors.minlength.requiredLength }} caracteres.
        </small>
        <small class="text-danger" *ngIf="control.hasError('maxlength')">
          O tamanho máximo deste campo é de {{ control.errors.maxlength.requiredLength }} caracteres.
        </small>

        <small class="text-danger" *ngIf="control.hasError('min')"> O valor mínimo deste campo
          é {{ control.errors.min.min }}. </small>
        <small class="text-danger" *ngIf="control.hasError('max')"> O valor máximo deste campo
          é {{ control.errors.max.max }}. </small>
        <small class="text-danger" *ngIf="control.hasError('isCPFValid')"> O CPF informado é inválido. </small>
        <small class="text-danger" *ngIf="control.hasError('dataInvalida')">
          {{ control.errors.msgError }}
        </small>
      </div>
    </div>
  `,
})
export class FormFieldContainerComponent {
  @Input() control: FormControl | AbstractControl | null;
  @Input() containerClasses: string;


}
