package com.carlos.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.carlos.backend.model.Course;
import com.carlos.backend.repository.CourseRepository;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/courses")
@AllArgsConstructor
public class CourseController 
{
    private final CourseRepository courseRepository;

    @GetMapping
    public List<Course> list()
    {
        return courseRepository.findAll();
    }

    // @RequestMapping( method = RequestMethod.POST )
    @PostMapping
    public ResponseEntity<Course> create( @RequestBody Course record )
    {
        // System.out.println( record.getName() );
        // return courseRepository.save( record );
        return ResponseEntity
            .status( HttpStatus.CREATED )
            .body( courseRepository.save( record ) );
    }
}
