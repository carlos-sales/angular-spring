package com.carlos.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.carlos.backend.model.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long>
{
    
}
