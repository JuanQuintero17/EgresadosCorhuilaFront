import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiasEgresadoInfoComponent } from './noticias-egresado-info.component';

describe('NoticiasEgresadoInfoComponent', () => {
  let component: NoticiasEgresadoInfoComponent;
  let fixture: ComponentFixture<NoticiasEgresadoInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticiasEgresadoInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticiasEgresadoInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
