import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { ParamComponent } from './param/param.component';
import { ProfilComponent } from './profil/profil.component';


const routes: Routes = [
  {path: "main", component: MainComponent},
  {path: "login", component: LoginComponent},
  {path: "profil", component: ProfilComponent, canActivate: [AuthGuard],
    children: [
      {path: "param", component: ParamComponent}
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
      anchorScrolling: 'enabled'
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
