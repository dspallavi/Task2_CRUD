import { Component, OnInit } from '@angular/core';
import { UserDetails } from '../user.modal';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.sass']
})
export class UserDetailsComponent implements OnInit {
  userDetails: UserDetails = {department: "", userId : "", userName : ""};
  isEdit = false;

  constructor(private userSvc: UserService) { }

  ngOnInit(): void {
    this.userSvc.singleUserSubject$.subscribe((user:UserDetails) => {
        this.userDetails = Object.assign({}, user);
        this.isEdit = true;
    });
  }

  saveUserDetails() {
    let localList = this.userSvc.usersListStore.map(rec => Object.assign({}, rec));
    if(this.isEdit) {
      localList = localList.filter(r => r.userName !== this.userDetails.userName && r.key !== this.userDetails.key && 
        r.userId !== this.userDetails.userId && r.department !== this.userDetails.department);
    }
    localList.push(this.userDetails);
    this.userSvc.saveUser(localList);
    this.userDetails = {department: "", userId : "", userName : ""};
    this.isEdit = false;
  }
}
