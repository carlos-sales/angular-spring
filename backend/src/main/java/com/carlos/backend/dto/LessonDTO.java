package com.carlos.backend.dto;

import org.hibernate.validator.constraints.Length;

import io.micrometer.common.lang.NonNull;
import jakarta.validation.constraints.NotBlank;

public record LessonDTO(
    Long id,
    @NonNull @NotBlank @Length(min = 5, max = 100) String name,
    @NonNull @NotBlank @Length(min = 10, max = 11) String youtubeUrl ) 
{
    
}
