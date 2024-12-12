package com.example.demo.service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

import org.apache.poi.xssf.usermodel.XSSFWorkbook;
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

    // Pozitiven test: Preverjanje izvoza receptov v Excel
    @Test
    void testExportRecipesToExcel() {
        // Arrange: shranimo recept, ki ga bomo izvozili.
        final Recipes savedRecipe = repo.save(new Recipes("Export Recipe", FoodType.MEAL, "Ingredients", "Instructions", "default_image_path.jpg", 2, null));
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        // Act & Assert: Preverimo, da izvoza ne spremljajo napake.
        Assertions.assertDoesNotThrow(() -> {
            exportService.exportRecipesToExcel(List.of(savedRecipe.getId()), outputStream);
        }, "Exporting recipes should not throw any exceptions.");

        // Preverimo, da Excel datoteka vsebuje podatke.
        Assertions.assertTrue(outputStream.size() > 0, "Exported Excel file should contain data.");
    }

    // Negativen test: Poskus izvoza brez receptov
    @Test
    void testExportRecipesToExcelWithNoRecipes() {
    // Arrange: Ustvarimo prazen Excel file za izvoz
    ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

    // Act & Assert: Preverimo, da pri izvozu ne pride do napak
    Assertions.assertDoesNotThrow(() -> {
        exportService.exportRecipesToExcel(List.of(), outputStream); // No recipes for export
    }, "Exporting with no recipes should not throw an exception.");

    // Preverimo, da Excel datoteka ne vsebuje dejanskih podatkov (na primer, nobenih vrstic ali listov)
    try (XSSFWorkbook workbook = new XSSFWorkbook(new ByteArrayInputStream(outputStream.toByteArray()))) {
        Assertions.assertEquals(1, workbook.getNumberOfSheets(), "Expected one sheet in the empty export.");
        Assertions.assertEquals(0, workbook.getSheetAt(0).getPhysicalNumberOfRows(), "Expected no rows in the sheet.");
    } catch (IOException e) {
        e.printStackTrace();
    }
}

}
