import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmisionCertificadoComponent } from './emision-certificado.component';

describe('EmisionCertificadoComponent', () => {
  let component: EmisionCertificadoComponent;
  let fixture: ComponentFixture<EmisionCertificadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmisionCertificadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmisionCertificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
