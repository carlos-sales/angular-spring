package com.carlos.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.carlos.backend.model.Course;

public interface CourseRepository extends JpaRepository<Course, Long>
{
    
}
