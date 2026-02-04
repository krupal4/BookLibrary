package com.rightdevs.BookLibrary.controller;

import com.rightdevs.BookLibrary.dto.BookDto;
import com.rightdevs.BookLibrary.dto.request.CreateBookRequestDto;
import com.rightdevs.BookLibrary.entity.User;
import com.rightdevs.BookLibrary.mapper.BookMapper;
import com.rightdevs.BookLibrary.service.BookService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/books")
public class BookController {
    private BookService bookService;

    @PostMapping("/save")
    public ResponseEntity<BookDto> createBook(
            @RequestBody CreateBookRequestDto bookRequestModel,
            @AuthenticationPrincipal User user
    ) {
        BookDto requestDto = BookMapper.toDtoFromRequest(bookRequestModel, user);
        BookDto createdBookDto = bookService.createBook(requestDto);
        return new ResponseEntity<>(createdBookDto, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<BookDto>> getBooks(
            @AuthenticationPrincipal User user
            ) {
        List<BookDto> bookDtoList = bookService.getBooks(user.getId());
        return ResponseEntity.ok(bookDtoList);
    }

    @DeleteMapping("/delete/{bookId}")
    public ResponseEntity deleteBook(
            @PathVariable Long bookId,
            @AuthenticationPrincipal User user
    ) throws AccessDeniedException {
        bookService.deleteBook(bookId, user.getId());
        return ResponseEntity.ok().build();
    }
}