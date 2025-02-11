import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './AuthGuard/auth.guard';
import { DocumentComponent } from './document/document.component';
import { DrawbackComponent } from './drawback/drawback.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NewSpaceManagerComponent } from './new-space-manager/new-space-manager.component';
import { NewSpaceOperatorComponent } from './new-space-operator/new-space-operator.component';
import { PackageDelailsComponent } from './package-details/package-details.component';
import { PackageItemsComponent } from './package-items/package-items.component';
import { DestroyBoxComponent } from './DestroyBox/DestroyBox.component';
import { PkgWithoutFileComponent } from './PkgWithoutFile/pkg-without-file/pkg-without-file.component';

// const routes: Routes = [
//   { path: '',   redirectTo: '/home', pathMatch: 'full' },
//   { path: 'login', component: LoginComponent, },
//   { path: 'home', component: HomeComponent,canActivate:[AuthGuard], children:[
//     { path: 'document', component: DocumentComponent},
//     { path: 'packageitem', component: PackageItemsComponent  },
//     { path: 'packageDetail', component: PackageDelailsComponent  },
//     { path: 'drawback', component: DrawbackComponent },
//     { path: 'newspacemanager', component: NewSpaceManagerComponent },
//     { path: 'newspaceoperator', component: NewSpaceOperatorComponent },
//     { path: 'distroybox', component: DistroyBoxComponent}
//   ]},
// ];
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'document', component: DocumentComponent },
      { path: 'packageitem', component: PackageItemsComponent },
      { path: 'packageDetail', component: PackageDelailsComponent },
      { path: 'drawback', component: DrawbackComponent },
      { path: 'newspacemanager', component: NewSpaceManagerComponent },
      { path: 'newspaceoperator', component: NewSpaceOperatorComponent },
      { path: 'DesrtoyBox', component:DestroyBoxComponent},
      { path: 'PkgWithoutFile', component: PkgWithoutFileComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
