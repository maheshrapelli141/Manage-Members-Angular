import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveMemberComponent } from './save-member.component';

describe('SaveMemberComponent', () => {
  let component: SaveMemberComponent;
  let fixture: ComponentFixture<SaveMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
