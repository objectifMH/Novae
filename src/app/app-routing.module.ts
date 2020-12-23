import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashMainComponent } from './dash-main/dash-main.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { ParamComponent } from './param/param.component';
import { ProfilComponent } from './profil/profil.component';
import { TachesComponent } from './taches/taches.component';


const routes: Routes = [
  {path: "main", component: MainComponent},
  {path: "login", component: LoginComponent},
  {path: "profil", component: ProfilComponent, canActivate: [AuthGuard],
    children: [
      {path: "param", component: ParamComponent},
      {path: "main", component: DashMainComponent},
      {path: "taches", component: TachesComponent},

    ]},
  // {path: "profil", component: ProfilComponent,
  //   children: [
  //     {path: "param", component: ParamComponent}
  //   ]},
  {path: '**', redirectTo: '/main' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
      useHash: true,
      onSameUrlNavigation: 'reload',
      relativeLinkResolution: 'legacy',
      anchorScrolling: 'enabled',
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
