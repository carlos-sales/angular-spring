package com.carlos.backend.dto.mapper;

import org.springframework.stereotype.Component;

import com.carlos.backend.dto.CourseDTO;
import com.carlos.backend.enums.Category;
import com.carlos.backend.model.Course;

@Component
public class CourseMapper 
{
    public CourseDTO toDTO( Course course )
    {
        if( course == null )
        {
            return null;
        }
        return new CourseDTO( course.getId(), course.getName(), "FRONT-END" );
    }

    public Course toEntity( CourseDTO courseDTO )
    {
        if( courseDTO == null )
        {
            return null;
        }
        Course course = new Course();
        if( courseDTO.id() != null )
        {
            course.setId( courseDTO.id() );
        }
        course.setName( courseDTO.name() );
        course.setCategory( Category.FRONT_END );

        return course;
    }
}
