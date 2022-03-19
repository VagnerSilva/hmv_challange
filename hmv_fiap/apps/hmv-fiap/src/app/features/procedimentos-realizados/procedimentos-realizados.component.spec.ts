import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedimentosRealizadosComponent } from './procedimentos-realizados.component';

describe('ProcedimentosRealizadosComponent', () => {
  let component: ProcedimentosRealizadosComponent;
  let fixture: ComponentFixture<ProcedimentosRealizadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcedimentosRealizadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedimentosRealizadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
