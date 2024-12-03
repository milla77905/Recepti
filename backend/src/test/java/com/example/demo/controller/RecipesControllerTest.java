package com.example.demo.controller;

import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

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

    // Pred vsakim testom očistimo bazo in ustvarimo nov testni recept.
    @BeforeEach
    void init() {
        repo.deleteAll(); // Izbrišemo vse obstoječe podatke v bazi.
        recipe = new Recipes("Test Recipe", FoodType.BAKERY, "Test Ingredients", "Test Instructions", "default_image_path.jpg");
    }

    // Pozitiven test: Dodajanje recepta
    @Test
    void testAddRecipe() {
        controller.addRecipe(recipe);         // Dodamo recept
        // Preverimo, ali je seznam receptov v bazi ni prazen, kar pomeni, da je bil recept uspešno shranjen
        Assertions.assertFalse(repo.findAll().isEmpty(), "Recipe should be saved in the repository.");
    }

    // Negativen test: Poskus dodajanja nepopolnega recepta
    @Test
    void testAddRecipeWithMissingIngredients() {
            // Ustvarite recept z manjkajočimi sestavinami
            Recipes incompleteRecipe = new Recipes(null, FoodType.BAKERY, "Test Ingredients", "Test Instructions", null);
    
            // Poskusimo dodati recept, vendar bi morali ob tej situaciji pričakovati napako (nepopoln podatek).
            Assertions.assertThrows(Exception.class, () -> {
                controller.addRecipe(incompleteRecipe);
            }, "Adding a recipe with missing ingredients should throw an exception.");
    }

    // Pozitiven test: Preverjanje vseh receptov
    @Test
    void testGetAllRecipes() {
        repo.save(recipe);         // Shrani recept v bazo
        List<Recipes> recipes = controller.getAllRecipes(null);     // Pokličemo metodo za pridobitev vseh receptov
        // Preverimo, da se seznam receptov vrne z enim receptom
        Assertions.assertEquals(1, recipes.size(), "Should return one recipe.");
    }

    // Negativen test: Preverjanje, ko ni receptov
    @Test
    void testGetAllRecipesNoData() {
        // Preverimo, da je seznam receptov prazen, ker nismo dodali nobenega recepta
        List<Recipes> recipes = controller.getAllRecipes(null);
        Assertions.assertTrue(recipes.isEmpty(), "Should return an empty list when no recipes are available.");
    }

    @Test
    void testGetMeals() {
        // Arrange
        recipe.setFoodType(FoodType.MEAL);
        repo.save(recipe);

        List<Recipes> meals = controller.getMeals();

        Assertions.assertEquals(1, meals.size(), "Should return one meal.");
    }

    @Test
    void testGetMeals_NoMealsSaved() {
     List<Recipes> meals = controller.getMeals();
     Assertions.assertTrue(meals.isEmpty(), "Should return an empty list when no meals are saved.");
 }

    @Test
    void testDeleteRecipe() {
        Recipes savedRecipe = repo.save(recipe);
        controller.deleteRecipe(savedRecipe.getId());

        // Ensure the recipe is deleted
        Assertions.assertFalse(repo.findById(savedRecipe.getId()).isPresent(), "Recipe should be deleted.");
    }

    @Test
    void testDeleteRecipe_RecipeNotFound() {
        // Arrange
        Long nonExistentId = 999L; // Assuming this ID doesn't exist in the database
        controller.deleteRecipe(nonExistentId);
        Assertions.assertFalse(repo.findById(nonExistentId).isPresent(), "Recipe should not exist after attempting to delete a non-existent recipe.");
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

    @Test
   void testUpdateRecipe_NoChangesSaved() {
    Recipes recipeToUpdate = new Recipes("Original Recipe", FoodType.MEAL, "Ingredients", "Instructions", "image_path.jpg");
    Recipes savedRecipe = repo.save(recipeToUpdate);  // Shrani recept
    Long recipeId = savedRecipe.getId();
    
    // Poskušaj posodobiti recept z napačnimi podatki (prazno ime)
    Recipes updatedRecipe = new Recipes("", FoodType.BAKERY, "Updated Ingredients", "Updated Instructions", "updated_image_path.jpg");
    ResponseEntity<String> response = controller.updateRecipes(recipeId, updatedRecipe);
    Assertions.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode(), "Invalid data should return BAD_REQUEST.");
    
    // Preverimo, da recept ni bil posodobljen (ime ostane nespremenjeno)
    Recipes foundRecipe = repo.findById(recipeId).orElse(null);
    Assertions.assertNotNull(foundRecipe, "Recipe should exist after update attempt.");
    Assertions.assertEquals("Original Recipe", foundRecipe.getName(), "Recipe name should not have changed.");
}

}
