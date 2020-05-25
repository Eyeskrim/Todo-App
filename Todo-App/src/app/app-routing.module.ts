import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TodosComponent } from './todos/todos.component';
import { TodoDetailComponent } from './todos/todo-detail/todo-detail.component';
import { TagsComponent } from './tags/tags.component';
import { TodoStartComponent } from './todos/todo-start/todo-start.component';
import { TodoEditComponent } from './todos/todo-edit/todo-edit.component';

const appRoutes: Route[] = [
    { path: '', redirectTo: '/todos', pathMatch: 'full'},
    { path: 'todos', component: TodosComponent, children: [
        { path: '', component: TodoStartComponent },
        { path: 'new', component: TodoEditComponent },
        { path: ':id', component: TodoDetailComponent },
        { path: ':id/edit', component: TodoEditComponent },
    ] },
    { path: 'tags', component: TagsComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
