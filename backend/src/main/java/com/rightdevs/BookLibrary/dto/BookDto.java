package com.rightdevs.BookLibrary.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.Set;

@AllArgsConstructor
@Getter
@Setter
public class BookDto {
    Long id;
    String title;
    String description;
    double rating;
    Date publishedOn;
    Date createdAt;
    UserDto createdBy;
    Set<CategoryDto> categories;
}
