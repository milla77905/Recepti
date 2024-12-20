package com.example.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Version;

@Entity
public class Recipes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    private FoodType foodType;

    @Column(columnDefinition = "TEXT")
    private String ingredients;

    @Column(columnDefinition = "TEXT")
    private String instructions;


    private String imagePath; 

    @Version  
    private int version;

    private int  portion; 

    private double calories; // Celotne kalorije za eno porcijo
    private double protein; // Proteini (grami na porcijo)
    private double fats; // Maščobe (grami na porcijo)
    private double carbohydrates; // Ogljikovi hidrati (grami na porcijo)
    
    public double getCalories() {
        return calories;
    }
    public void setCalories(double calories) {
        this.calories = calories;
    }
    public double getProtein() {
        return protein;
    }
    public void setProtein(double protein) {
        this.protein = protein;
    }
    public double getFats() {
        return fats;
    }
    public void setFats(double fats) {
        this.fats = fats;
    }
    public double getCarbohydrates() {
        return carbohydrates;
    }
    public void setCarbohydrates(double carbohydrates) {
        this.carbohydrates = carbohydrates;
    }
    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { 
        if (id != null && id < 0) {
            throw new IllegalArgumentException("ID cannot be negative");
        }
        this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { 
        if (name == null || name.trim().isEmpty()) {   
            throw new IllegalArgumentException("Name cannot be null or empty");
        }
        this.name = name; }

    public FoodType getFoodType() { return foodType; }
    public void setFoodType(FoodType foodType) { 
        if (foodType == null) {
            throw new IllegalArgumentException("Food type cannot be null");
        }
        this.foodType = foodType; }

    public String getIngredients() { return ingredients; }
    public void setIngredients(String ingredients) { 
        if (ingredients == null || ingredients.trim().isEmpty()) {     
            throw new IllegalArgumentException("Ingredients cannot be null or empty");
        }
        this.ingredients = ingredients; }

        
    public String getInstructions() { return instructions; }
    public void setInstructions(String instructions) { 
        if (instructions == null || instructions.trim().isEmpty()) {  
            throw new IllegalArgumentException("Instructions cannot be null or empty");
        }
        this.instructions = instructions; }
    
        
    public int getPortion() { return portion; }
    public void setPortion(int portion) { this.portion = portion; }

    
    public String getImagePath() { return imagePath; }
    public void setImagePath(String imagePath) { 
        if (imagePath == null || imagePath.trim().isEmpty()) {   
            throw new IllegalArgumentException("Image path cannot be null or empty");
        }
        this.imagePath = imagePath; }

    public Recipes() {}
    public Recipes(String name, FoodType foodType, String ingredients, String instructions, String imagePath, int portion, double calories, double protein, double fats, double carbohydrates) {
        this.name = name;
        this.foodType = foodType;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.imagePath = imagePath;
        this.portion = portion;
        this.calories = calories;
        this.protein = protein;
        this.fats = fats;
        this.carbohydrates = carbohydrates;
    }
}