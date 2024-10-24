package com.example.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entity.Users;
import com.example.repository.UsersRepo;
import com.example.requests.LoginRequest;

@Service
public class UserService {
	
	@Autowired 
	UsersRepo usersRepo;
	
	public Users addUser(Users user) {
		
		return usersRepo.save(user);
		
	}
	
	public Boolean loginUser(LoginRequest loginRequest) {

        Optional<Users> userOptional = usersRepo.findById(loginRequest.getUserId());
        
        if (userOptional.isPresent()) {
            Users user = userOptional.get(); 
            
            return (!user.getPassword().equals(loginRequest.getPassword()));
        }
        
        return true;
    }
}


