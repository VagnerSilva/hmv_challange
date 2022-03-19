/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { SpectatorHost } from "@ngneat/spectator"
import { createHostFactory } from "@ngneat/spectator/jest"
import { SharedModule } from "@shared/shared.module"
import { axe } from "jest-axe"
import { ButtonComponent, BUTTON_COLORS } from "./button.component"

const BUTTON_NAME = `TESTE`
const cases = {
	simple: `<hmv-button>${BUTTON_NAME}</hmv-button>`,
	accent: `<hmv-button color="accent">${BUTTON_NAME}</hmv-button>`,
}

describe("ButtonComponent", () => {
	const createHost = createHostFactory({
		component: ButtonComponent,
		declareComponent: false,
		imports: [SharedModule],
	})

	function suw(host: SpectatorHost<ButtonComponent, unknown>) {
		return {
			button: host.query(`button`) as HTMLButtonElement,
		}
	}

	it("Should create component", () => {
		const host = createHost(cases.simple)
		const { button } = suw(host)

		expect(host.component.color).toBe(`primary`)
		expect(host.component.type).toBe(`submit`)

		expect(button.className).toContain(`primary`)
		expect(host.component).toBeTruthy()
		expect(button).toHaveText(BUTTON_NAME)
		expect(host.hostFixture).toMatchSnapshot()
	})

	it("Ensure that changes color when changing color property", () => {
		const host = createHost(cases.accent)
		const { button } = suw(host)

		host.component.ngAfterViewInit = jest.fn()
		host.component.ngAfterViewInit()

		expect(host.component.color).toBe("accent")
		expect(host.component.ngAfterViewInit).toHaveBeenCalledTimes(1)
		expect(button).toHaveText(BUTTON_NAME)
		expect(button).toHaveClass(BUTTON_COLORS["accent"])
		expect(host.hostFixture).toMatchSnapshot()
	})

	it("should verify component accessibility", async () => {
		const host = createHost(cases.simple)
		expect(await axe(host.hostFixture.nativeElement)).toHaveNoViolations()
	})
})
