package com.rightdevs.BookLibrary.service;

import com.rightdevs.BookLibrary.dto.UserDto;

import java.util.List;

public interface UserService {
    UserDto createUser(UserDto user);

    List<UserDto> getAll();
}
