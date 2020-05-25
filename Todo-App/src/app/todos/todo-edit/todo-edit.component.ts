import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TodoService } from '../todo.service';
import { Todo } from '../todo.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent implements OnInit {
  id: number;
  editMode = false;
  todoForm: FormGroup;
  existingTodo: Todo;

  constructor(private router: Router, private route: ActivatedRoute, private todoService: TodoService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params.id;
          this.editMode = params.id != null;
          this.initForm();
        }
      );
  }

  private initForm() {
    const taskName = '';
    const taskDesc = '';

    this.todoForm = new FormGroup({
      name: new FormControl(taskName, Validators.required),
      description: new FormControl(taskDesc, Validators.required)
    });

    if (this.editMode) {
      this.todoService.getTaskWithId(this.id)
        .subscribe(data => (
          this.existingTodo = data,
          this.todoForm.controls['name'].setValue(data.taskName),
          this.todoForm.controls['description'].setValue(data.description)
        ));
    }
  }

  onSubmit() {
    if (this.editMode) {
      const updatedTask = new Todo (this.id, this.todoForm.value.name, this.todoForm.value.description, false);

      this.todoService.updateTask(this.id, updatedTask)
        .subscribe((data) => {
          this.router.navigate([this.router.url]);
          this.todoService.loadTasks();
        });
    } else {
      const newTask = new Todo (0, this.todoForm.value.name, this.todoForm.value.description, false);

      this.todoService.addTask(newTask)
        .subscribe((data) => {
          this.todoForm.reset();
          this.router.navigate(['/todos', data.id]);
          this.todoService.loadTasks();
      });
    }

    this.router.navigate(['../'], {relativeTo: this.route} );
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
