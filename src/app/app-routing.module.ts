import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';


const routes: Routes = [
  {path: "main", component: MainComponent},
  {path: "login", component: LoginComponent},
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
