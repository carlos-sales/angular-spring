import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, UntypedFormArray, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { CoursesService } from '../../services/courses.service';
import { Course } from '../../model/course';
import { Lesson } from '../../model/lesson';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit
{
  form!: FormGroup;

  constructor(  private formBuilder: NonNullableFormBuilder,
                private service    : CoursesService,
                private location   : Location,
                private route      : ActivatedRoute,
                private _snackBar  : MatSnackBar )
  {

  }

  ngOnInit(): void
  {
    const course: Course =  this.route.snapshot.data[ 'course' ];
    this.form = this.formBuilder.group({
      _id     : [ course._id ],
      name    : [ course.name, [ Validators.required, Validators.minLength(5), Validators.maxLength(100) ] ],
      category: [ course.category, [ Validators.required ] ],
      lessons : this.formBuilder.array( this.retrieveLessons( course ) )
    });
  }

  private retrieveLessons( course: Course )
  {
    const lessons = [];

    if( course?.lessons )
    {
      course.lessons.forEach( lesson => lessons.push( this.createLesson( lesson ) ) )
    }
    else
    {
      lessons.push( this.createLesson() );
    }

    return lessons;
  }

  private createLesson( lesson: Lesson = { id: '', name: '', youtubeUrl: '' } )
  {
    return this.formBuilder.group({
      id        : [ lesson.id ],
      name      : [ lesson.name ],
      youtubeUrl: [ lesson.youtubeUrl ]
    })
  }

  getLessonsFormArray()
  {
    return ( <UntypedFormArray>this.form.get( 'lessons' ) ).controls;
  }

  onSubmit()
  {
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

  getErrorMessage( fieldName: string )
  {
    const field = this.form.get( fieldName );

    if( field?.hasError( 'required' ) )
    {
      return 'Campo obrigatório';
    }
    if( field?.hasError( 'minlength' ) )
    {
      const requiredLength = field.errors ? field.errors[ 'minlength' ][ 'requiredLength' ] : 5;
      return `Tamanho mínimo precisa ser de ${ requiredLength } caracteres.`;
    }
    if( field?.hasError( 'maxlength' ) )
    {
      const requiredLength = field.errors ? field.errors[ 'maxlength' ][ 'requiredLength' ] : 200;
      return `Tamanho máximo de ${ requiredLength } caracteres excedido.`;
    }

    return 'Campo inválido';
  }

}
