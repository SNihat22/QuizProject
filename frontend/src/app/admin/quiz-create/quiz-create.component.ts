import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {JsonPipe, NgIf} from "@angular/common";
import {UserService} from "../../shared/user.service";

@Component({
  selector: 'app-quiz-create',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    JsonPipe,
    NgIf,
    RouterLink
  ],
  templateUrl: './quiz-create.component.html',
  styleUrl: './quiz-create.component.css'
})
export class QuizCreateComponent {


  userService = inject(UserService);

  logout() {
    this.userService.logout();
  }
}
