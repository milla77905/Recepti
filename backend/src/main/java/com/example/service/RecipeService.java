package com.example.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.entity.Recipes;
import com.example.repository.RecipesRepo;

@Service
public class RecipeService {

    @Autowired
    private RecipesRepo recipeRepository;

    private final String UPLOAD_DIR = "uploads/";

    public void addRecipe(Recipes recipe, MultipartFile imageFile) throws IOException {
        // Save image to file system and get the path
        String imagePath = saveImage(imageFile);

        // Set the image path in the Recipe object
        recipe.setImagePath(imagePath);

        // Save recipe to the database
        recipeRepository.save(recipe);
    }

    public List<Recipes> getAllRecipes() {
        return recipeRepository.findAll();
    }

    // Method to get the last added recipe
    public Recipes getLastRecipe() {
        return recipeRepository.findTopByOrderByIdDesc().orElse(null);
    }

    public String deleteRecipe(Long id) {
        recipeRepository.deleteById(id);
       return "Deleted";
    }

    public String saveImage(MultipartFile imageFile) throws IOException {
        String fileName = System.currentTimeMillis() + "_" + imageFile.getOriginalFilename(); // Append timestamp to avoid overwriting
        Path uploadPath = Paths.get(UPLOAD_DIR);
        Files.createDirectories(uploadPath);
    
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(imageFile.getInputStream(), filePath);
    
        return fileName; // Return the filename
    }
    
    public RecipeService(RecipesRepo recipeRepository) {        // d
        this.recipeRepository = recipeRepository;
    }

    public List<Recipes> getRecipesByIds(List<Long> recipeIds) {    // self explanatory
        return recipeRepository.findAllById(recipeIds);
    }


    }

