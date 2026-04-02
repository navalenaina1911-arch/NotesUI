import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap,tap,filter,takeUntil } from 'rxjs/operators';
import { NotesStateService } from '@features/notes/service/notes-state.service';
import { NotesService } from '@features/notes/service/notes.service';
import { Subject } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-notes-search',
  imports: [ReactiveFormsModule],
  templateUrl: 'note-search.component.html', // ✅
  styleUrl: 'note-search.component.scss'        // ✅
})
export class NotesSearchComponent {
  search = new FormControl('');
  private notesService = inject(NotesService);
  private state = inject(NotesStateService);
  private destroy$ = new Subject<void>();

  constructor() {}
  ngOnInit(): void {
    this.search.valueChanges.pipe(
      tap(term => {
        if ((term ?? '').length === 0) this.state.setNotes([]);
      }),
      filter(term => (term ?? '').length >= 3),
      debounceTime(3000),
      distinctUntilChanged(),
      switchMap(term => this.notesService.searchNotes(term ?? '')),
      takeUntil(this.destroy$)
    ).subscribe(result => {
      this.state.setNotes(result.items);
    });
  }
}
