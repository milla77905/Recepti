import React from 'react';
import styles from '../styles/readmore.module.css';  
import image6 from '../styles/img/image6.jpg';
import image1 from '../styles/img/image1.jpg';
import image11 from '../styles/img/image11.jpg';
import image7 from '../styles/img/image7.jpg';

function Readmore() {
  return (
    <div>
      <div className={styles.readmoreHeader}>
        <a href="/recipes" className={styles.readmoreReceipts}>Add recipes</a>
        <a href="/meals" className={styles.readmoreAdded}>Recipes</a>

        <div className={styles.readmoreHeaderContent}>
          <div className={styles.readmoreFoodImage}>
            <img src={image6} alt="FoodImage" />
          </div>
          <div className={styles.readmoreInfo}>
            <h1>Delicious Recipes</h1>
            <p>Explore a collection of tasty and easy-to-make recipes.</p>
          </div>
        </div>
      </div>

      <div className={styles.readmoreDescriptionBox}>
        <h2>Why Homemade?</h2>
        <p>
          Cooking at home allows you to experiment with flavors, control ingredients, 
          and create dishes that cater to your preferences. Enjoy the satisfaction of 
          creating delicious meals from scratch, and share them with family and friends.
        </p>
      </div>

      <div className={styles.readmoreCardsContainer}>
          <div className={styles.readmoreCard}>
            <div className={styles.icon}><img src={image1} alt="Meals" /></div>
            <p>Meals</p>
          </div>

        <div className={styles.readmoreCard}>
          <div className={styles.icon}><img src={image7} alt="Desserts" /></div>
          <p>Desserts</p>
        </div>

        <div className={styles.readmoreCard}>
          <div className={styles.icon}><img src={image11} alt="Bakery" /></div>
          <p>Bakery</p>
        </div>
      </div>

      
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
}

export default Readmore;
