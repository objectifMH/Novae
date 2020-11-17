import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
      useHash: true,
      onSameUrlNavigation: 'reload',
      anchorScrolling: 'enabled'
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
