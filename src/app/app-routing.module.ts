import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './AuthGuard/auth.guard';
import { DocumentComponent } from './document/document.component';
import { DrawbackComponent } from './drawback/drawback.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PackageDelailsComponent } from './package-details/package-details.component';
import { PackageItemsComponent } from './package-items/package-items.component';

const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, },
  { path: 'home', component: HomeComponent,canActivate:[AuthGuard], children:[
    { path: 'document', component: DocumentComponent},
    { path: 'packageitem', component: PackageItemsComponent  },
    { path: 'packageDetail', component: PackageDelailsComponent  },
    { path: 'drawback', component: DrawbackComponent }
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
