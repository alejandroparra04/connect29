import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarproyectoComponent } from './eliminarproyecto.component';

describe('EliminarproyectoComponent', () => {
  let component: EliminarproyectoComponent;
  let fixture: ComponentFixture<EliminarproyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarproyectoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarproyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
