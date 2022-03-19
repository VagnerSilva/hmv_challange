import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { PerfilPacienteComponent } from './perfil-paciente.component'
import { PerfilPacienteResolver } from './perfil-paciente.resolver'

const routes: Routes = [
	{
		path: '',
		component: PerfilPacienteComponent,
		resolve: {
			paciente: PerfilPacienteResolver,
		},
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PerfilPacienteRoutingModule {}
