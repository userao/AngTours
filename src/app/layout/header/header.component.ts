import { Component, inject, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
@Component({
    selector: "app-header",
    imports: [],
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.scss",
})
export class HeaderComponent implements OnInit{
  userService = inject(UserService);
  userName: string = null;
  ngOnInit(): void {
    this.userName = this.userService.getUser().login;
  }
}
