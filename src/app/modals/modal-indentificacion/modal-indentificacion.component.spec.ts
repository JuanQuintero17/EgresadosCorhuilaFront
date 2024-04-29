import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalIndentificacionComponent } from './modal-indentificacion.component';

describe('ModalIndentificacionComponent', () => {
  let component: ModalIndentificacionComponent;
  let fixture: ComponentFixture<ModalIndentificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalIndentificacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalIndentificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
