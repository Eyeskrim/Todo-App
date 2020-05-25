import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TodosComponent } from './todos/todos.component';
import { TodoDetailComponent } from './todos/todo-detail/todo-detail.component';
import { TodoListComponent } from './todos/todo-list/todo-list.component';
import { TodoItemComponent } from './todos/todo-list/todo-item/todo-item.component';
import { AppRoutingModule } from './app-routing.module';
import { TagsComponent } from './tags/tags.component';
import { TodoStartComponent } from './todos/todo-start/todo-start.component';
import { TodoEditComponent } from './todos/todo-edit/todo-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    TodosComponent,
    TodoDetailComponent,
    TodoListComponent,
    TodoItemComponent,
    TagsComponent,
    TodoStartComponent,
    TodoEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
