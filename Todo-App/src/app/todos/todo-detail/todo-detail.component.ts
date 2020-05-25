import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { TodoService } from '../todo.service';
import { Todo } from '../todo.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {
  todo$: Observable<Todo>;
  id: number;

  constructor(private todoService: TodoService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getTaskId();
  }

  getTaskId() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +this.route.snapshot.paramMap.get('id');
          this.todo$ = this.todoService.getTaskWithId(this.id);
        }
    );
  }

  mark() {
    // this.todo$.subscribe(data => {
    //   data.isDone = true;
    // });

    // console.log(this.todo$.subscribe(res => res.isDone = true));
  }

  onEditTask() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteTask() {
    this.todoService.deleteTask(this.id)
      .subscribe(
        res => {
          this.router.navigate(['../'], { relativeTo: this.route });
          this.todoService.loadTasks();
        },
        err => {
          console.log(err);
        }
      );
  }
}
