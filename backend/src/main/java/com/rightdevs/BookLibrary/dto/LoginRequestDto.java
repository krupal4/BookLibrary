package com.rightdevs.BookLibrary.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Data
public class LoginRequestDto {
    String email;
    String password;
}
