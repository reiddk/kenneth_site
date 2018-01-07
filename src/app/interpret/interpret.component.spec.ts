import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterpretComponent } from './interpret.component';

describe('InterpretComponent', () => {
  let component: InterpretComponent;
  let fixture: ComponentFixture<InterpretComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterpretComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterpretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
