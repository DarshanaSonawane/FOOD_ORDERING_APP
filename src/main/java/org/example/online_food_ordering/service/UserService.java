package org.example.online_food_ordering.service;

import org.example.online_food_ordering.io.UserRequest;
import org.example.online_food_ordering.io.UserResponse;

public interface UserService {

    UserResponse registerUser(UserRequest request);
}
