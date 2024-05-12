import {Component, inject, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {LeaderBoardResult} from "../../shared/leaderboard.model";
import {UserService} from "../../shared/user.service";


@Component({
  selector: 'app-leaderboards',
  standalone: true,
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './leaderboards.component.html',
  styleUrl: './leaderboards.component.css'
})
export class LeaderboardsComponent implements OnInit {

  userService = inject(UserService);
  leaderBoardResults: Array<LeaderBoardResult> = [];

  ngOnInit() {
    this.userService.getLeaderBoards()
      .subscribe(res => {
        console.log(res);
        this.leaderBoardResults = res;
      })
  }

  protected readonly isNaN = isNaN;
}
