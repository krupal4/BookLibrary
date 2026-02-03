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
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/books")
public class BookController {
    private BookService bookService;

    @PostMapping("/save")
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

    @GetMapping("/all")
    public ResponseEntity<List<BookDto>> getBooks() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            assert authentication != null;
            User user = ((User) authentication.getPrincipal());
            assert user != null;

            List<BookDto> bookDtoList = bookService.getBooks(user.getId());
            return ResponseEntity.ok(bookDtoList);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @DeleteMapping("/delete/{bookId}")
    public ResponseEntity deleteBook(@PathVariable Long bookId) {
        try {
            bookService.deleteBook(bookId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
}
