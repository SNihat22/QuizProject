import {HttpClient} from "@angular/common/http";
import {Injectable, inject} from "@angular/core";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {IQuiz} from "./quiz.model";

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  router = inject(Router);
  http = inject(HttpClient);
  toastr = inject(ToastrService);

  logout() {
    localStorage.clear();
    this.router.navigate(['auth/login']).then(() => {
      this.toastr.success('User logged out')
    });
  }

  getQuizzes() {
    return this.http.get<IQuiz[]>('/quizzes');
  }

  getQuizById(id: string) {
    return this.http.get<IQuiz>(`quizzes/${id}`);

  }

  saveQuiz(quizId: string, correctAnswers: number) {
    const payload = {
      points: correctAnswers,
      quiz: quizId
    }
    return this.http.post<void>('user/addScore', payload);
  }

  deleteQuizByid(id: string) {
    return this.http.delete<IQuiz[]>(`quizzes/${id}`);
  }

  updateQuizById(id: string, payload: Partial<IQuiz>) {
    return this.http.put(`quizzes/${id}`, payload);
  }

  createQuiz(payload: Partial<IQuiz>) {
    return this.http.post('quizzes/create', payload);

  }
}
