import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesproyectoComponent } from './detallesproyecto.component';

describe('DetallesproyectoComponent', () => {
  let component: DetallesproyectoComponent;
  let fixture: ComponentFixture<DetallesproyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesproyectoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesproyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
