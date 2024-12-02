import { ServicesDashboardComponent } from './components/services-dashboard/services-dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';
import { ContactComponent } from './components/contact/contact.component';
import { AdminComponent } from './components/admin/admin.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { PortfolioDashboardComponent } from './components/portfolio-dashboard/portfolio-dashboard.component';
import { HomeDashboardComponent } from './components/home-dashboard/home-dashboard.component';
import { AboutDashboardComponent } from './components/about-dashboard/about-dashboard.component';
import { ContactDashboardComponent } from './components/contact-dashboard/contact-dashboard.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'contact', component: ContactComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home-dashboard', pathMatch: 'full' },
      {
        path: 'home-dashboard',
        component: HomeDashboardComponent,
      },
      {
        path: 'about-dashboard',
        component: AboutDashboardComponent,
      },
      {
        path: 'services-dashboard',
        component: ServicesDashboardComponent,
      },
      {
        path: 'portfolio-dashboard',
        component: PortfolioDashboardComponent,
      },
      {
        path: 'contact-dashboard',
        component: ContactDashboardComponent,
      },
      { path: '**', component: HomeDashboardComponent },
    ],
  },

  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
