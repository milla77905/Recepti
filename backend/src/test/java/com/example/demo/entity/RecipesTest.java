package com.example.demo.entity;

import com.example.entity.FoodType;
import com.example.entity.Recipes;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class RecipesTest {

    static private Recipes recipe;

    @BeforeAll
    static void setUp() {
        recipe = new Recipes();
    }

    @Test
    void testSetId() {
        Long id = 1L;
        recipe.setId(id);
        Assertions.assertEquals(id, recipe.getId(), "setId() should set the ID correctly");
    }

    @Test
    void testSetName() {
        String name = "Chocolate Cake";
        recipe.setName(name);
        Assertions.assertEquals(name, recipe.getName(), "setName() should set the name correctly");
    }

    @Test
    void testSetFoodType() {
        FoodType foodType = FoodType.BAKERY;
        recipe.setFoodType(foodType);
        Assertions.assertEquals(foodType, recipe.getFoodType(), "setFoodType() should set the FoodType correctly");
    }

    @Test
    void testSetIngredients() {
        String ingredients = "Flour, Sugar, Eggs";
        recipe.setIngredients(ingredients);
        Assertions.assertEquals(ingredients, recipe.getIngredients(), "setIngredients() should set the ingredients correctly");
    }

    @Test
    void testSetInstructions() {
        String instructions = "Mix ingredients and bake at 350°F for 30 minutes";
        recipe.setInstructions(instructions);
        Assertions.assertEquals(instructions, recipe.getInstructions(), "setInstructions() should set the instructions correctly");
    }

    @Test
    void testSetImagePath() {
        String imagePath = "/images/cake.jpg";
        recipe.setImagePath(imagePath);
        Assertions.assertEquals(imagePath, recipe.getImagePath(), "setImagePath() should set the image path correctly");
    }
}
