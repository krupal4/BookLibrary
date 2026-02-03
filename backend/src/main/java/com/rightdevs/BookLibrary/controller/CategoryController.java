package com.rightdevs.BookLibrary.controller;

import com.rightdevs.BookLibrary.dto.CategoryDto;
import com.rightdevs.BookLibrary.dto.request.CategoryRequestDto;
import com.rightdevs.BookLibrary.entity.User;
import com.rightdevs.BookLibrary.mapper.CategoryMapper;
import com.rightdevs.BookLibrary.service.CategoryService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/categories")
public class CategoryController {
    private CategoryService categoryService;

    @PostMapping("/save")
    public ResponseEntity<CategoryDto> create(
            @RequestBody CategoryRequestDto categoryRequestDto,
            @AuthenticationPrincipal User user
            ) {

            CategoryDto requestDto = CategoryMapper.toDtoFromRequest(categoryRequestDto, user);
            CategoryDto createdDto = categoryService.create(requestDto);
            return new ResponseEntity<>(createdDto, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<CategoryDto>> getCategories(@AuthenticationPrincipal User user) {
            List<CategoryDto> categoryDtos = categoryService.getAll(user.getId());
            return ResponseEntity.ok(categoryDtos);
    }
}
