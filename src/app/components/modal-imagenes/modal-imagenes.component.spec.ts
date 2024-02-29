import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalImagenesComponent } from './modal-imagenes.component';

describe('ModalImagenesComponent', () => {
  let component: ModalImagenesComponent;
  let fixture: ComponentFixture<ModalImagenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalImagenesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalImagenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
