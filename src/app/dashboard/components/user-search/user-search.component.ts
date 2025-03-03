import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { UserResponse } from '../../interfaces/interfaces';

@Component({
  selector: 'user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css'],
})
export class UserSearchComponent implements OnInit {
  searchControl = new FormControl('');
  @Input() users!: UserResponse[];
  @Input() function!: Function;

  filteredUsers: { id: string; name: string }[] = [];

  constructor() {}
  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((searchTerm) => {
        this.filteredUsers = this.filterUsers(searchTerm);
      });
  }

  private filterUsers(searchTerm: string | null) {
    if (!searchTerm) {
      return [];
    }

    return this.users.filter((user) =>
      user.name.toLowerCase().startsWith(searchTerm.toLowerCase()),
    );
  }

  onUserSelected(user: { id: string; name: string }) {
    this.function(['user', user.id]);
    this.searchControl.reset();
  }
}
