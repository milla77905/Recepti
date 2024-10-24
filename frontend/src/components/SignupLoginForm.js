import React, { useState } from 'react';
import styles from '../styles/signup.module.css'; 
import axios from "axios";

const SignupLoginForm = () => {
    
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
});

const handleChange = (e) => {
  setRegister({
    ...register,
    [e.target.name]:e.target.value
  })

}

const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(register);

    try{
        const response = await axios.post('http://localhost:8080/addUser', register);
        console.log(response.data);
        alert("User added successfully");

        window.location.href = "/readmore";

   } catch(error){
    console.log(error);

   }
   
}

const redirectToLogin = () => {
  window.location.href = "/login";
}

  return (
    <div className={styles.backgroundWrapper}>
      <div className={styles.signupContainer}>
        <h2 className={styles.signupHeader}>Signup</h2>
        <form className={styles.signupForm} onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Userame"
            value={register.name}
            onChange={handleChange}
            required
            className={styles.signupInput}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={register.email}
            onChange={handleChange}
            required
            className={styles.signupInput}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={register.password}
            onChange={handleChange}
            required
            className={styles.signupInput}
          />
          <div className={styles.loginRedirect}>
            <span className={styles.loginText}>Already have an account?</span>
            <button type="button" className={styles.loginButton} onClick={redirectToLogin}>Log In</button>
          </div>
          <button type="submit" className={styles.signupButton}>Signup</button>
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

export default SignupLoginForm;
