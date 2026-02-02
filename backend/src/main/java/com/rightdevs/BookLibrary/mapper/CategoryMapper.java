package com.rightdevs.BookLibrary.mapper;

import com.rightdevs.BookLibrary.dto.CategoryDto;
import com.rightdevs.BookLibrary.dto.CategoryRequestDto;
import com.rightdevs.BookLibrary.entity.Category;
import com.rightdevs.BookLibrary.entity.User;

public class CategoryMapper {
    public static CategoryDto toDto(Category category) {
        return  new CategoryDto(
                category.getId(),
                category.getName(),
                category.getCreatedAt(),
                UserMapper.toDto(category.getCreatedBy())
        );
    }

    public static Category toEntityModel(CategoryDto categoryDto) {
        return new Category(
                categoryDto.getId(),
                categoryDto.getName(),
                UserMapper.toEntityModel(categoryDto.getCreatedBy()),
                categoryDto.getCreatedAt()
        );
    }

    public static CategoryDto toDtoFromRequest(CategoryRequestDto requestDto, User user) {
        return new CategoryDto(
                requestDto.getId(),
                requestDto.getName(),
                null,
                UserMapper.toDto(user)
        );
    }
}
