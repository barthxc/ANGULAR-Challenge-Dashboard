import { UsersService } from './../../services/users.service';
import { LocalDataService } from './../../services/local-data.service';
import { Component, effect, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { UserResponse } from '../../interfaces/interfaces';
import { ActivatedRoute, Router } from '@angular/router';

interface MenuItem {
  label: string;
  icon: string;
  router: string;
}

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css'],
})
export class DashboardLayoutComponent implements OnInit {
  isLoading$ = this.loadingService.isLoadingSignal();

  constructor(
    private observer: BreakpointObserver,
    private loadingService: LoadingService,
    private localDataService: LocalDataService,
    private usersService: UsersService,
    private route: Router,
    private router: ActivatedRoute,
  ) {
    effect(() => {
      this.users = this.usersService.usersSignal();
    });
  }

  menuItems: MenuItem[] = [
    { label: 'Inicio', icon: 'house', router: 'dashboard' },
    { label: 'Usuarios', icon: 'recent_actors', router: 'users' },
    { label: 'Posts', icon: 'my_library_books', router: 'posts' },
    { label: 'Comentarios', icon: 'comment', router: 'comments' },
  ];

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile: boolean = true;

  isCollapsed: boolean = true;
  users!: UserResponse[];

  ngOnInit(): void {
    this.observer.observe(['(max-width:800px)']).subscribe((screenSize) => {
      if (screenSize.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });

    this.localDataService.fillSignals();
  }

  toggleMenu(): void {
    if (this.isMobile) {
      this.sidenav.toggle();
      this.isCollapsed = false;
    } else {
      this.sidenav.open();
      this.isCollapsed = !this.isCollapsed;
    }
  }

  goToFn = (route: []) => {
    this.route.navigate(route, { relativeTo: this.router.parent });
  };
}
