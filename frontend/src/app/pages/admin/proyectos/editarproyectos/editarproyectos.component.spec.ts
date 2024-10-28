import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarproyectosComponent } from './editarproyectos.component';

describe('EditarproyectosComponent', () => {
  let component: EditarproyectosComponent;
  let fixture: ComponentFixture<EditarproyectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarproyectosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarproyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
