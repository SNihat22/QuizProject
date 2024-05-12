import {Component, ElementRef, inject, OnInit, ViewChild, viewChild} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {JsonPipe} from "@angular/common";
import {IQuestion, IQuiz} from "../../../shared/quiz.model";
import JSConfetti from 'js-confetti'
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {QuizService} from "../../../shared/quiz.service";

@Component({
  selector: 'app-quiz-game',
  standalone: true,
  imports: [
    JsonPipe,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './quiz-game.component.html',
  styleUrl: './quiz-game.component.css'
})
export class QuizGameComponent implements OnInit {
  toastrService = inject(ToastrService);
  quizService = inject(QuizService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  quiz?: IQuiz;
  question?: IQuestion;
  questionCount: number = 0;
  jsConfetti = new JSConfetti();

  // formArray = new FormArray<FormControl<string>>([]);
  questionControl = new FormControl<string | null>(null, {
    validators: [ Validators.required ]
  });
  questionForm = new FormGroup({
    quizQuestion: this.questionControl
  })

  correctAnswers = 0;


  ngOnInit() {
    this.quizService.getQuizById(this.route.snapshot.params['id'])
      .subscribe(res => {
        this.quiz = res;
        this.question = this.quiz.questions[this.questionCount];
      });
  }

  onSubmit(): void {
    if (this.quiz) {
      if (this.questionControl.value === this.question?.answer) {
        this.correctAnswers++;
        this.jsConfetti.addConfetti();


      } else {
        this.toastrService.error('Invalid answer');
      }
      this.questionControl.reset();

      this.questionCount++;
      this.question = this.quiz.questions[this.questionCount];



      if ( this.questionCount >= this.quiz.questions.length ) {
        this.quizService.saveQuiz(this.quiz._id, this.correctAnswers)
          .subscribe(res => {
            this.toastrService.success('Scores added');
          });
      }
    }
  }

  goBack() {
    const shouldGoBack = confirm('Are you sure you want to go back? Progress will be lost');
    if (shouldGoBack) {
      this.router.navigate(['../'], { relativeTo: this.route});
    }
  }
}
