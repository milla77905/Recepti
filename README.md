# RIS PROJECT
The Recipes Application is a web-based platform designed for users to share and explore various recipes. Users can create an account, log in, and manage their own recipes, including adding photos, editing existing recipes, and deleting them when needed. 

# About project

## Main functionalities
- User Registration and Login: Users must first register by creating an account before they can add or view recipes.

- Recipe Management: Users can add new recipes with photos, modify existing recipes, and delete recipes if needed.

- Recipe Display: Users can browse a collection of recipes, view details about each recipe, and use them for cooking.

## Technology Stack

- Backend:
  - Framework: Spring Boot
  - Database: MySQL

- Frontend:
  - Framework: React

- Development Environment: Visual Studio Code (VS Code)

## Project structure

- backend/: Contains the Spring Boot project that handles user authentication, recipe management, and database interactions.

- frontend/: Contains the React app responsible for rendering the UI and interacting with the backend API.

- database: Holds the MySQL database configuration files.

- README.md: This file that contains documentation for developers.

## Required Apps

Before you begin, it's recommended to have the following applications and tools:

- **Java**
- **Spring Boot**
- **React**
- **Node.js**
- **Postman**
- **MySQL**


## Development environments

- Visual Studio Code (recommended IDE for frontend)
- IntelliJ IDEA (recommended IDE for backend)
- any other IDE


## Installation Instructions
- Clone the Repository

   - git clone https://github.com/milla77905/Recepti.git
   - cd recepti

## Install Backend Dependencies: 
- Use Maven to install the dependencies:

     - ./mvnw install

## Run the Backend: 
- Start the Spring Boot application:

     - ./mvnw spring-boot:run

## Frontend Setup (React)
 
   - cd frontend
   - npm install
   - npm start

## Access the Application
  
  - backend:
     - http://localhost:8080

  - frontend:
    - http://localhost:3000

## Coding Standards

- **Java:**
    - Follow standard Java naming conventions (camelCase for variables and methods, PascalCase for classes).
    - Ensure proper indentation and comment code where necessary.
    - Consider using tools like Checkstyle for enforcing coding standards.

- **React:**
    - Use functional components and hooks, and maintain a clear structure for your components.
    - Ensure that JSX is properly formatted.
    - Utilize PropTypes or TypeScript for type checking.


## Class Diagram
<p align="center">
  <img src="documentation/assets/relacijskiDijagram.jpg" alt="Class Diagram" width="1000px">
</p>

## Class Diagram Description

### Class: Users
|   |    |                                                                                          |
|--------------|--------|------------------------------------------------------------------------------------------|
| **Role** |  Represents the user entity with basic attributes: name, email, and password.          |
| **Methods** | - getName(), getEmail(), getPassword(): Return the corresponding attribute values. <br> - setName(), setEmail(), setPassword(): Set the values of the attributes. |
| **Purpose** | Stores user data for registration and login functionality. |
|   |    |                                                                                          |

### Class: UsersController
|   |    |                                                                                          |
|--------------|--------|------------------------------------------------------------------------------------------|
| **Role** |  Controller class that provides APIs for user-related actions.          |
| **Methods** | - addUser(Users user): Adds a new user. <br> - loginUser(LoginRequest loginRequest): Validates user login. |
| **Purpose** | Links user requests (e.g., registration and login) to the backend services. |
|   |    |                                                                                          |

### Class: UsersRepo
|   |    |                                                                                          |
|--------------|--------|------------------------------------------------------------------------------------------|
| **Role** |   Interface for the data layer, leveraging JPA to interact with the user entity.          |
| **Methods** | - Inherits methods from JpaRepository. |
| **Purpose** | Allows saving, retrieving, and managing user data in the database. |
|   |    |                                                                                          |

### Class: UserService
|   |    |                                                                                          |
|--------------|--------|------------------------------------------------------------------------------------------|
| **Role** |  Service layer class for user-related business logic.          |
| **Methods** | - addUser(Users user): Adds a new user by calling the repository to persist user data. <br> - loginUser(LoginRequest loginRequest): Validates user credentials against the data stored in the database. |
| **Purpose** | Encapsulates the business logic for handling user registration and login, ensuring the controller remains focused on handling API requests. |
|   |    |                                                                                          |


### Class: RecipeController
|   |    |                                                                                          |
|--------------|--------|------------------------------------------------------------------------------------------|
| **Role** |  Controller class for APIs related to recipes.          |
| **Methods** | - addRecipe(String recipeRequest, MultipartFile imageFile): Adds a new recipe with an optional image. <br> - getAllRecipes(): Retrieves a list of all recipes. <br> - getRecipe(Long id): Retrieves a specific recipe by ID. <br> - deleteRecipe(Long id): Deletes a recipe by ID. <br> - updateRecipes(Long id, Recipes updatedRecipe): Updates an existing recipe. <br> - exportRecipesToExcel(@RequestParam List<Long> recipeIds, HttpServletResponse response) - The endpoint for exporting recipes to an Excel file. |
| **Purpose** | Processes user requests and forwards them to appropriate services for recipe management. |
|   |    |                                                                                          |

### Class: RecipeService
|   |    |                                                                                          |
|--------------|--------|------------------------------------------------------------------------------------------|
| **Role** |  Contains the business logic for managing recipes.          |
| **Methods** | - addRecipe(Recipes recipe, MultipartFile imageFile): Handles the logic for adding a new recipe. <br> - getAllRecipes(): Retrieves all recipes from the database. <br> - getRecipe(Long id): Retrieves a specific recipe. <br> - saveImage(MultipartFile imageFile): Saves the recipe image. <br> - getRecipesByIds(List<Long> recipeIds): List<Recipes> - Fetches recipes from the repository by their IDs. |
| **Purpose** | Manages the data and logic for recipe operations. |
|   |    |                                                                                          |


### Class: Recipes
|   |    |                                                                                          |
|--------------|--------|------------------------------------------------------------------------------------------|
| **Role** |  Represents the recipe entity with attributes like name, ingredients, instructions, type, and image path.          |
| **Methods** | - getId(), getName(), getIngredients(), getInstructions(), getImagePath(): Return the corresponding attribute values. <br> - setId(), setName(), setIngredients(), setInstructions(), setImagePath(): Set the values of the attributes. |
| **Purpose** | Defines the data structure for recipes. |
|   |    |                                                                                          |


### Class: RecipesRepo
|   |    |                                                                                          |
|--------------|--------|------------------------------------------------------------------------------------------|
| **Role** |  Interface for the data layer to interact with the recipe entity.          |
| **Methods** | - findTopByOrderByIdDesc(): Finds the most recently added recipe. |
| **Purpose** | Enables interaction with the recipe database. |
|   |    |                                                                                          |


### Class: JpaRepository<T, ID>
|   |    |                                                                                          |
|--------------|--------|------------------------------------------------------------------------------------------|
| **Role** |  Generic Spring Data JPA interface that provides CRUD operations for entities.          |
| **Purpose** | Acts as a base interface for UsersRepo and RecipesRepo, enabling database operations without requiring custom query definitions. |
|   |    |                                                                                          |

### Key Methods for Functionality
|   |    |                                                                                          |
|--------------|--------|------------------------------------------------------------------------------------------|
| **addUser() (UsersController, UserService)** |  Registers a new user by validating and saving their data. |
| **loginUser() (UsersController, UserService)** | Authenticates a user by checking credentials against stored data. |
| **addRecipe() (RecipeController, RecipeService)** |  Handles the logic for adding recipes and their images.          |
| **getAllRecipes() (RecipeController, RecipeService)** |  Fetches a list of all recipes. |
| **fetchAllRecipesForExport() (ExcelExportService)** |  Fetches a list of selected recipes. |
| **exportRecipesToExcel() (ExcelExportService)** |  Export a list of selected recipes into an excel file. |
| **generateExcelFile() (ExcelFileGenerator)** |  Generate excel file and insert a list of selected recipes. |
|   |    |                                                                                          |


### Class: ExcelExportService
|   |    |                                                                                          |
|--------------|--------|------------------------------------------------------------------------------------------|
| **Role** |  Acts as an intermediary service that retrieves recipe data and delegates the Excel file generation to the ExcelFileGenerator. It ensures that the process of exporting recipes to Excel is handled smoothly.          |
| **Methods** | - exportRecipesToExcel(List<Long> recipeIds, OutputStream outputStream): Exports selected recipes to an Excel file. <br> - fetchAllRecipesForExport(): Retrieves all recipes if "Export All" is selected. |
| **Purpose** | Provides the functionality to generate an Excel file containing selected recipes. It acts as a bridge between the controller (handling user requests) and the logic for generating Excel files. |
|   |    |    

### Class: ExcelFileGenerator
|   |    |                                                                                          |
|--------------|--------|------------------------------------------------------------------------------------------|
| **Role** |  Handles the low-level details of creating and formatting the Excel file. It uses libraries like Apache POI to create sheets, rows, and cells for the data.          |
| **Methods** | - generateExcelFile(List<Recipes> recipes, OutputStream outputStream): Generates an Excel file and writes it to the given output stream. <br> - formatRecipeRow(Recipes recipe): Formats a single recipe as a row in the Excel sheet. |
| **Purpose** | Encapsulates the logic of creating and formatting an Excel file from the recipe data. It ensures that the data is properly structured and displayed in the Excel file. |
|   |    |  

### How can the user use the new functionality?
- selection of recipes that he wants to export to an Excel file
- clicking on the Export to Excel button
- an Excel file is downloaded where the user will be able to see the selected recipes

## Testing Directory
The project now includes a dedicated testing directory located at documentation/testiranja/, which contains unit tests to ensure the reliability and correctness of the application's backend functionalities.

### Structure of the Testing Directory
- **src/test/java/:** Contains all unit test classes organized in packages corresponding to the application's main modules.
- **testiranja/porocilo_testiranja.md:** A markdown document that provides a summary of the testing process, including:
  - Description of the implemented tests.
  - Names of the contributors and their responsibilities.
  - Analysis of test results, including any bugs found and resolved during the testing phase.

### Key Features of the Tests
- **Coverage:**
The tests cover critical functionalities, including:
  - User registration and login.
  - Recipe management (add, delete, update recipes).
  - Exporting recipes to Excel.
- **Scenarios Tested:**
  - **Positive Scenarios:** Verify that the application behaves as expected under normal conditions.
  - **Negative Scenarios:** Test how the application handles invalid inputs or unexpected situations.

### How to Run the Tests
- **Backend Tests:**
Navigate to the backend directory and execute the tests using Maven:
  - **./mvnw test**
- **Viewing Results:**
The results will be displayed in the terminal and saved in the target/surefire-reports/ directory.

### Test Report
All details regarding the tests and their results are documented in the porocilo_testiranja.md file in the testiranje/ folder. This report highlights:
  - The success rate of tests.
  - Any identified issues and their resolutions.
  - Contributor roles and responsibilities.


 ## License

    Recipes® ©2024 All rights reserved
