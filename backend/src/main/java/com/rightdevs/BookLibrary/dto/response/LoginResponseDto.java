package com.rightdevs.BookLibrary.dto.response;

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
