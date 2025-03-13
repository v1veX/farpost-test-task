import { Component } from '@angular/core';
import { AuthComponent } from './auth/auth.component';

@Component({
  imports: [AuthComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'auth-form';
}
