package com.rightdevs.BookLibrary.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class LoginResponseDto {
    private String token;
    private Long userId;
}
