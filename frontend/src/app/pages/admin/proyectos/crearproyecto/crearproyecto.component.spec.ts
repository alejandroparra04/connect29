import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearproyectoComponent } from './crearproyecto.component';

describe('CrearproyectoComponent', () => {
  let component: CrearproyectoComponent;
  let fixture: ComponentFixture<CrearproyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearproyectoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearproyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
