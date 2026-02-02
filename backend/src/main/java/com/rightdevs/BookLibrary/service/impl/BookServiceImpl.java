package com.rightdevs.BookLibrary.service.impl;

import com.rightdevs.BookLibrary.dto.BookDto;
import com.rightdevs.BookLibrary.entity.Book;
import com.rightdevs.BookLibrary.entity.User;
import com.rightdevs.BookLibrary.mapper.BookMapper;
import com.rightdevs.BookLibrary.repository.BookRepository;
import com.rightdevs.BookLibrary.service.BookService;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class BookServiceImpl implements BookService {
    BookRepository bookRepository;

    @Override
    public BookDto createBook(BookDto bookDto) {
        Book bookModel = BookMapper.toModel(bookDto);
        Book createdBookModel = bookRepository.save(bookModel);
        return BookMapper.toDto(createdBookModel);
    }
}
