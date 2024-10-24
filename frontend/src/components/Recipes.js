import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/recipes.module.css';

const Recipes = () => {
    const [recipeData, setRecipeData] = useState({
        name: '',
        ingredients: '',
        instructions: '',
        type: '',
        image: null,
    });

    const [successMessage, setSuccessMessage] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRecipeData({
            ...recipeData,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        setRecipeData({
            ...recipeData,
            image: e.target.files[0],
        });
    };

    const addRecipe = async () => {
        const formData = new FormData();

        const adjustedRecipeData = {
            name: recipeData.name,
            ingredients: recipeData.ingredients,
            instructions: recipeData.instructions,
            type: recipeData.type,
            imagePath: recipeData.image ? recipeData.image.name : '',
        };

        formData.append('data', JSON.stringify(adjustedRecipeData));
        if (recipeData.image) {
            formData.append('image', recipeData.image);
        }

        try {
            const response = await axios.post('http://localhost:8080/recipes/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            window.location.href = "/meals";

            console.log(response.data);
            setSuccessMessage(true);

           
            localStorage.setItem('newRecipeAdded', 'true');
        } catch (error) {
            console.error('Error adding recipe:', error.response.data);
            setSuccessMessage(false);
        }
    };

    return (
        <div className={styles.recipeBody}>
            <div className={styles.header}>Add Your Recipe</div>

            <div className={styles.Recipescontainer}>
                <h2>Submit a New Recipe</h2>
                <div className={styles.recipe}>
                    <form id="recipeTypeForm">
                        <label htmlFor="type">Select Recipe Type:</label>
                        <select
                            id="type"
                            name="type"
                            value={recipeData.type}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="" disabled>Select a category</option>
                            <option value="Meal">Meal</option>
                            <option value="Dessert">Dessert</option>
                            <option value="Bakery">Bakery</option>
                        </select>
                    </form>
                </div>

                <form id="recipeForm" onSubmit={(e) => { e.preventDefault(); addRecipe(); }}>
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

                    <label htmlFor="ingredients">Ingredients:</label>
                    <textarea
                        id="ingredients"
                        name="ingredients"
                        value={recipeData.ingredients}
                        onChange={handleInputChange}
                        rows="5"
                        placeholder="List the ingredients required"
                        required
                    />

                    <label htmlFor="instructions">Description:</label>
                    <textarea
                        id="instructions"
                        name="instructions"
                        value={recipeData.instructions}
                        onChange={handleInputChange}
                        rows="7"
                        placeholder="Write about the meal"
                        required
                    />

                    <label htmlFor="image">Image:</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />

                    <button type="submit" className={styles.addBtn}>
                        Add Recipe
                    </button>
                </form>

                {successMessage && (
                    <div className={`${styles.successMessage} ${styles.active}`}>
                        Recipe Added Successfully!
                    </div>
                )}
            </div>
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

export default Recipes;
