import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  // selectedTask: Todo;

  constructor(private router: Router, private route: ActivatedRoute, private todoService: TodoService) { }

  ngOnInit() {
    // this.todoService.taskSelected
    //   .subscribe(
    //     (todo: Todo) => {
    //       this.selectedTask = todo;
    //     }
    // );
  }

  onAddNew() {
    this.router.navigate(['new'], {relativeTo: this.route });
  }
}
