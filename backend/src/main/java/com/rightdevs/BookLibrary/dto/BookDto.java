package com.rightdevs.BookLibrary.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@AllArgsConstructor
@Getter
@Setter
public class BookDto {
    Long id;
    String title;
    String description;
    double rating;
    Date publishedOn;
    Date createdOn;
    UserDto createdBy;
}
