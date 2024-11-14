import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const isAdmin = localStorage.getItem('isAdmin');
  const router = inject(Router);

  if (isAdmin === 'true') {
    return true;
  } else {
    alert('Admin can only access')
    return router.createUrlTree(['/home']);
  }
};
