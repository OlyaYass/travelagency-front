package com.example.agency.service;

import com.example.agency.exception.UserAlreadyExistsException;
import com.example.agency.model.Role;
import com.example.agency.model.User;
import com.example.agency.repository.RoleRepo;
import com.example.agency.repository.UserRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepo roleRepo;


    @Override
    public User registerUser(User user) {
        if (userRepo.existsByEmail(user.getEmail())) {
            throw new UserAlreadyExistsException(user.getEmail()+" уже существует!");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Role userRole = roleRepo.findByName("ROLE_USER").get();
        user.setRoles(Collections.singletonList(userRole));
        return userRepo.save(user);
    }


    @Override
    public List<User> getUsers() {
        return userRepo.findAll();
    }

    @Transactional
    @Override
    public void deleteUser(String email) {
        User theUser = getUser(email);
        if (theUser != null){
            userRepo.deleteByEmail(email);
        }
    }

    @Override
    public User getUser(String email) {
        return userRepo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Пользователь не найден"));
    }

    @Override
    public User updateUserName(String email, String newName, String newLastName) {
        User existingUser = getUser(email);
        existingUser.setFirstName(newName);
        existingUser.setLastName(newLastName);
        return userRepo.save(existingUser);  // Сохраняем обновленного пользователя в базе
    }
}
