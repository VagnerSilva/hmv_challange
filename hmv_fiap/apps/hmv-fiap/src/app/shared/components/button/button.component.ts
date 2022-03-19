import {
	AfterViewInit,
	Attribute,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	Input,
	ViewEncapsulation,
} from "@angular/core"
import { ButtonType, ColorType } from "../types"

type className = string
type ColorsType = {
	[key: string]: className[]
}

export const BUTTON_COLORS: ColorsType = {
	primary: ["hmv-btn-primary", "hmv-btn-primary--hover"],
	accent: ["hmv-btn-accent", "hmv-btn-accent--hover"],
}

@Component({
	selector: "hmv-button",
	templateUrl: "./button.component.html",
	styleUrls: ["./button.component.scss"],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements AfterViewInit {
	@Input() color: ColorType = "primary"
	@Input() disabled!: boolean
	@Input() ariaLabel!: string

	constructor(@Attribute("type") public type: ButtonType, private el: ElementRef<HTMLElement>) {
		if (this.type === null) {
			this.type = `submit`
		}
	}

	ngAfterViewInit(): void {
		this._changeColorButton()
	}

	private _changeColorButton() {
		const button: HTMLElement = this.el.nativeElement.children.item(0) as HTMLElement
		if (button) {
			button.classList.add(...BUTTON_COLORS[this.color])
		}
	}
}
