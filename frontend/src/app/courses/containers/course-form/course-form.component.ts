import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, UntypedFormArray, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { CoursesService } from '../../services/courses.service';
import { Course } from '../../model/course';
import { Lesson } from '../../model/lesson';
import { FormUtilsService } from 'src/app/shared/form/form-utils.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit
{
  form!: FormGroup;

  constructor(  private formBuilder: NonNullableFormBuilder,
                private service: CoursesService,
                private location: Location,
                private route: ActivatedRoute,
                private _snackBar: MatSnackBar,
                public formUtils: FormUtilsService )
  {

  }

  ngOnInit(): void
  {
    const course: Course =  this.route.snapshot.data[ 'course' ];
    this.form = this.formBuilder.group({
      _id: [ course._id ],
      name: [ course.name, [ Validators.required, Validators.minLength(5), Validators.maxLength(100) ] ],
      category: [ course.category, [ Validators.required ] ],
      lessons: this.formBuilder.array( this.retrieveLessons( course ), Validators.required )
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
      id: [ lesson.id ],
      name: [ lesson.name, [ Validators.required, Validators.minLength(5), Validators.maxLength(100) ] ],
      youtubeUrl: [ lesson.youtubeUrl, [ Validators.required, Validators.minLength(10), Validators.maxLength(11) ] ]
    })
  }

  getLessonsFormArray()
  {
    return ( <UntypedFormArray>this.form.get( 'lessons' ) ).controls;
  }

  addNewLesson()
  {
    const lessons = this.form.get( 'lessons' ) as UntypedFormArray;
    lessons.push(this.createLesson())
  }

  removeLesson( index: number )
  {
    const lessons = this.form.get( 'lessons' ) as UntypedFormArray;
    lessons.removeAt( index );
  }

  onSubmit()
  {
    if( this.form.valid )
    {
      this.service.save( this.form.value )
        .subscribe(
          result  => this.onSuccess(),
          error   => this.onError(),
        );
    }
    else
    {
      this.formUtils.validateAllFormFields(this.form);
    }
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
