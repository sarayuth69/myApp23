import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CutomermenuPage } from './cutomermenu.page';

describe('CutomermenuPage', () => {
  let component: CutomermenuPage;
  let fixture: ComponentFixture<CutomermenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CutomermenuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CutomermenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
