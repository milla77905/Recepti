package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.entity.Users;
import com.example.service.UserService;
import com.example.requests.LoginRequest;;
@RestController
public class UsersController {
	
	@Autowired
	UserService userService;
	
	@PostMapping("/addUser") 
	@CrossOrigin(origins = "http://localhost:3000")
	public Users addUser(@RequestBody Users user) {
		return userService.addUser(user);
	}
	
	@PostMapping("/loginUser")
	@CrossOrigin(origins = "http://localhost:3000")
	public Boolean loginUser(@RequestBody LoginRequest loginRequest) {
		return userService.loginUser(loginRequest);
	}
}
