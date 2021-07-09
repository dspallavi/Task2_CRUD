import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserDetails } from './user.modal';
import { StorageMap } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersListStore: Array<UserDetails> = [];
  userDetailsSubject$ = new BehaviorSubject<Array<UserDetails>>([]);
  singleUserSubject$ = new BehaviorSubject<UserDetails>({userName: '', userId : '', department: ''});

  constructor(private storage: StorageMap) {
    storage.get('user').subscribe((users: any) => {
      this.usersListStore = users || [];
      this.userDetailsSubject$.next(users || []);
    })
   }

  saveUser(usersList: Array<UserDetails>) {
    this.usersListStore = usersList;
    this.userDetailsSubject$.next(usersList);
    this.storage.set('user', usersList).subscribe(() => {});
  }

  editUser(user : UserDetails) {
    this.singleUserSubject$.next(user);
  }

  deleteUser(user: UserDetails) {
    this.usersListStore = this.usersListStore.filter(r => 
      {
        return (r.userName !== user.userName &&  
      r.userId !== user.userId && r.department !== user.department)});
    this.userDetailsSubject$.next(this.usersListStore);
    this.storage.set('user', this.usersListStore).subscribe(() => {});
  }
}
