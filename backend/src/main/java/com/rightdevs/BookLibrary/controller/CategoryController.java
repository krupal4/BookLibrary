package com.rightdevs.BookLibrary.controller;

import com.rightdevs.BookLibrary.dto.CategoryDto;
import com.rightdevs.BookLibrary.dto.CategoryRequestDto;
import com.rightdevs.BookLibrary.entity.User;
import com.rightdevs.BookLibrary.mapper.CategoryMapper;
import com.rightdevs.BookLibrary.service.CategoryService;
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
@RequestMapping("/api/categories")
public class CategoryController {
    private CategoryService categoryService;

    @PostMapping("/save")
    public ResponseEntity<CategoryDto> createBook(@RequestBody CategoryRequestDto categoryRequestDto) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            assert authentication != null;
            User user = ((User) authentication.getPrincipal());

            CategoryDto requestDto = CategoryMapper.toDtoFromRequest(categoryRequestDto, user);
            CategoryDto createdDto = categoryService.create(requestDto);
            return new ResponseEntity<>(createdDto, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
}
