package com.rightdevs.BookLibrary.service;

import com.rightdevs.BookLibrary.dto.BookDto;
import com.rightdevs.BookLibrary.entity.User;

public interface BookService {
    public BookDto createBook(BookDto bookDto);
}
