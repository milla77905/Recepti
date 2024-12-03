# Test Description and Performance Analysis
## Test Description / Mila Nastoska
### 1. **Positive Test: Retrieving Meals**
- **What it tests:** Ensures that the controller retrieves recipes categorized as meals.
- **Why it's important:** Verifies proper filtering by food type.
### 2. **Negative Test: Retrieving Meals When None Are Available**
- **What it tests:** Confirms that the controller returns an empty list when no meals are saved.
- **Why it's important:** Ensures the controller handles an empty filter query correctly.
### 3. **Positive Test: Deleting a Recipe**
- **What it tests:** Verifies that a recipe is removed from the repository after a delete operation.
- **Why it's important:** Confirms correct implementation of the delete functionality.
### 4. **Negative Test: Deleting a Non-Existent Recipe**
- **What it tests:** Ensures that deleting a recipe that doesn’t exist does not affect the repository.
- **Why it's important:** Validates the robustness of the delete operation.
### 5. **Positive Test: Updating a Recipe**
- **What it tests:** Confirms that an existing recipe is correctly updated with new data.
- **Why it's important:** Verifies that updates to recipes are handled correctly.
### 6. **Negative Test: Updating a Recipe with Invalid Data**
- **What it tests:** Ensures that updating a recipe with invalid data (e.g., empty name) returns a `BAD_REQUEST` status and does not save changes.
- **Why it's important:** Prevents saving incomplete or invalid updates.
---
## Performance Analysis
### Identified Issues:
1. **Incorrect Filtering for Meals:**
   - **Issue:** The `getMeals` method initially returned incorrect results when no meals were present.
   - **Solution:** Updated the query to correctly filter and return only meals.
2. **Robustness of Deletion:**
   - **Issue:** Deleting non-existent recipes did not handle the case gracefully.
   - **Solution:** Ensured that the delete method checks the recipe's existence before attempting the operation.
3. **Update Method Error Handling:**
   - **Issue:** Invalid updates were saved, causing data corruption.
   - **Solution:** Added proper error handling and status code responses for invalid updates.
## Test Description / Eleonora Stankovska
### 1. **Positive Test: Adding a Recipe**
- **What it tests:** Verifies that a valid recipe is successfully saved in the repository.
- **Why it's important:** Ensures the core functionality of adding recipes works correctly.
### 2. **Negative Test: Adding a Recipe with Missing Data**
- **What it tests:** Checks that the controller throws an exception when attempting to add an incomplete recipe (e.g., missing ingredients).
- **Why it's important:** Ensures data validation and prevents invalid recipes from being saved.
### 3. **Positive Test: Retrieving All Recipes**
- **What it tests:** Confirms that the controller retrieves all saved recipes from the repository.
- **Why it's important:** Ensures users can view the list of recipes.
### 4. **Negative Test: Retrieving Recipes When None Are Available**
- **What it tests:** Validates that the controller returns an empty list when no recipes are saved.
- **Why it's important:** Ensures correct handling of an empty dataset.
### 5. **Positive Test: Exporting Recipes to Excel**
- **What it tests:** Verifies that recipes are successfully exported to an Excel file without errors.
- **Why it's important:** Ensures that the service can generate Excel files containing valid recipe data, which is a core feature for users requiring data export functionality.
### 6. **Negative Test: Exporting Without Recipes**
- **What it tests:** Ensures that exporting an empty list of recipes produces a valid but empty Excel file.
- **Why it's important:** Confirms that the service handles edge cases gracefully, such as when no data is available for export.
---
## Performance Analysis
### Identified Issues:
1. **Validation for Incomplete Data:**
   - **Issue:** Adding or updating recipes with incomplete data was initially allowed.
   - **Solution:** Introduced validation to enforce completeness (e.g., non-empty name and valid ingredients).
2. **Empty Data Handling:**
   - **Issue:** The service initially lacked clear handling for empty recipe lists, potentially leading to ambiguous behavior.
   - **Solution:** Ensured the service generates an empty Excel file with appropriate structure (a single empty sheet).


## Test Description / Miha Govedič

### 1. **Positive Test: `setId()`**
- **What it tests:** Ensures that the `setId()` method sets the recipe ID correctly.
- **Why it's important:** Confirms that IDs can be properly assigned.

### 2. **Negative Test: `setId()` with Negative Value**
- **What it tests:** Ensures that attempting to set a negative ID throws an `IllegalArgumentException`.
- **Why it's important:** Verifies that invalid IDs are rejected to maintain data integrity.

### 3. **Positive Test: `setName()`**
- **What it tests:** Validates that the `setName()` method sets the recipe name correctly.
- **Why it's important:** Ensures proper assignment of names.

### 4. **Negative Test: `setName()` with Empty Value**
- **What it tests:** Ensures that setting an empty name throws an `IllegalArgumentException`.
- **Why it's important:** Confirms that invalid names are not accepted.

### 5. **Positive Test: `setFoodType()`**
- **What it tests:** Verifies that the `setFoodType()` method assigns the food type correctly.
- **Why it's important:** Ensures proper categorization of recipes.

### 6. **Negative Test: `setFoodType()` with Null Value**
- **What it tests:** Ensures that setting a `null` food type throws an `IllegalArgumentException`.
- **Why it's important:** Prevents invalid categorization.

### 7. **Positive Test: `setIngredients()`**
- **What it tests:** Validates that the `setIngredients()` method sets the ingredients correctly.
- **Why it's important:** Confirms that recipes can have valid ingredient lists.

### 8. **Negative Test: `setIngredients()` with Empty Value**
- **What it tests:** Ensures that an empty ingredients list throws an `IllegalArgumentException`.
- **Why it's important:** Ensures valid ingredient information is always provided.

### 9. **Positive Test: `setInstructions()`**
- **What it tests:** Verifies that the `setInstructions()` method sets the instructions correctly.
- **Why it's important:** Ensures proper assignment of preparation instructions.

### 10. **Negative Test: `setInstructions()` with Empty Value**
- **What it tests:** Ensures that empty instructions throw an `IllegalArgumentException`.
- **Why it's important:** Prevents incomplete instructions from being saved.

### 11. **Positive Test: `setImagePath()`**
- **What it tests:** Confirms that the `setImagePath()` method sets the image path correctly.
- **Why it's important:** Ensures valid image paths are stored for recipes.

### 12. **Negative Test: `setImagePath()` with Empty Value**
- **What it tests:** Verifies that setting an empty image path throws an `IllegalArgumentException`.
- **Why it's important:** Prevents invalid or missing image paths.

---

## Performance Analysis
### Identified Issues
1. **Input Validation:**
   - **Initial Issue:** The setters did not validate inputs like empty strings or null values.
   - **Solution:** Validation logic was added to all relevant setters, and corresponding tests were implemented to confirm the changes.

2. **Negative ID Handling:**
   - **Initial Issue:** Negative IDs were previously allowed.
   - **Solution:** Implemented validation to throw an `IllegalArgumentException` for negative IDs.

3. **Empty Name, Ingredients, Instructions, or Image Path:**
   - **Initial Issue:** Empty values for critical fields could be set, leading to incomplete recipes.
   - **Solution:** Added validation to ensure these fields are non-empty.

4. **Null `FoodType`:**
   - **Initial Issue:** `FoodType` could be set to null, breaking category-based operations.
   - **Solution:** Null checks were added, and appropriate tests were created.