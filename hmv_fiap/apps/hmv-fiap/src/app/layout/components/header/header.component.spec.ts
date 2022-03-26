import { byAltText, byText, createComponentFactory, Spectator } from '@ngneat/spectator/jest'
import { SharedModule } from '@shared/shared.module'
import { HeaderComponent } from './header.component'

const cases = {
	title: 'Portal Socorrista',
	src: '/assets/imgs/logo.png',
}

describe('HeaderComponent', () => {
	let spectator: Spectator<HeaderComponent>
	const createComponent = createComponentFactory({
		component: HeaderComponent,
		imports: [SharedModule],
	})

	beforeEach(() => (spectator = createComponent()))

	it('should display the title', () => {
		const title = spectator.query(byText(cases.title)) as HTMLElement
		const { component } = spectator
		expect(title.textContent).toEqual(cases.title)
		expect(component.title).toEqual(cases.title)
	})

	it('should display the logo', () => {
		const image = spectator.query(byAltText('logo')) as HTMLElement
		const src = image.getAttribute('src')
		expect(src).toEqual(cases.src)
	})
})
