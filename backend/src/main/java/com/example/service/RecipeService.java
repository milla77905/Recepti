package com.example.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.entity.FoodType;
import com.example.entity.Recipes;
import com.example.repository.RecipesRepo;

@Service
public class RecipeService {

    @Autowired
    private RecipesRepo recipeRepository;

    public List<Recipes> findAll() {
        return recipeRepository.findAll();
    }

    private final String UPLOAD_DIR = "uploads/";

    public void addRecipe(Recipes recipe, MultipartFile imageFile) throws IOException {
        String imagePath = saveImage(imageFile);

        recipe.setImagePath(imagePath);
        recipeRepository.save(recipe);
    }

    public List<Recipes> getAllRecipes() {
        return recipeRepository.findAll();
    }
    

    public void addRecipe(Recipes recipe) {
        recipeRepository.save(recipe);  
    }


    public String deleteRecipe(Long id) {
        recipeRepository.deleteById(id);
       return "Deleted";
    }

    public String saveImage(MultipartFile imageFile) throws IOException {
        String fileName = System.currentTimeMillis() + "_" + imageFile.getOriginalFilename();
        Path uploadPath = Paths.get(UPLOAD_DIR);
        Files.createDirectories(uploadPath);
    
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(imageFile.getInputStream(), filePath);
    
        return fileName; 
    }
    
    public void saveRecipe(Recipes recipe) {
        recipeRepository.save(recipe);
    }

    public List<Recipes> getRecipesByFoodType(FoodType foodType) {
        return recipeRepository.findByFoodType(foodType);
    }
    }

