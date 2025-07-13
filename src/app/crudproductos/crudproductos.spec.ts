import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Crudproductos } from './crudproductos';

describe('Crudproductos', () => {
  let component: Crudproductos;
  let fixture: ComponentFixture<Crudproductos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Crudproductos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Crudproductos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
