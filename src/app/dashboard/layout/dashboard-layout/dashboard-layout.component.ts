import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css'],
})
export class DashboardLayoutComponent {
  sidebarVisible = true; // Sidebar siempre visible
  isExpanded = false; // Estado inicial colapsado

  menuItems = [
    { label: 'Inicio', icon: 'pi pi-home', route: '/home' },
    { label: 'Usuarios', icon: 'pi pi-users', route: '/users' },
    { label: 'Configuración', icon: 'pi pi-cog', route: '/settings' },
  ];

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }
}
