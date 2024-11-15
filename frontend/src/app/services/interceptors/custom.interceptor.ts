import { HttpInterceptorFn } from '@angular/common/http';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('accessToken');
  if(token) {
    req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token)});
  } 
  return next(req);
};
