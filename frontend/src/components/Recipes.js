
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/recipes.module.css';

const Recipes = () => {
const [recipeData, setRecipeData] = useState({
name: '',
ingredients: '',
        protein: '',
        carbohydrates: '',
        fats: '',
calories: '',
instructions: '',
        foodType: '', // Enum value will be set here
image: null,
});

const [successMessage, setSuccessMessage] = useState(false);
const [errorMessage, setErrorMessage] = useState('');
const [loading, setLoading] = useState(false);

// Handle input field changes
const handleInputChange = (e) => {
const { name, value } = e.target;
setRecipeData({
...recipeData,
[name]: value,
});
};

const handleImageChange = (e) => {
const file = e.target.files[0];
if (file) {
            console.log('File selected:', file); // Debugging line
            console.log('File selected:', file);
setRecipeData({
...recipeData,
                image: file, // Assign the file to the state

});
}
};
    

const navigate = useNavigate();

// Add Recipe
const addRecipe = async (e) => {
e.preventDefault();

const formData = new FormData();
        const { foodType, name, ingredients, protein, carbohydrates, fats, calories, instructions, image } = recipeData;

        formData.append('data', JSON.stringify({ foodType, name, ingredients, protein, carbohydrates, fats, calories, instructions }));
if (image) formData.append('image', image);

try {
setLoading(true);
const response = await axios.post('http://localhost:8080/recipes/add', formData, {
headers: {
'Content-Type': 'multipart/form-data',
},
});

if (response.status === 200) {
console.log('Recipe added:', response.data);
                navigate('/meals'); // Redirect to /meals on success
                setSuccessMessage(true);  // Set success message after successful submission
                setTimeout(() => setSuccessMessage(false), 3000);  // Hide success message after 3 seconds
                navigate('/meals');
}
} catch (error) {
console.error('Error adding recipe:', error);
setErrorMessage('Failed to add recipe. Please try again.');
setTimeout(() => setErrorMessage(''), 3000); // Hide error message after 3 seconds
} finally {
setLoading(false);
}
};


return (
<div className={styles.recipeBody}>
<div className={styles.header}>Add Your Recipe</div>

<div className={styles.Recipescontainer}>
<h2>Submit a New Recipe</h2>

                {/* Recipe Type Dropdown */}
<form id="recipeForm" onSubmit={addRecipe}>
                    {/* Recipe Type Dropdown */}
<label htmlFor="foodType">Select Recipe Type:</label>
<select
id="foodType"
name="foodType"
value={recipeData.foodType}
onChange={handleInputChange}
required
>
<option value="" disabled>
Select a category
</option>
<option value="MEAL">Meal</option>
<option value="DESSERT">Dessert</option>
<option value="BAKERY">Bakery</option>
</select>

{/* Recipe Name */}
<label htmlFor="name">Name:</label>
<input
type="text"
id="name"
name="name"
value={recipeData.name}
onChange={handleInputChange}
placeholder="Enter the name of the meal"
required
/>

{/* Ingredients */}
<label htmlFor="ingredients">Ingredients:</label>
<textarea
id="ingredients"
name="ingredients"
value={recipeData.ingredients}
onChange={handleInputChange}
rows="10"
placeholder="List the ingredients required"
required
/>

                    {/* Proteins */}
                    <label htmlFor="protein">Protein (g):</label>
                    <input
                        type="number"
                        id="protein"
                        name="protein"
                        value={recipeData.protein}
                        onChange={handleInputChange}
                        placeholder="Enter protein content"
                        required
                    />

                    {/* Carbohydrates */}
                    <label htmlFor="carbohydrates">Carbohydrates (g):</label>
                    <input
                        type="number"
                        id="carbohydrates"
                        name="carbohydrates"
                        value={recipeData.carbohydrates}
                        onChange={handleInputChange}
                        placeholder="Enter carbohydrate content"
                        required
                    />

                    {/* Fats */}
                    <label htmlFor="fats">Fats (g):</label>
                    <input
                        type="number"
                        id="fats"
                        name="fats"
                        value={recipeData.fats}
                        onChange={handleInputChange}
                        placeholder="Enter fats content"
                        required
                    />

{/* Calories */}
                    
                    <label htmlFor="calories">Calories (kcal):</label>
<input
  type="number"
  id="calories"
  name="calories"
  value={recipeData.calories}
  onChange={handleInputChange}
  placeholder="Enter calorie content"
  required
/>

                    
{/* Instructions */}
<label htmlFor="instructions">Instructions:</label>
<textarea
id="instructions"
name="instructions"
value={recipeData.instructions}
onChange={handleInputChange}
rows="7"
placeholder="Write about the meal"
required
/>

{/* Image Upload */}
<label htmlFor="image">Image:</label>
<input
type="file"
id="image"
name="image"
accept="image/*"
onChange={handleImageChange}
/>

{/* Submit Button */}
<button type="submit" className={styles.addBtn} disabled={loading}>
{loading ? 'Adding Recipe...' : 'Add Recipe'}
</button>
</form>

{/* Success Message */}
{successMessage && (
<div className={`${styles.successMessage} ${styles.active}`}>
Recipe Added Successfully!
</div>
)}

{/* Error Message */}
{errorMessage && (
<div className={`${styles.errorMessage} ${styles.active}`}>
{errorMessage}
</div>
)}
</div>

{/* Footer */}
<footer className={styles.readmoreFooterDark}>
<div className={`container ${styles.container}`}>
<div className="row">
<div className={`col-sm-6 col-md-3 ${styles.item}`}>
<h3>Services</h3>
<ul>
<li><a href="web.html">Web Design</a></li>
<li><a href="development.html">Development</a></li>
<li><a href="hosting.html">Hosting</a></li>
</ul>
</div>
<div className={`col-sm-6 col-md-3 ${styles.item}`}>
<h3>About</h3>
<ul>
<li><a href="company.html">Company</a></li>
<li><a href="team.html">Team</a></li>
<li><a href="careers.html">Careers</a></li>
</ul>
</div>
<div className={`col-md-6 ${styles.item} ${styles.readmoreText}`}>
<h3>Recipes</h3>
<p>Discover the joy of cooking with our vast collection of homemade recipes.</p>
</div>
</div>
<div className={styles.readmoreSocial}>
<a href="a"><i className="icon ion-social-facebook"></i></a>
<a href="b"><i className="icon ion-social-twitter"></i></a>
<a href="v"><i className="icon ion-social-snapchat"></i></a>
<a href="g"><i className="icon ion-social-instagram"></i></a>
</div>
<p className={styles.readmoreCopyright}>
Recipes © 2024
</p>
</div>
</footer>
</div>
);
};

export default Recipes;