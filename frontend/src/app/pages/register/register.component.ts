import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RegisterUser } from '../../interfaces/interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private userService = inject(UserService);

  user: RegisterUser = {
    username: "",
    email: "",
    password: ""
  }

  onRegisterClick() {
    console.log(this.user);
    if(!this.user.username || !this.user.email || !this.user.password ) {
      console.log('user credentials not valid');
      return;
    }
    this.userService.onRegister(this.user).subscribe((res: any) => {
      console.log(res);
    })
  }

}
