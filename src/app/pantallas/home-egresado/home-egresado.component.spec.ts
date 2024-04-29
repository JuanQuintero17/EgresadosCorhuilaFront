import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEgresadoComponent } from './home-egresado.component';

describe('HomeEgresadoComponent', () => {
  let component: HomeEgresadoComponent;
  let fixture: ComponentFixture<HomeEgresadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeEgresadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEgresadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
