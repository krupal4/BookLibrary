package com.rightdevs.BookLibrary.repository;

import com.rightdevs.BookLibrary.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
