import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AstushaUser } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  private readonly http = inject(HttpClient);

  private readonly astushaIdApiUrl = 'http://localhost:3002';

  private readonly currentUser = new BehaviorSubject<AstushaUser | null>(null);

  readonly currentUser$ = this.currentUser.asObservable();

  getMe(): Observable<AstushaUser> {
    return this.http
      .get<AstushaUser>(`${this.astushaIdApiUrl}/users/me`, {
        withCredentials: true,
      })
      .pipe(tap((user) => this.currentUser.next(user)));
  }
}
