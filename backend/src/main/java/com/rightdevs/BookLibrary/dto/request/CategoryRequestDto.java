package com.rightdevs.BookLibrary.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CategoryRequestDto {
    Long id;
    String name;
}
