package com.rightdevs.BookLibrary.service;

import com.rightdevs.BookLibrary.dto.BookDto;
import org.springframework.security.core.parameters.P;

import java.nio.file.AccessDeniedException;
import java.util.List;

public interface BookService {
    public BookDto createBook(BookDto bookDto);

    public List<BookDto> getBooks(Long userId);

    public void deleteBook(Long bookId, Long userId) throws AccessDeniedException;
}
