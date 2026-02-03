package com.rightdevs.BookLibrary.mapper;

import com.rightdevs.BookLibrary.dto.BookDto;
import com.rightdevs.BookLibrary.dto.request.CreateBookRequestDto;
import com.rightdevs.BookLibrary.entity.Book;
import com.rightdevs.BookLibrary.entity.User;

import java.util.HashSet;
import java.util.stream.Collectors;

public class BookMapper {
    public static BookDto toDto(Book bookModel) {
        return new BookDto(
                bookModel.getId(),
                bookModel.getTitle(),
                bookModel.getDescription(),
                bookModel.getRating(),
                bookModel.getPublishedOn(),
                bookModel.getCreatedAt(),
                UserMapper.toDto(bookModel.getCreatedBy()),
                bookModel.getCategories().stream()
                        .map(CategoryMapper::toDto).collect(Collectors.toSet())
        );
    }

    public static Book toModel(BookDto dto) {
        return new Book(
                dto.getId(),
                dto.getTitle(),
                dto.getDescription(),
                dto.getRating(),
                dto.getPublishedOn(),
                dto.getCreatedAt(),
                UserMapper.toEntityModel(dto.getCreatedBy()),
                dto.getCategories().stream()
                        .map(CategoryMapper::toEntityModel).collect(Collectors.toSet())
        );
    }

    public static BookDto toDtoFromRequest(CreateBookRequestDto request, User user) {
        return new BookDto(
                request.getId(),
                request.getTitle(),
                request.getDescription(),
                request.getRating(),
                request.getPublishedOn(),
                null,
                UserMapper.toDto(user),
                request.getCategories() == null
                    ? new HashSet<>()
                    : request.getCategories().stream()
                        .map(cat -> CategoryMapper.toDtoFromRequest(cat, user))
                        .collect(Collectors.toSet())
        );
    }
}
