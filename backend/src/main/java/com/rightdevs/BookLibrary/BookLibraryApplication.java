package com.rightdevs.BookLibrary;

import com.rightdevs.BookLibrary.service.UserService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BookLibraryApplication {
	UserService userService;

	BookLibraryApplication(UserService userService) {
		this.userService = userService;
	}

	public static void main(String[] args) {
		SpringApplication.run(BookLibraryApplication.class, args);
	}
}
