import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { AstushaUserPreview } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class SearchUserService {
  private readonly http = inject(HttpClient);

  private readonly astushaIdApiUrl = 'http://localhost:3002';

  findUser(query: string): Observable<AstushaUserPreview[]> {
    return this.http.post<AstushaUserPreview[]>(`${this.astushaIdApiUrl}/users/search`, { query });
  }
}
