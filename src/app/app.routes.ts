import { Routes } from '@angular/router';
import { NotesShellComponent } from './features/notes/note-shell/note-shell.component';
import { UnsavedChangesGuard } from './core/guards/unsaved-changes.guard-guard';

export const routes: Routes = [
  {
    path: '',
    component: NotesShellComponent,
    canDeactivate: [UnsavedChangesGuard]
  },
  { path: '**', redirectTo: '' }
];
