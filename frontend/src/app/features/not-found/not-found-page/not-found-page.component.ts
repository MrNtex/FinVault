import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule],
  template: `
    <div class="not-found-container">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <button mat-raised-button color="primary" routerLink="/">Go to Home</button>
    </div>
  `,
  styles: [`
    .not-found-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      text-align: center;
      padding: 20px;
    }
    h1 {
      font-size: 72px;
      margin: 0;
      color: #f44336;
    }
    h2 {
      font-size: 24px;
      margin: 16px 0;
    }
    p {
      margin-bottom: 24px;
      color: #666;
    }
  `]
})
export class NotFoundPage {}
