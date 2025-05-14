package com.example.agency.service;

import com.example.agency.model.User;

import java.util.List;

public interface UserService {
    User registerUser(User user);

    List<User> getUsers();

    void deleteUser(String email);

    User getUser(String email);

    User updateUserName(String email, String newName, String newLastName);
}
