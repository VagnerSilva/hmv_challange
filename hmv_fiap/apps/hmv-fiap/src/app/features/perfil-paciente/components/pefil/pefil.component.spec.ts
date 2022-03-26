import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest'
import { SharedModule } from '@shared/shared.module'
import { PefilComponent } from './pefil.component'

describe('PefilComponent', () => {
	let spectator: Spectator<PefilComponent>
	const createComponent = createComponentFactory({
		component: PefilComponent,
		imports: [SharedModule],
		schemas: [CUSTOM_ELEMENTS_SCHEMA],
	})

	it('Deve criar componente', () => {
		spectator = createComponent()
		expect(spectator.component).toBeTruthy()
	})

	it('Deve carrega perfil', () => {
		spectator = createComponent({
			props: {
				nomeCompleto: 'nome',
				userId: 123456,
			},
		})
		spectator.detectChanges()
		expect(spectator.component).toBeTruthy()
		expect(spectator.component.nomeCompleto).toEqual('nome')
		expect(spectator.component.userId).toEqual(123456)
	})
})
