import {NgModule} from '@angular/core';
import {SharedModule} from 'app/shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';
import {NgxCurrencyModule} from 'ngx-currency';
import {RelatorioComponent} from "./relatorio.component";
import {RelatorioRoutingModule} from "./relatorio-routing.module";

@NgModule({
  imports: [SharedModule, RelatorioRoutingModule, NgxCurrencyModule, NgxMaskModule.forRoot(),],
  declarations: [RelatorioComponent],
})
export class RelatorioModule {
}
