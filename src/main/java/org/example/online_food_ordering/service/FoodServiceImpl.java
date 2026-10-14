package org.example.online_food_ordering.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.online_food_ordering.Entity.FoodEntity;
import org.example.online_food_ordering.repository.FoodRepository;
import org.example.online_food_ordering.request.FoodRequest;
import org.example.online_food_ordering.request.FoodResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class FoodServiceImpl implements FoodService {

    private static final Set<String> ALLOWED_TYPES =
            Set.of("image/jpeg", "image/png", "image/webp");

    @Autowired
    private final FoodRepository foodRepository;

    @Autowired
    private final S3Client s3Client;

    @Value("${aws.s3.bucketname}")
    private String bucketName;

    @Value("${AWS_REGION}")
    private String region;

    @Override
    public String uploadFile(MultipartFile file) {

        log.info("bucket={} region={}", bucketName, region);
        if (file == null || file.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "File is empty");
        }
        if (file.getContentType() == null || !ALLOWED_TYPES.contains(file.getContentType())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Only JPEG, PNG or WEBP images are allowed");
        }

        String originalName = file.getOriginalFilename();
        String extension = "";
        if (originalName != null && originalName.contains(".")) {
            extension = originalName.substring(originalName.lastIndexOf("."));
        }

        String key = UUID.randomUUID() + extension;

        try {
            PutObjectRequest request = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .contentType(file.getContentType())
                    .build();

            s3Client.putObject(request,
                    RequestBody.fromInputStream(file.getInputStream(), file.getSize()));

            return "https://" + bucketName + ".s3." + region + ".amazonaws.com/" + key;

        } catch (IOException e) {
            log.error("Failed to read uploaded file", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Failed to read the file", e);
        } catch (Exception e) {
            log.error("Failed to upload file to S3", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Failed to upload file to S3", e);
        }
    }

    @Override
    public FoodResponse addFood(FoodRequest request, MultipartFile file) {
        FoodEntity newFoodEntity = convertToEntity(request);
        String imageUrl = uploadFile(file);
        newFoodEntity.setImageUrl(imageUrl);

        try {
            newFoodEntity = foodRepository.save(newFoodEntity);
        } catch (Exception e) {
            // DB save failed: remove the uploaded image so it isn't orphaned in S3
            deleteFromS3(imageUrl);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Failed to save food item", e);
        }
        return convertToResponse(newFoodEntity);
    }

    @Override
    public List<FoodResponse> readFoods() {
        List<FoodEntity> database=foodRepository.findAll();
      return  database.stream().map(object->convertToResponse(object)).collect(Collectors.toList());
    }

    @Override
    public FoodResponse readFood(String id) {
     FoodEntity exisiting=   foodRepository.findById(id).orElseThrow(()-> new RuntimeException(("food not found for the id :"+id)));
return  convertToResponse(exisiting);
    }

    private void deleteFromS3(String imageUrl) {
        try {
            String key = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
            s3Client.deleteObject(DeleteObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .build());
        } catch (Exception ex) {
            log.warn("Could not clean up S3 object for {}", imageUrl, ex);
        }
    }

    private FoodEntity convertToEntity(FoodRequest request) {
        return FoodEntity.builder()
                .name(request.getName())
                .description(request.getDescription())
                .category(request.getCategory())
                .price(request.getPrice())
                .build();
    }

    private FoodResponse convertToResponse(FoodEntity entity) {
        return FoodResponse.builder()
                .id(entity.getId())
                .name(entity.getName())
                .description(entity.getDescription())
                .category(entity.getCategory())
                .price(entity.getPrice())
                .imageUrl(entity.getImageUrl())
                .build();
    }
    @Override
    public boolean deleteFile(String filename) {
        DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                .bucket(bucketName)
                .key(filename)
                .build();

        s3Client.deleteObject(deleteObjectRequest);

    return true;
    }

    @Override
    public void deleteFood(String id) {

        FoodResponse response= readFood(id);
      String imageUrl=  response.getImageUrl();
      String filename=imageUrl.substring(imageUrl.lastIndexOf("/")+1);

     boolean isFileDeleted= deleteFile(filename);
     if(isFileDeleted){
         foodRepository.deleteById(response.getId());
     }
    }

}