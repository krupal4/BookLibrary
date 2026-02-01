package com.rightdevs.BookLibrary.service.impl;

import com.rightdevs.BookLibrary.dto.UserDto;
import com.rightdevs.BookLibrary.entity.User;
import com.rightdevs.BookLibrary.mapper.UserMapper;
import com.rightdevs.BookLibrary.repository.UserRepository;
import com.rightdevs.BookLibrary.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    UserRepository userRepository;

    @Override
    public UserDto createUser(UserDto userDto) {
        User userModel = UserMapper.toEntityModel(userDto);
        User savedUserModel = userRepository.save(userModel);
        return UserMapper.toDto(savedUserModel);
    }

    @Override
    public List<UserDto> getAll() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(UserMapper::toDto)
                .toList();
    }
}