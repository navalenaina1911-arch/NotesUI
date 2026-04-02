import { Component, signal } from '@angular/core';
import { NotesSearchComponent } from '../note-search/note-search.component';
import { NotesListComponent } from '../note-list/note-list.component';
import { NoteFormComponent } from '../note-form/note-form.component';
import { Note } from '@core/models/note.model';
import { CanLeaveWithUnsaved } from '@core/guards/unsaved-changes.guard-guard';
import { NgIf }             from '@angular/common';


@Component({
  standalone: true,
  selector: 'app-notes-shell',
  imports: [NotesSearchComponent, NotesListComponent, NoteFormComponent,NgIf],
  templateUrl: './note-shell.component.html', // ✅
  styles: [`
.shell {
  max-width: 1200px;
  margin: auto;
  padding: 2rem 1rem;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.toolbar h1 {
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0;
  color: #333;
}

.toolbar button {
  background: #4f8cff;
  border: none;
  color: white;
  padding: 10px 16px;
  font-size: 0.9rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
}

.toolbar button:hover {
  background: #3d73d9;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
`]
})
export class NotesShellComponent implements CanLeaveWithUnsaved {
  showForm = signal(false);
  editingNote = signal<Note | null>(null);
  private dirty = signal(false);


  openCreate() {
  this.editingNote.set(null);
  this.showForm.set(true);
}


  onEdit(note: Note) {
    this.editingNote.set(note);
    this.showForm.set(true);
  }

  closeForm() {
    this.showForm.set(false);
    this.dirty.set(false);
  }

  markDirty(isDirty: boolean) {
    this.dirty.set(isDirty);
  }

  hasUnsavedChanges(): boolean {
    return this.dirty();
  }
}
