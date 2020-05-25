import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  readonly apiUrl = 'https://localhost:5001/api/todos/';
  todos: Observable<Todo[]>;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  addTask(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  updateTask(id: number, todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(this.apiUrl + id, JSON.stringify(todo), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  deleteTask(id: number) {
    return this.http.delete<Todo>(this.apiUrl + id)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  getTaskWithId(id: number): Observable<Todo> {
    return this.http.get<Todo>(this.apiUrl + id)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  loadTasks() {
    this.todos = this.getTasks();
  }

  // getTaskWithIdFromTheList(id: number) {
  //   const task = this.todos.find(
  //     (s) => {
  //       return s.id === id;
  //     }
  //   );

  //   return task;
  // }

  // getTaskIndex(id: number) {
  //   const index = this.todos.findIndex(
  //     (s) => {
  //       return s.id === id;
  //     }
  //   );

  //   return index;
  // }

  // generateId() {
  //   return this.todos.length > 0 ? Math.max(...this.todos.map(todo => todo.id)) + 1 : 1;
  // }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);

    return throwError(errorMessage);
  }
}
