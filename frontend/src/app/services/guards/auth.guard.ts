import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('accessToken'); // Get token from localStorage
  const router = inject(Router); // Inject Router service

  if (token) { 
    return true;
  } else {
    alert('Login please');
    // return router.navigateByUrl('/login');
    return router.createUrlTree(['/login']);
  }
};
