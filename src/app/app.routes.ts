import { Routes } from '@angular/router';
import { SalesDashboardComponent } from './components/sales-dashboard/sales-dashboard.component';
import { SalesListComponent } from './components/sales-list/sales-list.component';
import { SalesManegementComponent } from './components/sales-manegement/sales-manegement.component';
import { UserManegementComponent } from './components/user-manegement/user-manegement.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  {path:'', component:SalesDashboardComponent},
  {path:'list', component:SalesListComponent},
  {path:'sale', component:SalesManegementComponent},
  {path:'user', component:UserManegementComponent},
  {path:'login', component:LoginComponent},
];
