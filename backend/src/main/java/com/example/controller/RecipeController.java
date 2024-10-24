package com.example.controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.entity.Recipes;
import com.example.repository.RecipesRepo;
import com.example.service.RecipeService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/recipes")
public class RecipeController {

    @Autowired
    private RecipeService recipeService;
    // POST: Add a new recipe
    @PostMapping("/add")
    public ResponseEntity<String> addRecipe(
            @RequestPart("data") String recipeRequestString,
            @RequestPart(value = "image", required = false) MultipartFile imageFile) {
    
        try {
            // Deserialize the incoming JSON string to a Recipes object
            ObjectMapper objectMapper = new ObjectMapper();
            Recipes recipe = objectMapper.readValue(recipeRequestString, Recipes.class);

            // Call the service to save the recipe and image
            if (imageFile != null) {
                // If an image is provided, save it and update the image path
                String imagePath = recipeService.saveImage(imageFile);
                recipe.setImagePath(imagePath); // Set the image path in the recipe
            }

            // Save the recipe to the database
            recipeService.addRecipe(recipe, imageFile);

            return ResponseEntity.ok("Recipe and image uploaded successfully!");
        } catch (JsonProcessingException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Invalid recipe data: " + e.getMessage());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error saving the recipe or image: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }


    
    
// GET: Retrieve all recipes
@GetMapping
public List<Recipes> getAllRecipes() {
    return recipeService.getAllRecipes();
}

// GET: Retrieve the last added recipe
@GetMapping("/last")
public ResponseEntity<Recipes> getLastRecipe() {
    Recipes lastRecipe = recipeService.getLastRecipe();
    if (lastRecipe != null) {
        return ResponseEntity.ok(lastRecipe);
    } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}


@DeleteMapping("/delete/{id}")
    public String deleteRecipe(@PathVariable Long id) {
         return recipeService.deleteRecipe(id);
    }

    @Autowired
    private RecipesRepo recipesRepository;

    @PutMapping(path = "/updateRecipes/{id}")
    public @ResponseBody ResponseEntity<String> updateRecipes(@PathVariable Long id, @RequestBody Recipes updatedRecipe) {
        // Find the existing recipe by ID
        Optional<Recipes> existingRecipeOpt = recipesRepository.findById(id);

        // Check if the recipe exists
        if (!existingRecipeOpt.isPresent()) {
            return ResponseEntity.status(404).body("Recipe not found with ID: " + id);
        }

        // Update the existing recipe
        Recipes existingRecipe = existingRecipeOpt.get();
        existingRecipe.setName(updatedRecipe.getName());
        existingRecipe.setType(updatedRecipe.getType());
        existingRecipe.setIngredients(updatedRecipe.getIngredients());
        existingRecipe.setInstructions(updatedRecipe.getInstructions());

        // Optional: Update the image path if provided
        if (updatedRecipe.getImagePath() != null && !updatedRecipe.getImagePath().isEmpty()) {
            existingRecipe.setImagePath(updatedRecipe.getImagePath());
        }

        // Save the updated recipe to the database
        recipesRepository.save(existingRecipe);

        // Return success response
        return ResponseEntity.ok("Updated");
    }

}
