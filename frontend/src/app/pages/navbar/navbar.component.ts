import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../../interfaces/interface';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  private router = inject(Router);
  private userService = inject(UserService);
  private authService = inject(AuthService);

  onLogoutClick() {
    this.authService.logout();
  }

}
