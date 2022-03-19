import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { SharedModule } from '@shared/shared.module'
import { AvatarModule } from 'ngx-avatar'
import { DadosPacienteComponent } from './components/dados-paciente/dados-paciente.component'
import { HospitalDestinoComponent } from './components/hospital-destino/hospital-destino.component'
import { PefilComponent } from './components/pefil/pefil.component'
import { PerfilPacienteRoutingModule } from './perfil-paciente-routing.module'
import { PerfilPacienteComponent } from './perfil-paciente.component'

@NgModule({
	declarations: [
		PerfilPacienteComponent,
		PefilComponent,
		DadosPacienteComponent,
		HospitalDestinoComponent,
	],
	imports: [CommonModule, PerfilPacienteRoutingModule, AvatarModule, SharedModule],
})
export class PerfilPacienteModule {}
