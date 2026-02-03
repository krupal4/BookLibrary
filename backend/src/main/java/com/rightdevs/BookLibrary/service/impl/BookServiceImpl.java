package com.rightdevs.BookLibrary.service.impl;

import com.rightdevs.BookLibrary.dto.BookDto;
import com.rightdevs.BookLibrary.entity.Book;
import com.rightdevs.BookLibrary.entity.Category;
import com.rightdevs.BookLibrary.entity.User;
import com.rightdevs.BookLibrary.mapper.BookMapper;
import com.rightdevs.BookLibrary.repository.BookRepository;
import com.rightdevs.BookLibrary.repository.CategoryRepository;
import com.rightdevs.BookLibrary.service.BookService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
public class BookServiceImpl implements BookService {
    BookRepository bookRepository;
    CategoryRepository categoryRepository;

    @Transactional
    @Override
    public BookDto createBook(BookDto bookDto) {
        Book bookModel = BookMapper.toModel(bookDto);

        Set<Category> categories = bookModel.getCategories();
        List<Category> savedCategories = categoryRepository.saveAll(categories);

        bookModel.setCategories(new HashSet<>(savedCategories));

        Book createdBookModel = bookRepository.save(bookModel);
        return BookMapper.toDto(createdBookModel);
    }

    @Override
    public List<BookDto> getBooks(Long userId) {
        List<Book> bookModels = bookRepository.findByCreatedById(userId);
        return bookModels.stream()
                .map(BookMapper::toDto)
                .toList();
    }

    @Override
    public void deleteBook(Long bookId) {
        bookRepository.deleteById(bookId);
    }
}
