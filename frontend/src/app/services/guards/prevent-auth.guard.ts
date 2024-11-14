import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const preventAuthGuard: CanActivateFn = (route, state) => {

  const token = localStorage.getItem('accessToken');
  const router = inject(Router);

  if (token) {
    return router.navigateByUrl('/home'); // or whatever your home route is
  }
  return true;
};
