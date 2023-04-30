import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { CoursesService } from '../../services/courses.service';
import { Course } from '../../model/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit
{
  form: FormGroup

  constructor(  private formBuilder: NonNullableFormBuilder,
                private service    : CoursesService,
                private location   : Location,
                private route      : ActivatedRoute,
                private _snackBar  : MatSnackBar )
  {
    this.form = this.formBuilder.group({
      _id     : [ '' ],
      name    : [ '' ],
      category: [ '' ]
    });
  }

  ngOnInit(): void
  {
    const course: Course =  this.route.snapshot.data[ 'course' ];
    this.form.setValue({
      _id     : course._id,
      name    : course.name,
      category: course.category
    });
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
