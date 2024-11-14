import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private router = inject(Router);

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token')
  }

  logout() {
    console.log('user logout');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('user');
    this.router.navigateByUrl('/login');
  }

}
