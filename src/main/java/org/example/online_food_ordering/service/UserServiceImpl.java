package org.example.online_food_ordering.service;

import org.example.online_food_ordering.Entity.UserEntity;
import org.example.online_food_ordering.io.UserRequest;
import org.example.online_food_ordering.io.UserResponse;
import org.example.online_food_ordering.repository.UserRepository;
import org.springframework.stereotype.Service;


@Service
public class UserServiceImpl implements  UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserResponse registerUser(UserRequest request) {
        UserEntity newUser=convertToEntity(request);
        newUser=userRepository.save(newUser);
        return convertTOResponse(newUser);


    }

    private UserEntity convertToEntity(UserRequest request) {

  return UserEntity.builder()
        .email(request.getEmail())
        .password(request.getPassword())
        .name(request.getName())
        .build();
    }


    private UserResponse convertTOResponse(UserEntity request){
         return   UserResponse.builder()
        .id(request.getId())
        .name(request.getName())
        .email(request.getEmail())
        .build();

    }

}
