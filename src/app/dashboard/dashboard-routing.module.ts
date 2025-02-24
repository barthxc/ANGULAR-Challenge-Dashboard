import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Components
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { PostsPageComponent } from './pages/posts-page/posts-page.component';
import { CommentsPageComponent } from './pages/comments-page/comments-page.component';
import { ElementByIdPageComponent } from './pages/element-by-id-page/element-by-id-page.component';

//Crear u nhijo de user, para las demás rutas
const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'users', component: UsersPageComponent },
      { path: 'user', component: ElementByIdPageComponent },
      { path: 'user/:id', component: ElementByIdPageComponent },
      { path: 'posts', component: PostsPageComponent },
      { path: 'post', component: ElementByIdPageComponent },
      { path: 'post/:id', component: ElementByIdPageComponent },
      { path: 'comments', component: CommentsPageComponent },
      { path: 'comment', component: CommentsPageComponent },
      { path: 'comment/:id', component: ElementByIdPageComponent },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
