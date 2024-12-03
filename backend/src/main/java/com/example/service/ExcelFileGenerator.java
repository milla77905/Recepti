package com.example.service;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;

import com.example.entity.Recipes;

@Component
public class ExcelFileGenerator {

    public void generateExcelFile(List<Recipes> recipes, OutputStream outputStream) throws Exception {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Recipes");

        // Ustvarite glavo
        Row headerRow = sheet.createRow(0);
        String[] columns = {"ID", "Name", "Type", "Instructions", "Ingredients"};
        for (int i = 0; i < columns.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(columns[i]);
        }

        // Dodajte vrstice z recepti
        int rowIdx = 1;
        for (Recipes recipe : recipes) {
            Row row = sheet.createRow(rowIdx++);
            row.createCell(0).setCellValue(recipe.getId());
            row.createCell(1).setCellValue(recipe.getName());
            row.createCell(2).setCellValue(recipe.getFoodType().name());
            row.createCell(3).setCellValue(recipe.getInstructions());
            row.createCell(4).setCellValue(String.join(", ", recipe.getIngredients()));
            row.createCell(5).setCellValue(recipe.getImagePath());
        }

        // Zapišite podatke v outputStream
        workbook.write(outputStream);
        workbook.close();
    }

     public void generateEmptyExcelFile(OutputStream outputStream) throws IOException {
        // Create an empty Excel file with one sheet and no rows
        try (XSSFWorkbook workbook = new XSSFWorkbook()) {
            workbook.createSheet("Recipes");
            workbook.write(outputStream); // Write the empty workbook to the output stream
        }
    }
}