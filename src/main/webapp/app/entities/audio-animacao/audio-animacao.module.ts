import {NgModule} from '@angular/core';
import {SharedModule} from 'app/shared/shared.module';
import {AudioAnimacaoComponent} from './list/audio-animacao.component';
import {AudioAnimacaoDetailComponent} from './detail/audio-animacao-detail.component';
import {AudioAnimacaoUpdateComponent} from './update/audio-animacao-update.component';
import {AudioAnimacaoDeleteDialogComponent} from './delete/audio-animacao-delete-dialog.component';
import {AudioAnimacaoRoutingModule} from './route/audio-animacao-routing.module';
import { NgxMaskModule } from 'ngx-mask';
import {NgxCurrencyModule} from 'ngx-currency';

@NgModule({
  imports: [SharedModule, AudioAnimacaoRoutingModule, NgxCurrencyModule, NgxMaskModule.forRoot(),],
  declarations: [AudioAnimacaoComponent, AudioAnimacaoDetailComponent, AudioAnimacaoUpdateComponent, AudioAnimacaoDeleteDialogComponent],
})
export class AudioAnimacaoModule {
}
