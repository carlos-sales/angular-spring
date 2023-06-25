package com.carlos.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.carlos.backend.enums.Category;
import com.carlos.backend.model.Course;
import com.carlos.backend.model.Lesson;
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
			c.setCategory( Category.FRONT_END );

			Lesson l = new Lesson();
			l.setName("Introdução");
			l.setYoutubeUrl("Nb4uxLxdvxo");
			l.setCourse(c);
			c.getLessons().add( l );
			
			Lesson l1 = new Lesson();
			l1.setName("Angular + Spring");
			l1.setYoutubeUrl("Nb4uxLxdabc");
			l1.setCourse(c);
			c.getLessons().add( l1 );

			courseRepository.save( c );
		};
	}

}
