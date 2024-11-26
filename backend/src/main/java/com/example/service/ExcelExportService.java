package com.example.service;

import java.io.OutputStream;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.entity.Recipes;


@Service
public class ExcelExportService {

    private final RecipeService recipeService;
    private final ExcelFileGenerator excelFileGenerator;

    public ExcelExportService(RecipeService recipeService, ExcelFileGenerator excelFileGenerator) {
        this.recipeService = recipeService;
        this.excelFileGenerator = excelFileGenerator;
    }

    public void exportRecipesToExcel(List<Long> recipeIds, OutputStream outputStream) throws Exception {
        List<Recipes> recipes = recipeService.getRecipesByIds(recipeIds);
        excelFileGenerator.generateExcelFile(recipes, outputStream);
    }
}
