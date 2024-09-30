import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadPmComponent } from './actividad-pm.component';

describe('ActividadPmComponent', () => {
  let component: ActividadPmComponent;
  let fixture: ComponentFixture<ActividadPmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActividadPmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActividadPmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
