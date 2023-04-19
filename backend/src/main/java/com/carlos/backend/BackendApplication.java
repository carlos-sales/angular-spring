package com.carlos.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.carlos.backend.model.Course;
import com.carlos.backend.repository.CourseRepository;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabase( CourseRepository courseRepository )
	{
		return args -> {
			courseRepository.deleteAll();
			Course c = new Course();
			c.setName( "Angular com Spring");
			c.setCategory("front-end");

			courseRepository.save( c );
		};
	}

}
