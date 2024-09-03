import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditApplicationPage } from './edit-application.page';

describe('EditApplicationPage', () => {
  let component: EditApplicationPage;
  let fixture: ComponentFixture<EditApplicationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditApplicationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
