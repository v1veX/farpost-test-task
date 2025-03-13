import { Component } from '@angular/core';
import { AuthComponent } from './auth/auth.component';
import { ThemeTogglerComponent } from './theme-toggler/theme-toggler.component';

@Component({
  imports: [AuthComponent, ThemeTogglerComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'auth-form';
}
