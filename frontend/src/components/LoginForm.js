import React, { useState } from 'react';
import styles from '../styles/login.module.css'; 
import axios from "axios";

const LoginForm = () => {
  const [password, setPasswordValue] = useState("");
    const [userEmail, setUserEmailValue] = useState("");

    const setPassword = (e) => {
        setPasswordValue(e.target.value);
    }

    const setUserEmail = (e) => {
        setUserEmailValue(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log("this is our data "+ userEmail +"   "+ password )
        
        const data = {
            "userEmail": userEmail,    // i know it's confusing, but the backend is actually expecting an email, not the user id or user name
            "password": password
        }

        try{
            const response = await axios.post("http://localhost:8080/loginUser", data);

            console.log("this is the response " + response.data);
            if(!response.data) {
                alert("Invalid User Id or Password");
            }
            else {
                //alert("Login Successfull");   // commented because: we do not want app interuptions if there are no exceptions

                window.location.href = "/readmore";

            }
            
        } catch(error) {
            console.error(error);
        }

    }

  return (
    <div className={styles.loginbackgroundWrapper}>
      <div className={styles.loginContainer}>
        <h2 className={styles.loginHeader}>Log In</h2>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={userEmail}
            onChange={setUserEmail}
            required
            className={styles.loginInput}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={setPassword}
            required
            className={styles.loginInput}
          />
          <button type="submit" className={styles.loginButton}>Log In</button>
        </form>
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

export default LoginForm;
