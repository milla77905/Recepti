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