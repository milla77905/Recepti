import React from 'react';
import styles from '../styles/modal.module.css';

const RecipeModal = ({ recipe, onClose }) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <span className={styles.closeButton} onClick={onClose}>&times;</span>
                <h2>{recipe.name}</h2>
                <img src={`http://localhost:8080/images/${recipe.imagePath}`} alt={recipe.imagePath} className={styles.modalImage} />
                <h5>Ingredients:</h5>
                <p>{recipe.ingredients}</p>
                <h5>Proteins:</h5>
<p>{recipe.proteins}</p>
<h5>Fats:</h5>
<p>{recipe.fats}</p>
<h5>Carbohydrates:</h5>
<p>{recipe.carbohydrates}</p>

                <h5>Calories:</h5>
                <p>{recipe.calories}</p>

                <h5>Instructions:</h5>
                <p>{recipe.instructions}</p>
            </div>
        </div>
    );
};

export default RecipeModal;