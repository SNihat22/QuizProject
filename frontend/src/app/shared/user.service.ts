import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {LeaderBoardResult} from "./leaderboard.model";
import {IUser} from "./user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  router = inject(Router);
  http = inject(HttpClient);
  toastr = inject(ToastrService);
  logout() {
    localStorage.clear();
    this.router.navigate(['auth/login']).then(() => {
      this.toastr.success('User logged out')
    });
  }

  getLeaderBoards() {
    return this.http.get<Array<LeaderBoardResult>>('user/getLeaderboard');
  }

  register(username: string, password: string) {
    const payload: Partial<IUser> = {
      username,
      password
    }
    return this.http.post<{ token: string, user: IUser }>('user/register', payload)
  }

  login(username: string, password: string) {
    const payload: Partial<IUser> = {
      username,
      password
    }
    return this.http.post<{ token: string, user: IUser }>('user/login', payload)
  }
}
