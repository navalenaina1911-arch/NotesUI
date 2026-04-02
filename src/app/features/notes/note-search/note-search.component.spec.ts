import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteSearchComponent } from './note-search.component';

describe('NoteSearchComponent', () => {
  let component: NoteSearchComponent;
  let fixture: ComponentFixture<NoteSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteSearchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NoteSearchComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
