import { FormsModule, NgForm } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LinksComponent } from './components/links/links.component';
import { HeroComponent } from './components/hero/hero.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { HeaderComponent } from './components/header/header.component';
import { ServicesComponent } from './components/services/services.component';
import { ContactComponent } from './components/contact/contact.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { WorksService } from './work.service';
import { DashboardSidebarComponent} from './components/dashboard-sidebar/dashboard-sidebar.component';
import { PortfolioDashboardComponent } from './components/portfolio-dashboard/portfolio-dashboard.component';
import { HomeDashboardComponent } from './components/home-dashboard/home-dashboard.component';
import { AboutDashboardComponent } from './components/about-dashboard/about-dashboard.component';
import { ServicesDashboardComponent } from './components/services-dashboard/services-dashboard.component';
import { ContactDashboardComponent } from './components/contact-dashboard/contact-dashboard.component';
import { ServiceService } from './service.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LinksComponent,
    HeroComponent,
    HomeComponent,
    AboutComponent,
    HeaderComponent,
    ServicesComponent,
    ContactComponent,
    TestimonialsComponent,
    FooterComponent,
    DashboardComponent,
    AdminComponent,
    PortfolioComponent,
    DashboardSidebarComponent,
    PortfolioDashboardComponent,
    HomeDashboardComponent,
    AboutDashboardComponent,
    ServicesDashboardComponent,
    ContactDashboardComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [WorksService, ServiceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
