package com.rightdevs.BookLibrary.service;

import com.rightdevs.BookLibrary.dto.LoginRequestDto;
import com.rightdevs.BookLibrary.dto.LoginResponseDto;
import com.rightdevs.BookLibrary.dto.SignUpRequestDto;
import com.rightdevs.BookLibrary.entity.User;
import com.rightdevs.BookLibrary.repository.UserRepository;
import com.rightdevs.BookLibrary.utils.AuthUtil;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class AuthService {
    AuthenticationManager authenticationManager;
    AuthUtil authUtil;
    UserRepository userRepository;
    PasswordEncoder passwordEncoder;

    public LoginResponseDto login(LoginRequestDto loginRequestDto) throws Exception {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequestDto.getEmail(),
                        loginRequestDto.getPassword()));

        User user = (User) authentication.getPrincipal();

        if (user == null)
            throw new Exception("User not found!");

        String token = authUtil.generateAccessToken(user);

        return  new LoginResponseDto(
                token,
                user.getId()
        );
    }

    public LoginResponseDto signUp(SignUpRequestDto signupRequestDto) throws IllegalArgumentException {
        User user = userRepository.findByEmail(signupRequestDto.getEmail()).orElse(null);

        if(user != null) throw new IllegalArgumentException("User already exists");

        user = userRepository.save(User.builder()
                .email(signupRequestDto.getEmail())
                .name(signupRequestDto.getName())
                .password(passwordEncoder.encode(signupRequestDto.getPassword()))
                .build()
        );

        String token = authUtil.generateAccessToken(user);

        return new LoginResponseDto(token, user.getId());
    }
}
