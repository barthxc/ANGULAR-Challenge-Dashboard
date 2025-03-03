/* ANGULAR IMPORTS */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

/* ANGULAR MATERIAL IMPORTS */
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

/* SERVICES */
import { DialogService } from './services/dialog.service';

/* OWN COMPONENTS */
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';

import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { PostsPageComponent } from './pages/posts-page/posts-page.component';
import { CommentsPageComponent } from './pages/comments-page/comments-page.component';
import { ElementByIdPageComponent } from './pages/element-by-id-page/element-by-id-page.component';

import { CardComponent } from './components/card/card.component';
import { LoadingComponent } from './components/loading/loading.component';
import { TableComponent } from './components/table/table.component';
import { ToastComponent } from './components/toast/toast.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { GenericFormComponent } from './components/generic-form/generic-form.component';
import { ToastService } from './services/toast.service';
import { PostFormComponent } from './components/post-form/post-form.component';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { NewElementPageComponent } from './pages/new-element-page/new-element-page.component';
import { ChartComponent } from './components/chart/chart.component';
import { MatTabsModule } from '@angular/material/tabs';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { UserSearchComponent } from './components/user-search/user-search.component';

@NgModule({
  declarations: [
    DashboardLayoutComponent,
    HomePageComponent,
    UsersPageComponent,
    PostsPageComponent,
    CommentsPageComponent,
    ElementByIdPageComponent,
    CardComponent,
    LoadingComponent,
    TableComponent,
    ToastComponent,
    DialogComponent,
    GenericFormComponent,
    PostFormComponent,
    CommentFormComponent,
    UserFormComponent,
    NewElementPageComponent,
    ChartComponent,
    UserSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    SharedModule,

    /* ANGULAR MATERIAL IMPORTS */
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    NgxChartsModule,
    MatTabsModule,
    MatAutocompleteModule,
  ],
  providers: [DialogService, ToastService],
})
export class DashboardModule {}
