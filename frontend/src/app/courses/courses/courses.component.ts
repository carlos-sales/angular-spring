import { Component } from '@angular/core';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent
{
  public  courses : Observable<Course[]>;
  public  displayedColumns    = [ 'name', 'category' ];

  constructor( private coursesService: CoursesService )
  {
    this.courses = this.coursesService.list();
  }

}
