import {Component, inject, OnInit} from '@angular/core';
import {IQuiz} from "../../shared/quiz.model";
import {RouterLink} from "@angular/router";
import {QuizService} from "../../shared/quiz.service";

@Component({
  selector: 'app-quizzes-list',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './quizzes-list.component.html',
  styleUrl: './quizzes-list.component.css'
})
export class QuizzesListComponent implements OnInit {

  quizService = inject(QuizService);
  quizzes: IQuiz[] = [];


  ngOnInit() {
    this.quizService.getQuizzes()
      .subscribe(res => {
        this.quizzes = res;
      });
  }

}
