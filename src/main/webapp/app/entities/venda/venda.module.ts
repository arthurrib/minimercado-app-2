import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { VendaComponent } from './list/venda.component';
import { VendaDetailComponent } from './detail/venda-detail.component';
import { VendaUpdateComponent } from './update/venda-update.component';
import { VendaDeleteDialogComponent } from './delete/venda-delete-dialog.component';
import { VendaRoutingModule } from './route/venda-routing.module';
import { NgxCurrencyModule } from 'ngx-currency';
import { NgxMaskModule } from 'ngx-mask';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [SharedModule, VendaRoutingModule,  NgxCurrencyModule, NgxMaskModule.forRoot(), CommonModule,
    NgSelectModule],
  declarations: [VendaComponent, VendaDetailComponent, VendaUpdateComponent, VendaDeleteDialogComponent],
})
export class VendaModule {}
