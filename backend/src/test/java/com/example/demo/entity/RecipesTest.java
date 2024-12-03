package com.example.demo.entity;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.entity.FoodType;
import com.example.entity.Recipes;

@SpringBootTest
public class RecipesTest {

    static private Recipes recipe;

    // Inicializacija recepta pred začetkom vseh testov
    @BeforeAll
    static void setUp() {
        recipe = new Recipes(); // Ustvarimo nov objekt Recipes pred testiranjem
    }

    // Pozitiven test za setId() - Preverimo, ali se ID pravilno nastavi
    @Test
    void testSetId() {
        Long id = 1L;
        recipe.setId(id); // Nastavimo ID v objektu recipe
        // Preverimo, če je ID pravilno nastavljena
        Assertions.assertEquals(id, recipe.getId(), "setId() should set the ID correctly");
    }

    // Negativen test za setId() - negativni ID
    @Test
    void testSetIdNegative() {
        Long id = -1L; 
        // Očakujemo, da bo metodi throwan IllegalArgumentException, ker je ID negativen
        Assertions.assertThrows(IllegalArgumentException.class, () -> recipe.setId(id), 
        "setId() should throw an IllegalArgumentException when trying to set a negative ID");
    }

    // Pozitiven test za setName() - Preverimo, ali se ime pravilno nastavi
    @Test
    void testSetName() {
        String name = "Chocolate Cake";
        recipe.setName(name);
        // Preverimo, če je ime pravilno nastavljeno
        Assertions.assertEquals(name, recipe.getName(), "setName() should set the name correctly");
    }

    // Negativen test za setName() - prazno ime
    @Test
    void testSetNameEmpty() {
        String name = "";  
        // Očakujemo, da bo metodi throwan IllegalArgumentException, ker ime ne sme biti prazno
        Assertions.assertThrows(IllegalArgumentException.class, () -> recipe.setName(name), 
                "setName() should throw an IllegalArgumentException when trying to set an empty name");
    }

    // Pozitiven test za setFoodType() - Preverimo, ali se tip hrane pravilno nastavi
    @Test
    void testSetFoodType() {
        FoodType foodType = FoodType.BAKERY;
        recipe.setFoodType(foodType);
        // Preverimo, če je tip hrane pravilno nastavljen
        Assertions.assertEquals(foodType, recipe.getFoodType(), "setFoodType() should set the FoodType correctly");
    }

    // Negativen test za setFoodType() - foodType null
    @Test
    void testSetFoodTypeNull() {
        FoodType foodType = null; 
        // Očakujemo, da bo metodi throwan IllegalArgumentException, ker foodType ne sme biti null
        Assertions.assertThrows(IllegalArgumentException.class, () -> recipe.setFoodType(foodType),
                "setFoodType() should throw an IllegalArgumentException when trying to set a null foodType");
    }

    // Pozitiven test za setIngredients() - Preverimo, ali so sestavine pravilno nastavljene
    @Test
    void testSetIngredients() {
        String ingredients = "Flour, Sugar, Eggs";
        recipe.setIngredients(ingredients);
        // Preverimo, če so sestavine pravilno nastavljene
        Assertions.assertEquals(ingredients, recipe.getIngredients(), "setIngredients() should set the ingredients correctly");
    }

     // Negativen test za setIngredients() - sestavine prazne
    @Test
    void testSetIngredientsEmpty() {
        String ingredients = "";  
        // Očakujemo, da bo metodi throwan IllegalArgumentException, ker sestavine ne smejo biti prazne
        Assertions.assertThrows(IllegalArgumentException.class, () -> recipe.setIngredients(ingredients),
                "setIngredients() should throw an IllegalArgumentException when ingredients are empty");
    }


    // Pozitiven test za setInstructions() - Preverimo, ali so navodila pravilno nastavljena
    @Test
    void testSetInstructions() {
        String instructions = "Mix ingredients and bake at 350°F for 30 minutes";
        recipe.setInstructions(instructions);
        // Preverimo, če so navodila pravilno nastavljena
        Assertions.assertEquals(instructions, recipe.getInstructions(), "setInstructions() should set the instructions correctly");
    }

    // Negativen test za setInstructions() - navodila prazna
    @Test
    void testSetInstructionsEmpty() {
        String instructions = "";  
        // Očakujemo, da bo metodi throwan IllegalArgumentException, ker navodila ne smejo biti prazna
        Assertions.assertThrows(IllegalArgumentException.class, () -> recipe.setInstructions(instructions),
                "setInstructions() should throw an IllegalArgumentException when instructions are empty");
    }

    // Pozitiven test za setImagePath() - Preverimo, ali je pot do slike pravilno nastavljena
    @Test
    void testSetImagePath() {
        String imagePath = "/images/cake.jpg";
        recipe.setImagePath(imagePath);
        // Preverimo, če je pot do slike pravilno nastavljena
        Assertions.assertEquals(imagePath, recipe.getImagePath(), "setImagePath() should set the image path correctly");
    }

    // Negativen test za setImagePath() - pot do slike prazen
    @Test
    void testSetImagePathEmpty() {
        String imagePath = ""; 
        // Očakujemo, da bo metodi throwan IllegalArgumentException, ker pot do slike ne sme biti prazna
        Assertions.assertThrows(IllegalArgumentException.class, () -> recipe.setImagePath(imagePath),
                "setImagePath() should throw an IllegalArgumentException when imagePath is empty");
    }
}
