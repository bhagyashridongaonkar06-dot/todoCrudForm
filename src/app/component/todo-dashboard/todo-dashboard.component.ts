import { Component, OnInit } from '@angular/core';
import { todosArr } from 'src/app/const/todosArr';
import { ItodosArr } from 'src/app/model/interfaces';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-todo-dashboard',
  templateUrl: './todo-dashboard.component.html',
  styleUrls: ['./todo-dashboard.component.scss']
})
export class TodoDashboardComponent implements OnInit {

  todoArr : ItodosArr[] = todosArr

  constructor(private _snackbar : SnackbarService) { }

  ngOnInit(): void {
  }

  sendNewTodo(todo : ItodosArr){
    this.todoArr.unshift(todo)
  }

  sendEditObj !: ItodosArr
  onEdit(todo:ItodosArr){
    this.sendEditObj = todo
  } 

  onUpdate(todo :ItodosArr){
    let updIdx = todosArr.findIndex(e => e.todoId === todo.todoId)
    todosArr[updIdx] = todo
  }

  onDelete(todo : string){
    let removeIdx = todosArr.findIndex(e => e.todoId === todo)
    todosArr.splice(removeIdx, 1)
    this._snackbar.successMSg(`Todo with id ${todo} removed successfully`)
  }

}
