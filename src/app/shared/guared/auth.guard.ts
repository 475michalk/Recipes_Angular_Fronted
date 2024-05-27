import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserServiceService } from '../Service/Users/user-service.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserServiceService);
  return userService.token ? true : false;
};
