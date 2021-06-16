import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { HomeComponent } from './components/home/home.component';
import { ngxUiLoaderConfig } from './config/LoaderConfig';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: HomeComponent, children: [{
    path: '',
      loadChildren: () => import('./components/home/home.module').then(home => home.HomeModule)
    }]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule.forRoot({ showForeground: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
