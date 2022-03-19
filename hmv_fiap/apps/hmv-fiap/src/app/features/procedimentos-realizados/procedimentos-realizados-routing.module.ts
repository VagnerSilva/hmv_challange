import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcedimentosRealizadosComponent } from './procedimentos-realizados.component';

const routes: Routes = [{ path: '', component: ProcedimentosRealizadosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcedimentosRealizadosRoutingModule { }
