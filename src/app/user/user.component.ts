import { Component, OnInit } from '@angular/core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {
  loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser") || "");
  logutIcon = faSignOutAlt;

  constructor() { }

  ngOnInit(): void {}

  logout() {
    sessionStorage.removeItem("loggedInUser");
    window.location.href = "/";
  }

}
