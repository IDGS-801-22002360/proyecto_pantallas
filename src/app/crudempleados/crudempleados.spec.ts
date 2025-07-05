import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRUDEmpleados } from './crudempleados';

describe('CRUDEmpleados', () => {
  let component: CRUDEmpleados;
  let fixture: ComponentFixture<CRUDEmpleados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CRUDEmpleados]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CRUDEmpleados);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
