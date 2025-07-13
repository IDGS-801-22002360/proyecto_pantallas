import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Crudcompras } from './crudcompras';

describe('Crudcompras', () => {
  let component: Crudcompras;
  let fixture: ComponentFixture<Crudcompras>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Crudcompras]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Crudcompras);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
