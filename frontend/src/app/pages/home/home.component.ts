import { Component, inject, OnInit } from '@angular/core';
import { JSONResult, User } from '../../interfaces/interface';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { DatePipe, JsonPipe, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, JsonPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

    private userService = inject(UserService);

    name = '';

    ngOnInit(): void {
      this.name = 'new name';
    }

    userData = this.userService.userDetails;

    user: Partial<User> = {
      username: this.userData.username,
      email: this.userData.email,
      password: this.userData.password,
    }

    onCreateUserClick(id: number) {
      this.userService.onUpdateUser( this.user , id).subscribe((res: JSONResult) => {
        if(res.result) {
          alert(res.msg);
        }
      })
    }
}
