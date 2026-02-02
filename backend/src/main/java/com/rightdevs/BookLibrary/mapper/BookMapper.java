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
                bookModel.getCreatedOn(),
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
                dto.getCreatedOn(),
                UserMapper.toEntityModel(dto.getCreatedBy())
        );
    }

    public static BookDto toDtoFromRequest(CreateBookRequestDto reqest, User user) {
        return new BookDto(
                null,
                reqest.getTitle(),
                reqest.getDescription(),
                reqest.getRating(),
                reqest.getPublishedOn(),
                null,
                UserMapper.toDto(user)
        );
    }
}
