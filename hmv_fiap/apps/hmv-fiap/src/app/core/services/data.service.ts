import { Injectable } from '@angular/core'

@Injectable({
	providedIn: 'root',
})
export class DataService {
	private _storage: { [key: string]: unknown } = {}

	set storage(value: unknown) {
		Object.assign(this._storage, value)
	}

	get storage(): unknown {
		return this._storage
	}
}
