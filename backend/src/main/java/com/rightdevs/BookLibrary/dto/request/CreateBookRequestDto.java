package com.rightdevs.BookLibrary.dto.request;

import com.rightdevs.BookLibrary.dto.CategoryDto;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class CreateBookRequestDto {
    Long id;
    String title;
    String description;
    double rating;
    Date publishedOn;
    List<CategoryRequestDto> categories;
}
