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
        recipe = new Recipes("Test Recipe", FoodType.BAKERY, "Test Ingredients", "Test Instructions", null);
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
    
}
