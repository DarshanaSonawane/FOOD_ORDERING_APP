package org.example.online_food_ordering.service;

import org.example.online_food_ordering.request.FoodRequest;
import org.example.online_food_ordering.request.FoodResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FoodService {
    String uploadFile(MultipartFile file);

   FoodResponse addFood(FoodRequest request, MultipartFile file);
   List<FoodResponse>  readFoods();
   FoodResponse readFood(String id);

   boolean deleteFile(String filename);

   void deleteFood(String id);
}
