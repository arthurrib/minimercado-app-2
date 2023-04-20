import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { VendaComponent } from './list/venda.component';
import { VendaDetailComponent } from './detail/venda-detail.component';
import { VendaUpdateComponent } from './update/venda-update.component';
import { VendaDeleteDialogComponent } from './delete/venda-delete-dialog.component';
import { VendaRoutingModule } from './route/venda-routing.module';

@NgModule({
  imports: [SharedModule, VendaRoutingModule],
  declarations: [VendaComponent, VendaDetailComponent, VendaUpdateComponent, VendaDeleteDialogComponent],
})
export class VendaModule {}
