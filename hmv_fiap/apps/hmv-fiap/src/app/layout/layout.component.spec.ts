import { Component } from '@angular/core'
import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest'
import { LayoutComponent } from './layout.component'

const cases = {
	single: `<hmv-layout></hmv-layout>`,
	main: `
  <hmv-layout>
    <main>{{title}}</main>
  </hmv-layout>`,
	title: 'Custom HostComponent',
}

@Component({ template: '' })
class CustomHostComponent {
	title = cases.title
}

describe('LayoutComponent', () => {
	let host: SpectatorHost<LayoutComponent, CustomHostComponent>
	const createHost = createHostFactory({
		component: LayoutComponent,
		host: CustomHostComponent,
	})

	it('Snapshot successfully', () => {
		host = createHost(cases.single)
		expect(host.hostFixture).toMatchSnapshot()
	})

	it('should display the host component title', () => {
		host = createHost(cases.main)
		expect(host.query(`main`)).toHaveText(cases.title)
		expect(host.hostFixture).toMatchSnapshot()
	})
})
