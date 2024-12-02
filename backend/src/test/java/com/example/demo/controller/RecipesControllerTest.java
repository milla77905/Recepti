package com.example.demo.controller;

import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.controller.RecipeController;
import com.example.entity.FoodType;
import com.example.entity.Recipes;
import com.example.repository.RecipesRepo;

@SpringBootTest
public class RecipesControllerTest {
    @Autowired
    private RecipeController controller;

    @Autowired
    private RecipesRepo repo;

    private Recipes recipe;


    @BeforeEach
    void init() {
        repo.deleteAll(); // Clear the database before each test
        // Assign a non-null value to the imagePath
        recipe = new Recipes("Test Recipe", FoodType.BAKERY, "Test Ingredients", "Test Instructions", "default_image_path.jpg");
    }

    @Test
    void testAddRecipe() {
        controller.addRecipe(recipe);
        Assertions.assertFalse(repo.findAll().isEmpty(), "Recipe should be saved in the repository.");
    }

    @Test
    void testGetAllRecipes() {
        repo.save(recipe); // Add a recipe to the repo
        List<Recipes> recipes = controller.getAllRecipes(null);
        Assertions.assertEquals(1, recipes.size(), "Should return one recipe.");
    }

    @Test
    void testGetMeals() {
        // Arrange
        recipe.setFoodType(FoodType.MEAL);
        repo.save(recipe);

        // Act
        List<Recipes> meals = controller.getMeals();

        // Assert
        Assertions.assertEquals(1, meals.size(), "Should return one meal.");
    }

    @Test
    void testDeleteRecipe() {
        Recipes savedRecipe = repo.save(recipe);
        controller.deleteRecipe(savedRecipe.getId());

        // Ensure the recipe is deleted
        Assertions.assertFalse(repo.findById(savedRecipe.getId()).isPresent(), "Recipe should be deleted.");
    }

    @Test
    void testUpdateRecipe() {
        // Arrange
        Recipes recipe = new Recipes("Original Recipe", FoodType.MEAL, "Ingredients", "Instructions", "image_path.jpg");
        Recipes savedRecipe = repo.save(recipe);

        savedRecipe = repo.findById(savedRecipe.getId()).orElse(null);

        Recipes updatedRecipe = new Recipes("Updated Recipe", FoodType.BAKERY, "Updated Ingredients", "Updated Instructions", "updated_image_path.jpg");

        controller.updateRecipes(savedRecipe.getId(), updatedRecipe);

        Recipes foundRecipe = repo.findById(savedRecipe.getId()).orElse(null);
        Assertions.assertNotNull(foundRecipe, "Recipe should exist after update.");
        Assertions.assertEquals("Updated Recipe", foundRecipe.getName(), "Recipe name should be updated.");
    }
}
