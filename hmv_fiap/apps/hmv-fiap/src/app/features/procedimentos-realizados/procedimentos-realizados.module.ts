import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { SharedModule } from '@shared/shared.module'
import { ProcedimentosRealizadosRoutingModule } from './procedimentos-realizados-routing.module'
import { ProcedimentosRealizadosComponent } from './procedimentos-realizados.component'

@NgModule({
	declarations: [ProcedimentosRealizadosComponent],
	imports: [CommonModule, ProcedimentosRealizadosRoutingModule, SharedModule],
})
export class ProcedimentosRealizadosModule {}
