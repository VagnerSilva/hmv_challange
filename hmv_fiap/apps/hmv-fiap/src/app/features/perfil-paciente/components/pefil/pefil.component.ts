import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core'

@Component({
	selector: 'hmv-pefil',
	templateUrl: './pefil.component.html',
	styleUrls: ['./pefil.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PefilComponent {
	@Input() userId!: number
	@Input() nomeCompleto!: string
}
