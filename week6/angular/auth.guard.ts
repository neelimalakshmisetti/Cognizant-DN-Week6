import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

// Angular HOL - Exercise 6: Route Guards
// Protect routes that require authentication.

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('auth_token');

  if (token) return true;

  // Redirect to login, preserving the intended URL
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};

// Role-based guard
export const roleGuard = (requiredRole: string): CanActivateFn => {
  return (route, state) => {
    const router = inject(Router);
    const userRole = localStorage.getItem('user_role');

    if (userRole === requiredRole || userRole === 'admin') return true;

    router.navigate(['/unauthorized']);
    return false;
  };
};
