import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { UserDetails } from '../user.modal';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.sass']
})
export class UsersListComponent implements OnInit {
  editicon = faEdit;
  delIcon = faTrash;
  usersList: Array<UserDetails> = [];

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.getUserList();
    this.userService.isUserupdated$.subscribe((isupdated: boolean) => {
      if(isupdated) {
        this.getUserList();
      }
    });
  }

  getUserList() {
    this.userService.getUserList().subscribe((results: any) => {
      this.usersList = results;
    })
  }

  deleteUser(user: any) {
      this.userService.deleteUser(user._id).subscribe((res: any) => {
        this.getUserList();
      })
  }

  editUser(user: any) {
    this.userService.isUserSelected$.next(user._id);
  }
}
