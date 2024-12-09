package com.example.controller;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.entity.FoodType;
import com.example.entity.Recipes;
import com.example.repository.RecipesRepo;
import com.example.service.ExcelExportService;
import com.example.service.RecipeService;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@CrossOrigin(origins = "http://localhost:3000") 
@RestController
@RequestMapping("/recipes")
public class RecipeController {

    @Autowired
    private RecipeService recipeService;
   
    @PostMapping("/add")
    public ResponseEntity<String> addRecipe(
            @RequestPart("data") String recipeRequestString,
            @RequestPart(value = "image", required = false) MultipartFile imageFile) {
        try {
            System.out.println(recipeRequestString);
            // Deserialize JSON string into Recipes object
            ObjectMapper objectMapper = new ObjectMapper();
            Recipes recipe = objectMapper.readValue(recipeRequestString, Recipes.class);
            recipe.setPortion(1);

            // Validate required fields
            if (recipe.getName() == null || recipe.getName().isEmpty()) {
                return ResponseEntity.badRequest().body("Name is required");
            }

            // Handle image file upload
            if (imageFile != null && !imageFile.isEmpty()) {
                String imagePath = saveImageFile(imageFile);
                recipe.setImagePath(imagePath); // Save image path in the recipe object
            }

            // Save recipe in the database
            recipeService.addRecipe(recipe);

            return ResponseEntity.ok("Recipe and image uploaded successfully!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error saving the recipe or image: " + e.getMessage());
        }
    }

    // Helper method to save the uploaded image file
private String saveImageFile(MultipartFile file) throws Exception {
    String uploadDir = "uploads/images/"; // Directory relative to project root
    Path uploadPath = Paths.get(uploadDir);

    // Create directory if it doesn't exist
    if (!Files.exists(uploadPath)) {
        Files.createDirectories(uploadPath);
    }

    // Generate a unique filename to avoid conflicts
    String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
    Path filePath = uploadPath.resolve(fileName);

    // Save the file to the directory
    Files.write(filePath, file.getBytes());

    return "/uploads/images/" + fileName; 
}

    
    @GetMapping
    public List<Recipes> getAllRecipes(HttpServletRequest request) {
        if (request != null) {
            System.out.println("Request URL: " + request.getRequestURL());
        }
                return recipeService.findAll();
    }
    
    @PostMapping
    public ResponseEntity<String> addRecipe(@RequestBody Recipes recipe) {
        recipeService.saveRecipe(recipe);
        return ResponseEntity.ok("Recipe saved successfully!");
    }

    @GetMapping("/meals")
    public List<Recipes> getMeals() {
        return recipeService.getRecipesByFoodType(FoodType.MEAL);
    }


@DeleteMapping("/delete/{id}")
    public String deleteRecipe(@PathVariable Long id) {
         return recipeService.deleteRecipe(id);
    }

    
@Autowired
    private RecipesRepo recipesRepository;

    @PutMapping(path = "/updateRecipes/{id}")
   public @ResponseBody ResponseEntity<String> updateRecipes(@PathVariable Long id, @RequestBody Recipes updatedRecipe) {
    // Find the existing recipe by ID
    Optional<Recipes> existingRecipeOpt = recipesRepository.findById(id);

    // Check if the recipe exists
    if (!existingRecipeOpt.isPresent()) {
        return ResponseEntity.status(404).body("Recipe not found with ID: " + id);
    }

    // Validate the updated recipe data (e.g., check for empty name)
    if (updatedRecipe.getName() == null || updatedRecipe.getName().isEmpty()) {
        // Returning BAD_REQUEST for invalid data
        return ResponseEntity.status(400).body("Invalid recipe name, it cannot be empty.");
    }

    // Update the existing recipe
    Recipes existingRecipe = existingRecipeOpt.get();
    existingRecipe.setName(updatedRecipe.getName());
    existingRecipe.setFoodType(updatedRecipe.getFoodType());
    existingRecipe.setIngredients(updatedRecipe.getIngredients());
    existingRecipe.setInstructions(updatedRecipe.getInstructions());

    // Optional: Update the image path if provided
    if (updatedRecipe.getImagePath() != null && !updatedRecipe.getImagePath().isEmpty()) {
        existingRecipe.setImagePath(updatedRecipe.getImagePath());
    }

    // Save the updated recipe to the database
    recipesRepository.save(existingRecipe);

    // Return success response
    return ResponseEntity.ok("Updated");
}


     private final ExcelExportService excelExportService;
    public RecipeController(ExcelExportService excelExportService) {
        this.excelExportService = excelExportService;
    }
    @GetMapping("/export")
    public void exportRecipesToExcel(@RequestParam List<Long> recipeIds, HttpServletResponse response) throws Exception {
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", "attachment; filename=recipes.xlsx");

        excelExportService.exportRecipesToExcel(recipeIds, response.getOutputStream());
        response.getOutputStream().flush();
    }

    @GetMapping("/portion")
    public ResponseEntity<String> changePortion(@RequestParam Long recipeId, @RequestParam int portionCount) {
        Recipes recipe = recipesRepository.findById(recipeId).get();
//        Recipes recipe = new Recipes("Name", FoodType.MEAL, "1 tbs of sugar 2 kg of flower", "mix ingredientes", "", 1);
        System.out.println(recipe);
        return ResponseEntity.ok(increaseNumbers(recipe.getIngredients(), portionCount));
    }

    public static String increaseNumbers(String input, int factor) {
        StringBuilder result = new StringBuilder();
        StringBuilder numberBuffer = new StringBuilder();

        // Iterate over each character in the input string
        for (char c : input.toCharArray()) {
            if (Character.isDigit(c)) {
                numberBuffer.append(c); // Collect digits into the buffer
            } else {
                if (numberBuffer.length() > 0) {
                    int number = Integer.parseInt(numberBuffer.toString());
                    result.append(number * factor); // Multiply and append the number
                    numberBuffer.setLength(0); // Clear the buffer
                }
                result.append(c); // Append non-digit characters
            }
        }
        // Process any remaining number in the buffer
        if (numberBuffer.length() > 0) {
            int number = Integer.parseInt(numberBuffer.toString());
            result.append(number * factor);
        }
        return result.toString();
    }


}
