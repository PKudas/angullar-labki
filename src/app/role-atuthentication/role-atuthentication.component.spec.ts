import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleAtuthenticationComponent } from './role-atuthentication.component';

describe('RoleAtuthenticationComponent', () => {
  let component: RoleAtuthenticationComponent;
  let fixture: ComponentFixture<RoleAtuthenticationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleAtuthenticationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleAtuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
