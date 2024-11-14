import { Component, inject, OnInit } from '@angular/core';
import { JSONResult, RegisterUser } from '../../interfaces/interface';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ FormsModule ],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent implements OnInit {

  userObj: RegisterUser = {
    username: "",
    email: "",
    password: ""
  }

  isEditMode: boolean = false;
  userId!: number;

  private userService = inject(UserService);
  private router = inject(Router);

  ngOnInit(): void {
    // this.userObj = { username: "" ,password: "", email: ""};
    this.getUserId();
  }

  checkingEditMode() {
    if(this.userService.userId) {
      this.isEditMode = true;
      this.getUserId();
    }
  }

  onClick() {
    console.log(this.userObj);
    this.userService.onCreateUser(this.userObj).subscribe((res: JSONResult) => {
      alert(res.msg);
      if(res.result) this.router.navigateByUrl('/user-list')
    })
  }

  getUserId() {
    this.userId = this.userService.userId;
    if(this.userId){
      this.userService.onGetUserDetails(this.userId).subscribe((res: JSONResult) => {
        this.userObj.email = res.data.email;
        this.userObj.username = res.data.username;
      });
    }
  }

  onUpdate() {
      this.userService.onUpdateUser(this.userObj, this.userService.userId ).subscribe((res: JSONResult) => {
        debugger;
        alert(res.msg);
        if(res.result) this.router.navigateByUrl('/user-list')
      })
  }

}
