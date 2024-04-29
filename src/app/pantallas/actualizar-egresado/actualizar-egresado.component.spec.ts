import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarEgresadoComponent } from './actualizar-egresado.component';

describe('ActualizarEgresadoComponent', () => {
  let component: ActualizarEgresadoComponent;
  let fixture: ComponentFixture<ActualizarEgresadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarEgresadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarEgresadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
