import { ComponentFixture, TestBed } from '@angular/core/testing';
import {provideStorage,  getStorage} from '@angular/fire/storage';
import { SubirEntregablesComponent } from './subir-entregables.component';

describe('SubirEntregablesComponent', () => {
  let component: SubirEntregablesComponent;
  let fixture: ComponentFixture<SubirEntregablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubirEntregablesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubirEntregablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
