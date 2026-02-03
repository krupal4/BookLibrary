package com.rightdevs.BookLibrary.service.impl;

import com.rightdevs.BookLibrary.dto.CategoryDto;
import com.rightdevs.BookLibrary.entity.Category;
import com.rightdevs.BookLibrary.mapper.CategoryMapper;
import com.rightdevs.BookLibrary.repository.CategoryRepository;
import com.rightdevs.BookLibrary.service.CategoryService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    CategoryRepository categoryRepository;

    @Override
    public CategoryDto create(CategoryDto categoryDto) {
        Category model = CategoryMapper.toEntityModel(categoryDto);
        Category savedModel = categoryRepository.save(model);
        return CategoryMapper.toDto(savedModel);
    }

    @Override
    public List<CategoryDto> getAll(Long userId) {
        List<Category> categories = categoryRepository.findAll();
        return categories.stream().map(CategoryMapper::toDto).toList();
    }
}
