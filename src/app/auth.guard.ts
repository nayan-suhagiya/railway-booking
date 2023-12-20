import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const loggedInData = sessionStorage.getItem('LoggedInPassenger');
  if (loggedInData) {
    return true;
  } else {
    return false;
  }
};
