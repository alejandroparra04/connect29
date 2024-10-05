import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEntregablesComponent } from './editar-entregables.component';

describe('EditarEntregablesComponent', () => {
  let component: EditarEntregablesComponent;
  let fixture: ComponentFixture<EditarEntregablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarEntregablesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarEntregablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
