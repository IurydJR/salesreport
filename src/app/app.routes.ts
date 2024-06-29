import { Routes } from '@angular/router';
import { SalesDashboardComponent } from './components/sales-dashboard/sales-dashboard.component';
import { SalesListComponent } from './components/sales-list/sales-list.component';

export const routes: Routes = [
  {path:'', component:SalesDashboardComponent},
  {path:'list', component:SalesListComponent}
];
