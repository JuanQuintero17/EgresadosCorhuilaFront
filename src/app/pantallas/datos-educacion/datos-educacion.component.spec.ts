import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosEducacionComponent } from './datos-educacion.component';

describe('DatosEducacionComponent', () => {
  let component: DatosEducacionComponent;
  let fixture: ComponentFixture<DatosEducacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosEducacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosEducacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
