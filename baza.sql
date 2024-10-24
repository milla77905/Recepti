USE ris;

CREATE TABLE users (
   name VARCHAR(255) NOT NULL,
   email VARCHAR(255) NOT NULL,
   password VARCHAR(255) NOT NULL
);

CREATE TABLE recipes (
   id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
   image_path VARCHAR(255) NOT NULL,
   ingredients VARCHAR(255) NOT NULL,
   instructions VARCHAR(255) NOT NULL,
   name VARCHAR(255) NOT NULL,
   type VARCHAR(255) NOT NULL
);

INSERT INTO users (name, email, password) VALUES
('mila', 'mila@gmail.com', 'mila');

INSERT INTO recipes (id, image_path, ingredients, instructions, name, type)
VALUES ('1', 'pizza.jpg', 'Mozzarella cheese (shredded or fresh)
Tomato sauce or crushed tomatoes.
Pepperoni slices.Sliced bell peppers (green, red, yellow)
Sliced onions (red or yellow)
Mushrooms (sliced)
Fresh basil leaves.', 'Pizza, dish of Italian origin consisting of a 
flattened disk of bread dough topped 
with some combination of olive oil, oregano, tomato, 
olives, mozzarella or other cheese..', 'pizza','meal');


