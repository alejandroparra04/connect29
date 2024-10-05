import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarEntregablesComponent } from './eliminar-entregables.component';

describe('EliminarEntregablesComponent', () => {
  let component: EliminarEntregablesComponent;
  let fixture: ComponentFixture<EliminarEntregablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarEntregablesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarEntregablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
