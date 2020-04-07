import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemeComponent } from './systeme.component';

describe('SystemeComponent', () => {
  let component: SystemeComponent;
  let fixture: ComponentFixture<SystemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
