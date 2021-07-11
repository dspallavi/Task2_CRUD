import { Component, OnInit } from '@angular/core';
import { UserDetails } from '../user.modal';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.sass']
})
export class UserDetailsComponent implements OnInit {
  userDetails: UserDetails = {user_name: '', user_id : '', department: '', role: '', password: ''};
  mode: string = 'add';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.isUserSelected$.subscribe((id: string) => {
      if(id) {
        this.userService.getUser(id).subscribe((respnse: UserDetails) => {
            this.userDetails = respnse;
            this.mode = 'edit';
        })
      }
    });
  }

  postUsersUpdate() {
    this.userDetails = {user_name: '', user_id : '', department: '', role: '', password: ''};
    this.userService.isUserupdated$.next(true);
    this.mode = 'add';
  }

  saveUserDetails() {
    this.userService.validateUser({'user_id': this.userDetails.user_id, 'password': this.userDetails.password}).subscribe((res) => {
      if(!Array.isArray(res)) {
        if(this.mode === 'add') {
          delete this.userDetails._id;
          this.userService.createUser(this.userDetails).subscribe((result: any) => {
            this.postUsersUpdate();
          });
        } else {
          this.userService.updateUser(this.userDetails._id, this.userDetails).subscribe((result: any) => {
            this.postUsersUpdate();   
          });
        }
      } else {
        alert(`User id with ${this.userDetails.user_id} already exists.`)
      }
    });
  }
}
