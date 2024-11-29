import { ServicesDashboardComponent } from './components/services-dashboard/services-dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'contact', component: ContactComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
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
    ],
  },

  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
