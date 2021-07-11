import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  userid: string = '';
  password: string = '';
  userIcon = faUser;
  passIcon = faKey;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    let loggedInUSer = sessionStorage.getItem("loggedInUser");
    if(loggedInUSer) {
      this.router.navigate(['/users']);
    }
  }

  login() {
    this.userService.validateUser({'user_id': this.userid, 'password': this.password}).subscribe((res) => {
        if(Array.isArray(res)) {
          sessionStorage.setItem("loggedInUser", JSON.stringify(res));
          this.router.navigate(['/users']);
        } else {
                alert(`Invalid credentials`)
        }
    });
  }

}
