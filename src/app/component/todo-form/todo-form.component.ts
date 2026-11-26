import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Console } from 'node:console';
import { ItodosArr } from 'src/app/model/interfaces';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { UuidService } from 'src/app/service/uuid.service';
// import { ItodosArr } from 'src/app/model/interfaces';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit, OnChanges{

  isInEditMode : boolean = false

  @Input() getEditObj !: ItodosArr

  @ViewChild('todoForm') todoFormRef!: NgForm

  @Output() emitNewTodo : EventEmitter<ItodosArr> = new EventEmitter<ItodosArr>()
  @Output() emitUpdateObj : EventEmitter<ItodosArr>  = new EventEmitter<ItodosArr>()


  constructor(private _uuid : UuidService,
    private _snackbar : SnackbarService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    let editObj = changes['getEditObj'].currentValue
    // console.log(editObj)
    if(editObj){
      this.todoFormRef.form.patchValue(editObj)
      this.isInEditMode = true
    }
  }

  onAddTodo(){
    if(this.todoFormRef.invalid){
      this.todoFormRef.form.markAllAsTouched()
    }else{
      let newTodo = this.todoFormRef.form.value
      newTodo.todoId = this._uuid.getUuid()
      console.log(newTodo)
    this.emitNewTodo.emit(newTodo)
    this.todoFormRef.reset()
    this._snackbar.successMSg(`New Todo with name ${newTodo.todoName} created successfully`)
    }
  }

  onUpdateTodo(){
    let updateId = this.getEditObj.todoId
    let updateObj = {...this.todoFormRef.form.value, todoId : updateId}
    console.log(updateObj)
    this.emitUpdateObj.emit(updateObj)
    this.todoFormRef.reset()
    this.isInEditMode = false
    this._snackbar.successMSg(`Todo with name ${updateObj.todoName} Updated successfully`)

  }

}
