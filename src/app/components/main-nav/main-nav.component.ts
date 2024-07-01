import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router, RouterOutlet } from '@angular/router';
import { User } from '../../interfaces/User';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrl: './main-nav.component.scss',
  standalone: true,
  imports: [
    NgIf,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterOutlet
  ]
  
})

export class MainNavComponent {
  private breakpointObserver = inject(BreakpointObserver);
  private user!: User;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    constructor(private router: Router) {};

    showUser(): { user: User | null, letter: string } {
      const userJson = localStorage.getItem('currentUser'); 
  
      if (userJson) {
        this.user = JSON.parse(userJson); 
        const letter = this.user.name.charAt(0); 
        return { user: this.user, letter }; 
      } else {
        return { user: null, letter: '' }; 
      }
    }

    goToLogin(): void {
      if(!localStorage.getItem('currentUser')) {
        this.router.navigate(['/login']);
      }
    }

}
