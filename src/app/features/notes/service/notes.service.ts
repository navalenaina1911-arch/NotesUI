import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment.development';
import { Observable } from 'rxjs';
import { Note }   from '@core/models/note.model';

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

@Injectable({ providedIn: 'root' })
export class NotesService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiBaseUrl;

  searchNotes(term: string, page = 1, pageSize = 50): Observable<PagedResult<Note>> {
    const params = {
      searchTerm: term,
      page,
      pageSize,
      sortOrder: 'desc',
      sortBy: 'createdAt'
    };
    return this.http.get<PagedResult<Note>>(`${this.baseUrl}/search`, { params });
  }

  createNote(payload: { title: string; content: string; createdBy: string }) {
    return this.http.post<Note>(this.baseUrl, payload);
  }

 getNotes() {
  return this.http.get<Note[]>(`${this.baseUrl}/getall`);
}

  updateNote(id: string, payload: { title: string; content: string; updatedBy: string }) {
    return this.http.put<void>(`${this.baseUrl}/${id}`, payload);
  }

  deleteNote(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
