import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarAvanceComponent } from './generar-avance.component';

describe('GenerarAvanceComponent', () => {
  let component: GenerarAvanceComponent;
  let fixture: ComponentFixture<GenerarAvanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerarAvanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerarAvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
