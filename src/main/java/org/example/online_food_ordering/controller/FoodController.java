package org.example.online_food_ordering.controller;

import lombok.RequiredArgsConstructor;
import org.example.online_food_ordering.request.FoodRequest;
import org.example.online_food_ordering.request.FoodResponse;
import org.example.online_food_ordering.service.FoodService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import tools.jackson.core.JacksonException;
import tools.jackson.databind.ObjectMapper;

import java.util.List;

@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})
@RestController
@RequestMapping("/api/foods")
@RequiredArgsConstructor
public class FoodController {

    private final FoodService foodService;
    private final ObjectMapper objectMapper;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<FoodResponse> addFood(
            @RequestPart("food") String foodString,
            @RequestPart("file") MultipartFile file) {

        FoodRequest request;
        try {
            request = objectMapper.readValue(foodString, FoodRequest.class);
        } catch (JacksonException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid food JSON", ex);
        }

        FoodResponse response = foodService.addFood(request, file);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }


@GetMapping()
    public List<FoodResponse> readfoods(){
        return foodService.readFoods();
    }

    @GetMapping("/{id}")
    public FoodResponse readfood(@PathVariable String id){
        return foodService.readFood(id);
    }


    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteFood(@PathVariable String id){
        foodService.deleteFood(id);
    }
}