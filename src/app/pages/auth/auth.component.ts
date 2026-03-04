import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { AuthorizationComponent } from './authorization/authorization.component';
import { RegistrationComponent } from './registration/registration.component';

@Component({
  selector: 'app-auth',
  imports: [AuthorizationComponent, RegistrationComponent, MatTabsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

}
