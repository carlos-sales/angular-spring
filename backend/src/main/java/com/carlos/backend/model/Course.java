package com.carlos.backend.model;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.hibernate.validator.constraints.Length;

import com.carlos.backend.enums.Category;
import com.carlos.backend.enums.Status;
import com.carlos.backend.enums.converters.CategoryConverter;
import com.carlos.backend.enums.converters.StatusConverter;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

@Entity
@SQLDelete(sql = "UPDATE Course SET status = 'Inativo' WHERE id = ?")
@Where(clause = "status <> 'Inativo'")
public class Course 
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty("_id")
    private Long id;
    
    @NotBlank
    @NotNull
    @Length(min = 5, max = 100)
    @Column(length = 100, nullable = false)
    private String name;

    @NotNull
    @Column(length = 10, nullable = false)
    @Convert(converter = CategoryConverter.class )
    private Category category;
    
    @NotNull
    @Column(length = 10, nullable = false)
    @Convert(converter = StatusConverter.class )
    private Status status = Status.ACTIVE;

    @NotNull
    @NotEmpty
    @Valid
    @OneToMany( cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "course" )
    // @JoinColumn( name = "course_id" )
    private List<Lesson> lessons = new ArrayList<>();

    public Long getId() {
        return id;
    }

    // @Id
    // @GeneratedValue(strategy = GenerationType.AUTO)
    // @JsonProperty("_id")
    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    // @NotBlank
    // @NotNull
    // @Length(min = 5, max = 100)
    public void setName(String name) {
        this.name = name;
    }

    public Category getCategory() {
        return category;
    }

    // @NotNull
    // @Column(length = 10, nullable = false)
    // @Convert(converter = CategoryConverter.class )
    public void setCategory(Category category) {
        this.category = category;
    }

    public Status getStatus() {
        return status;
    }

    // @NotNull
    // @Column(length = 10, nullable = false)
    // @Convert(converter = StatusConverter.class )
    public void setStatus(Status status) {
        this.status = status;
    }

    public List<Lesson> getLessons() {
        return lessons;
    }

    // @OneToMany( cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "course" )
    public void setLessons(List<Lesson> lessons) {
        this.lessons = lessons;
    }
}
