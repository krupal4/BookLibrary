package com.rightdevs.BookLibrary.service;

import com.rightdevs.BookLibrary.dto.BookDto;
import com.rightdevs.BookLibrary.dto.CategoryDto;

import java.util.List;

public interface CategoryService {
    public CategoryDto create(CategoryDto categoryDto);
    public List<CategoryDto> getAll(Long userId);
}
