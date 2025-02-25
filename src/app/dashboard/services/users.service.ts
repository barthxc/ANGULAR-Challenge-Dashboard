import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { enviroments } from 'src/environments/environments';
import { UserResponse } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl = enviroments.baseLocalUrl;
  usersSignal = signal<UserResponse[]>([]);

  constructor(private http: HttpClient) {}

  getUsers() {
    this.http
      .get<UserResponse[]>(`${this.baseUrl}/users`)
      .subscribe((users) => {
        this.usersSignal.set(users);
      });
  }

  newUser(user: UserResponse) {
    this.http
      .post<UserResponse>(`${this.baseUrl}/users`, {
        name: user.name,
        posts: 0,
        comments: 0,
      })
      .subscribe((newUser) => {
        this.usersSignal.update((users) => [...users, newUser]);
      });
  }

  deleteUser(userId: string) {
    this.http.delete(`${this.baseUrl}/users/${userId}`).subscribe(() => {
      this.usersSignal.update((users) => users.filter((u) => u.id !== userId));
    });
  }

  editUser(userId: string, updatedUser: UserResponse) {
    this.http
      .patch<UserResponse>(`${this.baseUrl}/users/${userId}`, updatedUser)
      .subscribe(() => {
        this.usersSignal.update((users) =>
          users.map((user) =>
            user.id === userId ? { ...user, ...updatedUser } : user
          )
        );
      });
  }

  getTopUsersByPosts() {
    return this.usersSignal()
      .sort((a, b) => b.posts - a.posts)
      .slice(0, 3)
      .map((user) => ({ id: user.id, name: user.name }));
  }

  getTopUsersByComments() {
    return this.usersSignal()
      .sort((a, b) => b.comments - a.comments)
      .slice(0, 3)
      .map((user) => ({ id: user.id, name: user.name }));
  }
}
