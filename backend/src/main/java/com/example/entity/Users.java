package com.example.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Users {
	
	public Users() {}

	public Users(String email, String password) {
		this();
		this.email = email;
		this.password = password;
	}

	public Users(String name, String email, String password) {
		this(email, password);
        this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Id
    private String name;

	private String email;
	
	private String password;

}