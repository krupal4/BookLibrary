package com.rightdevs.BookLibrary.controller;

import com.rightdevs.BookLibrary.dto.request.LoginRequestDto;
import com.rightdevs.BookLibrary.dto.response.LoginResponseDto;
import com.rightdevs.BookLibrary.dto.request.SignUpRequestDto;
import com.rightdevs.BookLibrary.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/auth/")
public class AuthController {
    private AuthService authService;

    @PostMapping("/signUp")
    public ResponseEntity<LoginResponseDto> signUp(@RequestBody SignUpRequestDto signUpRequestDto) {
        try {
            LoginResponseDto loginResponseDto = authService.signUp(signUpRequestDto);
            return new ResponseEntity<>(loginResponseDto, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(new LoginResponseDto(), HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto loginRequestDto) {
        try {
            LoginResponseDto loginResponseDto = authService.login(loginRequestDto);
            return new ResponseEntity<>(loginResponseDto, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new LoginResponseDto(), HttpStatus.UNAUTHORIZED);
        }
    }
}
