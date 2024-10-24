import React, { useEffect, useState } from 'react';
import styles from '../styles/meals.module.css';

const Meals = () => {
    const [recipes, setRecipes] = useState([]); 
    const [selectedRecipe, setSelectedRecipe] = useState(null); 
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        ingredients: '',
        instructions: '',
        imagePath: ''
    });
    const [sortOrder, setSortOrder] = useState('type'); 

    useEffect(() => {
        fetchAllRecipes();
    }, []);

    
    const fetchAllRecipes = async () => {
        try {
            const response = await fetch('http://localhost:8080/recipes');
            if (!response.ok) {
                throw new Error('Failed to fetch recipes');
            }
            const data = await response.json();
            setRecipes(data); 
        } catch (error) {
            console.error(error);
        }
    };

    
    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this recipe?');
        if (confirmed) {
            try {
                const response = await fetch(`http://localhost:8080/recipes/delete/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.ok) {
                    setRecipes((prevRecipes) => prevRecipes.filter(recipe => recipe.id !== id));
                    alert("Recipe deleted successfully.");
                } else {
                    alert("Failed to delete the recipe. Please try again.");
                }
            } catch (error) {
                console.error('Failed to delete recipe', error);
                alert("An error occurred while deleting the recipe. Please check console for details.");
            }
        }
    };

   
    const handleSelect = (recipe) => {
        setSelectedRecipe(recipe);
        setFormData({
            name: recipe.name,
            description: recipe.description,
            ingredients: recipe.ingredients,
            instructions: recipe.instructions,
            imagePath: recipe.imagePath
        });
    };


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    
    const handleUpdate = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/recipes/updateRecipes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Recipe updated successfully.");
                fetchAllRecipes(); 
                setSelectedRecipe(null); 
            } else {
                alert("Failed to update the recipe. Please try again.");
            }
        } catch (error) {
            console.error('Failed to update recipe', error);
            alert("An error occurred while updating the recipe. Please check console for details.");
        }
    };

    
    const sortRecipes = (recipes, order) => {
        const typeOrder = {
            meals: 1,
            bakery: 2,
            desserts: 3,
        };

        return recipes.sort((a, b) => {
            if (order === 'type') {
                const typeA = typeOrder[a.type.toLowerCase()] || 4; 
                const typeB = typeOrder[b.type.toLowerCase()] || 4; 
                
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

   
    const sortedRecipes = sortRecipes([...recipes], sortOrder);

    return (
        <div>
            <div className={styles.Mealsheader}>
                <a href="/readmore" className={styles.logo}>Home</a>
                <a href="/recipes" className={styles.receipts}>Add recipes</a>
            </div>
            <div className="container">
                
                <label htmlFor="sortOrder">Sort By:</label>
                <select id="sortOrder" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="type">Type (Bakery, Desserts, Meals)</option>
                    <option value="name">Name (A-Z)</option>
                </select>
                
                <div className="row">
                    {sortedRecipes.map((recipe) => (
                        <div className="col-md-4" key={recipe.id}>
                            <div className={styles.mealCard}>
                                <img
                                    src={`http://localhost:8080/uploads/${recipe.imagePath}`}
                                    alt={recipe.name}
                                    className="img-fluid"
                                    style={{ height: '220px' }}
                                />
                                <h6>{recipe.type}</h6>
                                <h4>{recipe.name}</h4>
                                <h5>Description:</h5>
                                <p>{recipe.instructions}</p>
                                <h5>Ingredients:</h5>
                                <ul className={styles.ingredients}>
                                    {recipe.ingredients.split(',').map((ingredient, index) => (
                                        <li key={index}>{ingredient}</li>
                                    ))}
                                </ul>
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
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            {selectedRecipe && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h2>Update Recipe</h2>
                        <label>
                            Type:
                            <input
                                type="text"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Description:
                            <input
                                type="text"
                                name="instructions"
                                value={formData.instructions}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Ingredients:
                            <input
                                type="text"
                                name="ingredients"
                                value={formData.ingredients}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Image Path:
                            <input
                                type="text"
                                name="imagePath"
                                value={formData.imagePath}
                                onChange={handleChange}
                            />
                        </label>
                        <button onClick={() => handleUpdate(selectedRecipe.id)}>Save Changes</button>
                        <button onClick={() => setSelectedRecipe(null)}>Cancel</button>
                    </div>
                </div>
            )}

<footer className= {styles.readmoreFooterDark}>
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
              <p>
                Discover the joy of cooking with our vast collection of homemade recipes. 
                Start your culinary journey today!
              </p>
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
