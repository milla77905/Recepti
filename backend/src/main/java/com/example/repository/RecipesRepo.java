package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.FoodType;
import com.example.entity.Recipes;

@Repository
public interface RecipesRepo extends JpaRepository<Recipes, Long> {
    List<Recipes> findByFoodType(FoodType foodType);
}
