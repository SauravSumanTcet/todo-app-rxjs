import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ToDo } from 'src/app/model/todo.model';
import { TodoService } from 'src/app/service/todo.service';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todoArr!: Observable<ToDo[]>
  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoArr = this.todoService.getTodo();

    this.todoService.todoAction$.pipe(tap(data => {
      if (data === '[todo] added')
        this.todoArr = this.todoService.getTodo();
    })).subscribe();

  }

  todoAction(event: any) {
    if (event === `[todo] deleted`)
      this.todoArr = this.todoService.getTodo();
  }

}
