import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core'

@Component({
	selector: 'hmv-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {}
