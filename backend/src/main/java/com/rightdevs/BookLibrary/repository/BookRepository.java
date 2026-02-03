package com.rightdevs.BookLibrary.repository;

import com.rightdevs.BookLibrary.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findByCreatedById(Long userId);
}
