package com.rightdevs.BookLibrary.repository;

import com.rightdevs.BookLibrary.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
}
