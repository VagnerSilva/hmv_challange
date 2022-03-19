import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { SharedModule } from '@shared/shared.module'
import { AutenticacaoRoutingModule } from './autenticacao-routing.module'
import { AutenticacaoComponent } from './autenticacao.component'

@NgModule({
	declarations: [AutenticacaoComponent],
	imports: [CommonModule, AutenticacaoRoutingModule, SharedModule],
})
export class AutenticacaoModule {}
