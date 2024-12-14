import React, { useEffect, useState } from 'react';
import styles from '../styles/meals.module.css';
import * as XLSX from 'xlsx'; 

const Meals = () => {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [selectedRecipes, setSelectedRecipes] = useState([]); // Store selected recipes
    const [sortOrder, setSortOrder] = useState('type');
    const [portionValues, setPortionValues] = useState({}); 
    const [showDetails, setShowDetails] = useState({}); // Sledi stanju prikaza/skritja za vsak recept


    useEffect(() => {
        fetchAllRecipes();
    }, []);

    const fetchAllRecipes = async () => {
        try {
            const response = await fetch('http://localhost:8080/recipes'); // Backend endpoint
            if (!response.ok) {
                throw new Error('Failed to fetch recipes.');
            }
            const data = await response.json();

            // Map data to include full URL for imagePath
            const updatedData = data.map((recipe) => ({
                ...recipe,
                imagePath: recipe.imagePath ? `http://localhost:8080${recipe.imagePath}` : '', // Append backend URL if imagePath exists
                type: recipe.foodType,
                portion: recipe.portion || 1, // Map "foodType" to "type" for UI use
            }));

            setRecipes(updatedData);
        } catch (error) {
            console.error('Error fetching recipes:', error);
            alert(`Error: ${error.message}`);
        }
    };
    
    const handleToggleDetails = (id) => {
        setShowDetails((prev) => ({
            ...prev,
            [id]: !prev[id], // Preklopi stanje za določen recept
        }));
    };
    

    // Handle selection of recipes (checkbox)
    const handleSelectRecipe = (id) => {
        setSelectedRecipes((prev) =>
            prev.includes(id) ? prev.filter((recipeId) => recipeId !== id) : [...prev, id]
        );
    };

    // Update recipe
    const handleUpdate = async (id) => {
        try {
            // Prepare the updated recipe data
            const updatedRecipe = {
                id,
                name: selectedRecipe.name,
                foodType: selectedRecipe.type, 
                ingredients: selectedRecipe.ingredients,
                calories: selectedRecipe.calories,
                protein: selectedRecipe.protein,
                fats: selectedRecipe.fats,
                carbohydrates: selectedRecipe.carbohydrates,
                instructions: selectedRecipe.instructions,
                imagePath: selectedRecipe.imagePath,
            };

            const response = await fetch(`http://localhost:8080/recipes/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedRecipe),
            });

            if (response.ok) {
                const updatedData = await response.json();
                setRecipes((prevRecipes) =>
                    prevRecipes.map((recipe) => (recipe.id === id ? updatedData : recipe))
                );
                alert('Recipe updated successfully.');
                setSelectedRecipe(null); // Close the modal
            } else {
                alert('Failed to update the recipe. Please try again.');
            }
        } catch (error) {
            console.error('Error updating recipe:', error);
            alert('An error occurred while updating the recipe.');
        }
    };

    // Handle recipe deletion
    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this recipe?');
        if (confirmed) {
            try {
                const response = await fetch(`http://localhost:8080/recipes/delete/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    setRecipes((prevRecipes) => prevRecipes.filter(recipe => recipe.id !== id));
                    alert('Recipe deleted successfully.');
                } else {
                    alert('Failed to delete the recipe. Please try again.');
                }
            } catch (error) {
                console.error('Failed to delete recipe', error);
                alert('An error occurred while deleting the recipe.');
            }
        }
    };

    // Handle recipe selection (clicking "Select")
    const handleSelect = (recipe) => {
        setSelectedRecipe(recipe);
    };

    const handleExportToExcel = () => {
        const selectedData = recipes.filter((recipe) => selectedRecipes.includes(recipe.id));
        if (selectedData.length === 0) {
            alert('Please select at least one recipe to export.');
            return;
        }

        const worksheet = XLSX.utils.json_to_sheet(selectedData.map((recipe) => ({
            Name: recipe.name,
            Type: recipe.foodType,
            Ingredients: recipe.ingredients,
            Calories: recipe.calories,
            Protein: recipe.protein,
            Fats: recipe.fats,
            Carbohydrates: recipe.carbohydrates,
            Instructions: recipe.instructions,
            Image_Path: recipe.imagePath, 
        })));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Recipes');
        XLSX.writeFile(workbook, 'Selected_Recipes.xlsx');
    };

    // Sort recipes by type or name
    const sortRecipes = (recipes, order) => {
        const typeOrder = {
            MEAL: 1,
            BAKERY: 2,
            DESSERT: 3,
        };

        return recipes.sort((a, b) => {
            if (order === 'type') {
                const typeA = typeOrder[a.type?.toUpperCase()] || 4;
                const typeB = typeOrder[b.type?.toUpperCase()] || 4;

                if (typeA === typeB) {
                    return a.name.localeCompare(b.name);
                }
                return typeA - typeB;
            } else if (order === 'name') {
                return a.name.localeCompare(b.name);
            }
            return recipes;
        });
    };

    const handlePortionInputChange = (recipeId, value) => {
        setPortionValues((prev) => ({
            ...prev,
            [recipeId]: value,
        }));
    };
    
    
    const handlePortionChange = async (recipeId) => {
        const portionCount = parseInt(portionValues[recipeId], 10) || 1;

        try {
            const response = await fetch(
                `http://localhost:8080/recipes/update-portion?recipeId=${recipeId}&portionCount=${portionCount}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Backend Error: ${errorMessage}`);
            }

            const updatedData = await response.json(); // Expecting both ingredients and calories

            const { updatedIngredients, updatedCalories, updatedProtein, updatedFats, updatedCarbohydrates } = updatedData;

            // Update recipes state with the new portion data
            setRecipes((prevRecipes) =>
                prevRecipes.map((recipe) =>
                    recipe.id === recipeId
                        ? {
                            ...recipe,
                            portion: portionCount,
                            ingredients: updatedIngredients,
                            calories: updatedCalories,
                            protein: updatedProtein,
                            fats: updatedFats,
                            carbohydrates: updatedCarbohydrates,
                        }
                        : recipe
                )
            );

            alert('Portion updated successfully!');
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to update portion!');
        }
    };

    const dailyGoals = {
        calories: 2000, 
        protein: 50,   
        fats: 70,       
        carbohydrates: 300 
    };
    const calculateDailyPercentage = (recipe) => {
    
        const percentage = {
            calories: (recipe.calories  / dailyGoals.calories) * 100,
            protein: (recipe.protein  / dailyGoals.protein) * 100,
            fats: (recipe.fats  / dailyGoals.fats) * 100,
            carbohydrates: (recipe.carbohydrates  / dailyGoals.carbohydrates) * 100
        };
    
        return percentage;
    };
    
    
    

    const sortedRecipes = sortRecipes([...recipes], sortOrder);
    return (
        <div>
            <div className={styles.Mealsheader}>
                <a href="/readmore" className={styles.logo}>Home</a>
                <a href="/recipes" className={styles.receipts}>Add recipes</a>
            </div>
            <div className="container">
                <div style={{ marginLeft: 450 }}>
                    <label htmlFor="sortOrder">Sort By:</label>
                    <select id="sortOrder" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                        <option value="type">Type (Bakery, Desserts, Meals)</option>
                        <option value="name">Name (A-Z)</option>
                    </select>
                </div>
                <div className="row">
                    {sortedRecipes.map((recipe) => (
                        <div className="col-md-4" key={recipe.id}>
                            <div className={styles.mealCard}>
                                <input
                                    type="checkbox"
                                    checked={selectedRecipes.includes(recipe.id)}
                                    onChange={() => handleSelectRecipe(recipe.id)}
                                    className={styles.recipeCheckbox}
                                />
                                
                                {/* Display image */}
                                {recipe.imagePath ? (
                                  <img
                                  src={recipe.imagePath || '/meal1.jpg'} 
                                  alt={recipe.name}
                                  className="img-fluid"
                                  style={{ height: '220px', width: '100%' }}
                                  onError={(e) => { e.target.src = '/meal1.jpg'; }} 
                              />
                              
                                ) : (
                                    <p>No Image</p>
                                )}

                                <h6>{recipe.type}</h6>
                                <h4>{recipe.name}</h4>
                                <h5>Instructions:</h5>
                                <p>{recipe.instructions}</p>
                                <h5>Ingredients:</h5>
                                <ul className={styles.ingredients}>
                                    {recipe.ingredients.split(',').map((ingredient, index) => (
                                        <li key={index}>{ingredient}</li>
                                    ))}
                                </ul>
 
                                <button
                                className={styles.toggleButton}
                                 onClick={() => handleToggleDetails(recipe.id)}
                                  >
                                 {showDetails[recipe.id] ? 'Show Less' : 'Show More'}
                                 </button>
                                 
                                {/* Skrite podrobnosti - Calories in gumbi */}
                                {showDetails[recipe.id] && (
                                 <>
                                <h5>Nutritional values:</h5>
                                <p>Proteins: {recipe.protein}g</p>
                                <p>Fats: {recipe.fats}g</p>
                                <p>Carbohydrates: {recipe.carbohydrates}g</p>
                                <p>Calories: {recipe.calories} kcal</p>

                                {/* Add daily nutritional goals percentage */}
        <h5>Daily Nutritional Goals:</h5>
        <p>Calories: {calculateDailyPercentage(recipe).calories.toFixed(2)}%</p>
        <p>Protein: {calculateDailyPercentage(recipe).protein.toFixed(2)}%</p>
        <p>Fats: {calculateDailyPercentage(recipe).fats.toFixed(2)}%</p>
        <p>Carbohydrates: {calculateDailyPercentage(recipe).carbohydrates.toFixed(2)}%</p>

                                <div>
                                        <h6><strong>Portion:</strong></h6>
                                        <input
                                            className={styles.updatePortionInput}
                                            type="number"
                                            value={portionValues[recipe.id] || recipe.portion} // Use the recipe's portion value if not set
                                            min="1"
                                            onChange={(e) => handlePortionInputChange(recipe.id, e.target.value)}
                                        />
                                        <button
                                            onClick={() => handlePortionChange(recipe.id)}
                                            className={styles.updatePortionButton}
                                        >
                                            Update Portion
                                        </button>
                                    </div>
                <button
                className={styles.selectButton}
                    onClick={() => handleSelect(recipe)}
                    >
                    Select
                    </button>
                    <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(recipe.id)}
                            >
                     Delete
                     </button>
                     </>
                    )}
                     </div>
                    </div>
                    ))}
                </div>
            </div>

            <button onClick={handleExportToExcel} className={styles.exportButton}>
                    Export Selected to Excel
                </button>

            {selectedRecipe && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h2>Update Recipe</h2>
                        <label>
                            Type:
                            <select
                                value={selectedRecipe?.foodType || ''}
                                onChange={(e) =>
                                    setSelectedRecipe({ ...selectedRecipe, foodType: e.target.value })
                                }
                            >
                                <option value="" disabled>Select Type</option>
                                <option value="MEAL">Meal</option>
                                <option value="BAKERY">Bakery</option>
                                <option value="DESSERT">Dessert</option>
                            </select>
                        </label>
                        <label>
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={selectedRecipe.name}
                                onChange={(e) => setSelectedRecipe({ ...selectedRecipe, name: e.target.value })}
                            />
                        </label>
                        <label>
                            Description:
                            <input
                                type="text"
                                name="instructions"
                                value={selectedRecipe.instructions}
                                onChange={(e) => setSelectedRecipe({ ...selectedRecipe, instructions: e.target.value })}
                            />
                        </label>
                        <label>
                            Ingredients:
                            <input
                                type="text"
                                name="ingredients"
                                value={selectedRecipe.ingredients}
                                onChange={(e) => setSelectedRecipe({ ...selectedRecipe, ingredients: e.target.value })}
                            />
                        </label>
                        <label>
                            Calories:
                            <input
                                type="text"
                                name="calories"
                                value={selectedRecipe.calories}
                                onChange={(e) => setSelectedRecipe({ ...selectedRecipe, calories: e.target.value })}
                            />
                        </label>
                        <label>
                            Image Path:
                            <input
                                type="text"
                                name="imagePath"
                                value={selectedRecipe.imagePath}
                                onChange={(e) => setSelectedRecipe({ ...selectedRecipe, imagePath: e.target.value })}
                            />
                        </label>
                        <button onClick={() => handleUpdate(selectedRecipe.id)}>Save Changes</button>
                        <button onClick={() => setSelectedRecipe(null)}>Cancel</button>
                    </div>
                </div>
            )}

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

export default Meals;