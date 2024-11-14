import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { JSONResult, LoginUser } from '../../interfaces/interface';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  user: LoginUser = {
    username: "",
    password: ""
  }

  private userService = inject(UserService);
  router = inject(Router);

  onLoginClick() {
    console.log(this.user);
    this.userService.onLogin(this.user).subscribe((res: JSONResult) => {
      if(res.result) {
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('isAdmin', res.data.isAdmin);
        localStorage.setItem('user', res.data.user);
        this.userService.userDetails = res.data.user;
        // if(res.data?.isAdmin) {
          // this.router.navigateByUrl("user-list");
        // }else {
          this.router.navigateByUrl("/home");
        // }
      }else {
        alert(res.msg);
      }
      console.log(res);
    })
  }
}
