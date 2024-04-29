import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiasEgresadoComponent } from './noticias-egresado.component';

describe('NoticiasEgresadoComponent', () => {
  let component: NoticiasEgresadoComponent;
  let fixture: ComponentFixture<NoticiasEgresadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticiasEgresadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticiasEgresadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
