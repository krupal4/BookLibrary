package com.rightdevs.BookLibrary.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

@AllArgsConstructor
@Builder
@Getter
@Setter
public class UserDto {
    Long id;
    String name;
    String email;

    @JsonIgnore
    String password;

    @Override
    public String toString() {
        return "{" + id + " , " + name + " , " + email + " , " + password + "}";
    }
}
