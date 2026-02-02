package com.rightdevs.BookLibrary.mapper;

import com.rightdevs.BookLibrary.dto.BookDto;
import com.rightdevs.BookLibrary.dto.CreateBookRequestDto;
import com.rightdevs.BookLibrary.entity.Book;
import com.rightdevs.BookLibrary.entity.User;

public class BookMapper {
    public static BookDto toDto(Book bookModel) {
        return new BookDto(
                bookModel.getId(),
                bookModel.getTitle(),
                bookModel.getDescription(),
                bookModel.getRating(),
                bookModel.getPublishedOn(),
                bookModel.getCreatedAt(),
                UserMapper.toDto(bookModel.getCreatedBy())
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
                UserMapper.toEntityModel(dto.getCreatedBy())
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
                UserMapper.toDto(user)
        );
    }
}
