import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEntregableComponent } from './crear-entregable.component';

describe('CrearEntregableComponent', () => {
  let component: CrearEntregableComponent;
  let fixture: ComponentFixture<CrearEntregableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearEntregableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearEntregableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
