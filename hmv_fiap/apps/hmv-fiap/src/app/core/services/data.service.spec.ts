import { createHttpFactory, SpectatorHttp } from '@ngneat/spectator/jest'
import { DataService } from './data.service'

describe('DataService', () => {
	let spectator: SpectatorHttp<DataService>
	const createService = createHttpFactory(DataService)

	beforeEach(() => (spectator = createService()))

	it('create instance', () => {
		expect(spectator.service).toBeTruthy()
	})
})
