import { Component, EventEmitter, Input, OnInit, Output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesStateService } from '@features/notes/service/notes-state.service';
import { NotesService } from '@features/notes/service/notes.service';
import { Note }             from '@core/models/note.model';
import { NgIf }             from '@angular/common';
import { NoteFormComponent } from '@features/notes/note-form/note-form.component';

@Component({
  standalone: true,
  selector: 'app-notes-list',
  imports: [CommonModule,NgIf,NoteFormComponent],
  templateUrl: './note-list.component.html',
 styles: [`
.notes-grid{
  display:grid;
  grid-template-columns: repeat(auto-fill,minmax(750px,1fr));
  gap:20px;
  padding:10px;
}

.note-card{
  background:#d2d5f0;
  padding:16px;
  border-radius:12px;
  box-shadow:0 4px 10px rgba(0,0,0,0.08);
  transition: transform .2s, box-shadow .2s;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
}

.note-card:hover{
  transform:translateY(-4px);
  box-shadow:0 8px 18px rgba(0,0,0,0.12);
}

.note-header h3{
  margin:0;
  font-size:1.1rem;
}

.note-content{
  margin:10px 0;
  color:#444;
}

.note-footer{
  display:flex;
  justify-content:space-between;
  align-items:center;
  font-size:12px;
  color:#777;
}

.note-actions button{
  border:none;
  background:transparent;
  cursor:pointer;
  font-size:16px;
  margin-left:6px;
}

.edit-btn:hover{
  color:#4f8cff;
}

.delete-btn:hover{
  color:#e53935;
}

.empty{
  text-align:center;
  margin-top:40px;
  color:#999;
}
`]
})
export class NotesListComponent implements OnInit {
  private notesState = inject(NotesStateService);
  private notesService = inject(NotesService);

  
notes = this.notesState.notes;       // signal — use in template as notes()
loading = this.notesState.loading;   // signal — use in template as loading()
@Output() edit = new EventEmitter<Note>();  // ✅ typed as Note
showForm = false;
editingNote: Note | null = null;
  ngOnInit(): void {
   // this.loadNotes();
  }
  private loadNotes(): void {
    this.notesState.setLoading(true);
    this.notesService.getNotes().subscribe({
      next: (data) => this.notesState.setNotes(data),
      error: (err) => console.error('Failed to load notes', err),
      complete: () => this.notesState.setLoading(false)
    });
  }

  openEdit(note: Note): void {
   console.log('openEdit called', note);  // ✅ check this logs
  this.editingNote = note;
  this.showForm = true;
  console.log('showForm:', this.showForm);  // ✅ should be true
  }

  closeModal(): void {
    this.editingNote = null;
    this.showForm = false;
  }

  onDelete(note: Note): void {
    this.notesService.deleteNote(note.externalNoteReference).subscribe(() => {
      this.notesState.removeNote(note.externalNoteReference);
    });
  }
}






