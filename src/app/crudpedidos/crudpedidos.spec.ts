import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Crudpedidos } from './crudpedidos';

describe('Crudpedidos', () => {
  let component: Crudpedidos;
  let fixture: ComponentFixture<Crudpedidos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Crudpedidos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Crudpedidos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
