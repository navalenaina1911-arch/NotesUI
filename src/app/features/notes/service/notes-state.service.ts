import { Injectable, signal, computed } from '@angular/core';
import { Note }   from '@core/models/note.model';

@Injectable({ providedIn: 'root' })
export class NotesStateService {
  private notesSignal = signal<Note[]>([]);
  loadingSignal = signal(false);

  notes = computed(() => this.notesSignal());
  loading = computed(() => this.loadingSignal());


  setLoading(value: boolean) {
  this.loadingSignal.set(value);
  }

  setNotes(list: Note[]) {
    this.notesSignal.set(list);
  }

  addNote(note: Note) {
    this.notesSignal.update(n => [note, ...n]);
  }


  updateNote(updated: Note) {
    this.notesSignal.update(list =>
      list.map(n => n.externalNoteReference === updated.externalNoteReference ? updated : n)
    );
  }

  removeNote(id: string) {
    this.notesSignal.update(list =>
      list.filter(n => n.externalNoteReference !== id)
    );
  }
}
