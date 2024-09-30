import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadSiComponent } from './actividad-si.component';

describe('ActividadSiComponent', () => {
  let component: ActividadSiComponent;
  let fixture: ComponentFixture<ActividadSiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActividadSiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActividadSiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
