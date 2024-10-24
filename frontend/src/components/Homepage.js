
import React from 'react';
import styles from '../styles/homepage.module.css'; 

function Homepage() {
  return (

    <div className={`${styles['homepage-background']}`}>
      <div className={`${styles['homepage-overlay']}`}></div> 
      <div className={`${styles['homepage-content']} container`}>
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <h1>Home food with family recipes</h1>
            <p>Pasta, pizza, and much more</p>
            <a href="signup" className="btn btn-primary">READ MORE</a>
          </div>
        </div>
      </div>
    </div>
  );
}  

export default Homepage;
