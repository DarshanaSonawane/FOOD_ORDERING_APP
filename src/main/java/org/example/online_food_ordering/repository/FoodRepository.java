package org.example.online_food_ordering.repository;

import org.example.online_food_ordering.Entity.FoodEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodRepository extends JpaRepository<FoodEntity, String> {
}