package org.example.online_food_ordering.repository;


import org.example.online_food_ordering.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository  extends JpaRepository<UserEntity,String> {

    Optional<UserEntity> findByEmail(String email);

}
