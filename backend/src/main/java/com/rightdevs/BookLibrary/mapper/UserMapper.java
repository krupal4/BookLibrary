package com.rightdevs.BookLibrary.mapper;

import com.rightdevs.BookLibrary.dto.UserDto;
import com.rightdevs.BookLibrary.entity.User;


public class UserMapper {
    public static UserDto toDto(User user) {
        return new UserDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPassword()
        );
    }

    public  static User  toEntityModel(UserDto userDto) {
        return  new User(
                userDto.getId(),
                userDto.getName(),
                userDto.getEmail(),
                userDto.getPassword()
        );
    }
}