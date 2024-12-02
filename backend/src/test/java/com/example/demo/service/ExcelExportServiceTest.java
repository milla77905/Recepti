package com.example.demo.service;

import java.io.ByteArrayOutputStream;
import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.entity.FoodType;
import com.example.entity.Recipes;
import com.example.repository.RecipesRepo;
import com.example.service.ExcelExportService;

@SpringBootTest
class ExcelExportServiceTest {

    @Autowired
    private ExcelExportService exportService;

    @Autowired
    private RecipesRepo repo;

    @Test
    void testExportRecipesToExcel() {
        // Arrange
        final Recipes savedRecipe = repo.save(new Recipes("Export Recipe", FoodType.MEAL, "Ingredients", "Instructions", null));
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        // Act & Assert
        Assertions.assertDoesNotThrow(() -> {
            exportService.exportRecipesToExcel(List.of(savedRecipe.getId()), outputStream);
        }, "Exporting recipes should not throw any exceptions.");

        // Validate the output
        Assertions.assertTrue(outputStream.size() > 0, "Exported Excel file should contain data.");
    }
}
