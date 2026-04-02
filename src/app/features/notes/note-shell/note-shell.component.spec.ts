import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('NoteShellComponent', () => {
  let component: NoteShellComponent;
  let fixture: ComponentFixture<NoteShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteShellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NoteShellComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
