package com.example.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.Recipes;

@Repository
public interface RecipesRepo extends JpaRepository<Recipes, Long> {
    Optional<Recipes> findTopByOrderByIdDesc();
}
