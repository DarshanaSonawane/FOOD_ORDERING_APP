package org.example.online_food_ordering.controller;


import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.example.online_food_ordering.io.UserRequest;
import org.example.online_food_ordering.io.UserResponse;
import org.example.online_food_ordering.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/auth")
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse register(@RequestBody UserRequest request){
        UserResponse response = userService.registerUser(request);
        return response;
    }
}
