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
  //! CRUD
  getUsers() {
    this.http
      .get<UserResponse[]>(`${this.baseUrl}/users`)
      .subscribe((users) => {
        this.usersSignal.set(users);
      });
  }

  newUser(userName: string) {
    const newUser: Omit<UserResponse, 'id'> = {
      name: userName,
      posts: 0,
      comments: 0,
    };
    this.http
      .post<UserResponse>(`${this.baseUrl}/users`, newUser)
      .subscribe((createdUser) => {
        this.usersSignal.update((users) => [...users, createdUser]);
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

  //! TOP DATA
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

  //! UpdateUserWithExtraData
  updateUserPosts(userId: string, change: number) {
    const users = this.usersSignal();
    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) return;

    users[userIndex] = {
      ...users[userIndex],
      posts: users[userIndex].posts + change,
    };

    this.usersSignal.set(users);
  }

  updateUserComments(userId: string, change: number) {
    const users = this.usersSignal();
    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) return;
    users[userIndex] = {
      ...users[userIndex],
      comments: users[userIndex].posts + change,
    };
  }
}
