import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersListComponent } from './users-list/users-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    UserComponent,
    UserDetailsComponent,
    UsersListComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    UserRoutingModule
  ],
  exports: [UserComponent]
})
export class UserModule { }
