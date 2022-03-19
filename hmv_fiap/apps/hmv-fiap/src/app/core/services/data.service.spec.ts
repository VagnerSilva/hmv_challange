import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest'
import { DataService } from './data.service'

describe('DataService', () => {
	let spectator: SpectatorService<DataService>
	const createService = createServiceFactory(DataService)

	beforeEach(() => (spectator = createService()))

	it('create instance', () => {
		expect(spectator.service).toBeTruthy()
	})
})
