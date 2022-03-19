import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
	{ path: '', redirectTo: '/perfil/159263487', pathMatch: 'full' },
	{
		path: 'perfil/:userId',
		loadChildren: () =>
			import('./features/perfil-paciente/perfil-paciente.module').then(
				(m) => m.PerfilPacienteModule,
			),
	},
	{
		path: 'procedimentos/:userId',
		loadChildren: () =>
			import('./features/procedimentos-realizados/procedimentos-realizados.module').then(
				(m) => m.ProcedimentosRealizadosModule,
			),
	},
	{
		path: 'autentificar',
		loadChildren: () =>
			import('./features/autenticacao/autenticacao.module').then((m) => m.AutenticacaoModule),
	},
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
