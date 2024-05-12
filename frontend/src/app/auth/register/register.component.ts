import {Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {HttpErrorResponse, HttpStatusCode} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {IUser} from "../../shared/user.model";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {UserService} from "../../shared/user.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  userService = inject(UserService);
  toastr = inject(ToastrService);
  router = inject(Router);

  username: string = '';
  password: string = '';


  onSignIn(): void {
    this.userService.register(this.username, this.password)
      .subscribe({
        next: () => {
          this.toastr.success('Registration successful!');
          this.router.navigate(['/auth/login']);
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === HttpStatusCode.NotFound) {
            this.toastr.error(err.error.message);
          }
        }
      });
  }
}
