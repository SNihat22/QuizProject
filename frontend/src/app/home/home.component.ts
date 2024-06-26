import {Component, inject} from '@angular/core';
import {NgbNav, NgbNavContent, NgbNavItem, NgbNavLinkButton, NgbNavOutlet, NgbToast} from "@ng-bootstrap/ng-bootstrap";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {QuizzesListComponent} from "./quizzes-list/quizzes-list.component";
import {UserService} from "../shared/user.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgbNav,
    NgbNavOutlet,
    NgbNavLinkButton,
    NgbNavContent,
    NgbNavItem,
    QuizzesListComponent,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  userService = inject(UserService);
  logout() {
   this.userService.logout();
  }
}
