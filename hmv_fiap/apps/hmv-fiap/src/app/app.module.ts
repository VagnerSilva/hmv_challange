/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { SharedModule } from '@shared/shared.module'
import { AvatarModule } from 'ngx-avatar'
import { ToastrModule } from 'ngx-toastr'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LayoutModule } from './layout/layout.module'
@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		SharedModule,
		AvatarModule,
		LayoutModule,
		HttpClientModule,
		ToastrModule.forRoot(),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
