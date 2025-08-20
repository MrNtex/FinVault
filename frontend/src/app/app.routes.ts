import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { NotFoundPage } from './features/not-found/not-found-page/not-found-page.component';
import { AssetsComponent } from './features/assets/assets.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'transactions',
    loadChildren: () => import('./features/transactions/transactions.routes').then(m => m.TRANSACTIONS_ROUTES)
  },
  {
    path: 'accounts',
    loadChildren: () => import('./features/accounts/accounts.module').then(m => m.AccountsModule)
  },
  {
    path: 'assets',
    component: AssetsComponent
  },
  {
    path: '**',
    component: NotFoundPage
  }
];

