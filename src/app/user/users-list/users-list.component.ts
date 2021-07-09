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

  constructor(public userSvc: UserService) { }

  ngOnInit(): void {
  }

  deleteUser(user: UserDetails, key: number) {
       this.userSvc.deleteUser(user);
  }

  editUser(user: UserDetails, key: number) {
    user.key = key;
    this.userSvc.editUser(user);
  }
}
