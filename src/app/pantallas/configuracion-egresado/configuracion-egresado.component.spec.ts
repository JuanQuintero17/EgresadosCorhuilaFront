import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionEgresadoComponent } from './configuracion-egresado.component';

describe('ConfiguracionEgresadoComponent', () => {
  let component: ConfiguracionEgresadoComponent;
  let fixture: ComponentFixture<ConfiguracionEgresadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfiguracionEgresadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfiguracionEgresadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
