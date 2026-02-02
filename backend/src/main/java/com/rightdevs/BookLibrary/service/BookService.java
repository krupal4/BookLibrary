package com.rightdevs.BookLibrary.service;

import com.rightdevs.BookLibrary.dto.BookDto;
import java.util.List;

public interface BookService {
    public BookDto createBook(BookDto bookDto);

    public List<BookDto> getBooks();
}
