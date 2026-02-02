package com.rightdevs.BookLibrary.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.Date;

@Getter
@Setter
public class CreateBookRequestDto {
    String title;
    String description;
    double rating;
    Date publishedOn;
}
