import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NotesStateService } from '@features/notes/service/notes-state.service';
import { NotesService } from '@features/notes/service/notes.service';
import { ModalComponent } from '../../../shared/ui/modal/modal.component'
import { Note }             from '@core/models/note.model';
import { CommonModule } from '@angular/common';


@Component({
  standalone: true,
  selector: 'app-note-form',
  imports: [ReactiveFormsModule, ModalComponent, CommonModule],
  templateUrl: './note-form.component.html',
  styleUrl: './note-form.component.css'
})
export class NoteFormComponent implements OnInit {
  @Input() note: Note | null = null;
  @Output() cancel = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private service = inject(NotesService);
  private state = inject(NotesStateService);

  form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(50)]],
    content: ['', [Validators.maxLength(500)]]
  });

  ngOnInit(): void {
    if (this.note) {
      this.form.patchValue({
        title: this.note.title,
        content: this.note.content
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) return;

    if (!this.note) {
      this.service.createNote({
        title: this.form.value.title!,
        content: this.form.value.content ?? '',
        createdBy: 'system'
      }).subscribe(note => {
        this.state.addNote(note);
        this.cancel.emit();
      });
    } else {
      this.service.updateNote(this.note.externalNoteReference, {
        title: this.form.value.title!,
        content: this.form.value.content ?? '',
        updatedBy: 'system'
      }).subscribe(() => {
        const updated: Note = {
          ...this.note!,
          title: this.form.value.title!,
          content: this.form.value.content ?? ''
        };
        this.state.updateNote(updated);
        this.cancel.emit();
      });
    }
  }
}
