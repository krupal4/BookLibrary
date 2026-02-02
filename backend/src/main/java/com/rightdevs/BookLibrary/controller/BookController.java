package com.rightdevs.BookLibrary.controller;

import com.rightdevs.BookLibrary.dto.BookDto;
import com.rightdevs.BookLibrary.dto.CreateBookRequestDto;
import com.rightdevs.BookLibrary.dto.LoginResponseDto;
import com.rightdevs.BookLibrary.dto.SignUpRequestDto;
import com.rightdevs.BookLibrary.entity.User;
import com.rightdevs.BookLibrary.mapper.BookMapper;
import com.rightdevs.BookLibrary.service.BookService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/books")
public class BookController {
    private BookService bookService;

    @PostMapping("/create")
    public ResponseEntity<BookDto> createBook(@RequestBody CreateBookRequestDto bookRequestModel) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            assert authentication != null;
            User user = ((User) authentication.getPrincipal());

            BookDto requestDto = BookMapper.toDtoFromRequest(bookRequestModel, user);
            BookDto createdBookDto = bookService.createBook(requestDto);
            return new ResponseEntity<>(createdBookDto, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
}
