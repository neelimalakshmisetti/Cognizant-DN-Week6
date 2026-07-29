import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

// Angular HOL - Exercise 1: Root Component
// The AppComponent is the entry point for every Angular application.

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header class="navbar">
      <h1>{{ title }}</h1>
      <nav>
        <a routerLink="/home"      routerLinkActive="active">Home</a>
        <a routerLink="/employees" routerLinkActive="active">Employees</a>
        <a routerLink="/about"     routerLinkActive="active">About</a>
      </nav>
    </header>

    <main class="content">
      <router-outlet />
    </main>

    <footer>
      <p>{{ title }} &copy; {{ currentYear }}</p>
    </footer>
  `,
  styles: [`
    .navbar { display: flex; justify-content: space-between; align-items: center;
              padding: 1rem 2rem; background: #1a1a2e; color: white; }
    nav a { color: white; text-decoration: none; margin: 0 1rem; }
    nav a.active { font-weight: bold; border-bottom: 2px solid #e94560; }
    .content { padding: 2rem; min-height: 80vh; }
    footer { text-align: center; padding: 1rem; background: #f5f5f5; }
  `]
})
export class AppComponent {
  title = 'Employee Management Portal';
  currentYear = new Date().getFullYear();
}
