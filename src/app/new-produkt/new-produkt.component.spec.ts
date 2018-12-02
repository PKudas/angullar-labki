import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProduktComponent } from './new-produkt.component';

describe('NewProduktComponent', () => {
  let component: NewProduktComponent;
  let fixture: ComponentFixture<NewProduktComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewProduktComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProduktComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
