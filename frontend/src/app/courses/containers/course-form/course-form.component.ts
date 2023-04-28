import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit
{
  form: FormGroup

  constructor(  private formBuilder: FormBuilder,
                private service    : CoursesService,
                private location   : Location,
                private _snackBar  : MatSnackBar )
  {
    this.form = this.formBuilder.group({
      name    : [ null ],
      category: [ null ]
    });
  }

  ngOnInit(): void
  {

  }

  onSubmit()
  {
    // console.log( this.form.value );
    this.service.save( this.form.value )
      .subscribe(
        result  => this.onSuccess(),
        error   => this.onError(),
      );
  }

  onCancel()
  {
    this.location.back();
  }

  private onSuccess()
  {
    this._snackBar.open( "Curso salvo com sucesso!", '', { duration: 5000 } );
    this.onCancel();
  }

  private onError()
  {
    this._snackBar.open( "Erro ao salvar curso!", '', { duration: 5000 } );
  }

}