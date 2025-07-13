import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Crudproveedores } from './crudproveedores';

describe('Crudproveedores', () => {
  let component: Crudproveedores;
  let fixture: ComponentFixture<Crudproveedores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Crudproveedores]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Crudproveedores);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
