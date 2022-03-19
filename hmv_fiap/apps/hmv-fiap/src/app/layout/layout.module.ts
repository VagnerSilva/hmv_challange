import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { SharedModule } from '@shared/shared.module'
import { HeaderComponent } from './components/header/header.component'
import { LayoutComponent } from './layout.component'

@NgModule({
	declarations: [LayoutComponent, HeaderComponent],
	imports: [CommonModule, SharedModule],
	exports: [LayoutComponent],
})
export class LayoutModule {}
