package com.rightdevs.BookLibrary.dto;

import com.rightdevs.BookLibrary.entity.User;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
public class CategoryDto {
    Long id;
    String name;
    Date createdAt;
    UserDto createdBy;
}
