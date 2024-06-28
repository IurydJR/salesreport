import { Component } from '@angular/core';
import { MainNavComponent } from "./components/main-nav/main-nav.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [MainNavComponent]
})
export class AppComponent {
  title = 'salesReport';
}
