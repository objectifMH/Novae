import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { ProfilComponent } from './profil/profil.component';


const routes: Routes = [
  {path: "main", component: MainComponent},
  {path: "login", component: LoginComponent},
  //{path: "profil", component: ProfilComponent},
  {path: "profil", component: ProfilComponent, canActivate: [AuthGuard]},
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
