import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ItodosArr } from 'src/app/model/interfaces';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  constructor(private _snackbar : SnackbarService) { }

  @Output() emitEditTodo : EventEmitter<ItodosArr> = new EventEmitter<ItodosArr>()
  @Output() emitRemoveTodo : EventEmitter<string> = new EventEmitter<string>()

  ngOnInit(): void {
  }

  @Input() todosArr !: ItodosArr[]

  editTodo(todo : ItodosArr){
    this.emitEditTodo.emit(todo)

  }

  removeTodo(todo : string){
    let getConfirm = confirm('Are you sure you want to remove todo')

    if(getConfirm){
      this.emitRemoveTodo.emit(todo)
    }
  }

  onCheckChange(todo : ItodosArr){
    todo.isCompleted = !todo.isCompleted
    this._snackbar.successMSg(`Todo with status ${todo.isCompleted} updated successfully`)

  }

}
