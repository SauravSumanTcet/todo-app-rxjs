import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { tap } from 'rxjs';
import { ToDo } from 'src/app/model/todo.model';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  @Input() todo!: ToDo;

  @Output() todoAction = new EventEmitter();
  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
  }

  delete(id: number | undefined) {
    this.todoService.deleteTodo(id).pipe(
      tap(() => {
        this.todoAction.emit('[todo] deleted');
      })
    ).subscribe();
  }

}
