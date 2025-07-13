import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Crudclientes } from './crudclientes';

describe('Crudclientes', () => {
  let component: Crudclientes;
  let fixture: ComponentFixture<Crudclientes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Crudclientes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Crudclientes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
