# Use Case Glossary

## Use Case: Login


| **ID:** 01  | **Use Case:** Login   |                                                                                          |
|--------------|--------|------------------------------------------------------------------------------------------|
| **Goal**     | Allow the user to access the system                                                                |
| **Actors**   | Registered User                                                                                    |
| **Preconditions** | The user must be registered in the system                                                    |
| **System State After Use Case** | The user is logged in and has access to the system's functionalities          |
| **Scenario** | 1. The user enters their login credentials (email and password). <br> 2. The system verifies the login credentials. <br> 3. If the credentials are correct, the system logs the user in. <br> 4. The user accesses the main page of the system. |
| **Alternative Flows** | If the credentials are incorrect, the system displays an error and prompts the user to re-enter the credentials. |
| **Exceptions** | The system is unavailable due to technical issues.                                               |

## Use Case: Registration

| **ID:** 02   | **Use Case:** Registration |                                                                                           |
|--------------------|--------|-------------------------------------------------------------------------------------------|
| **Goal**           | Allow new users to create an account                                                               |
| **Actors**         | New User                                                                                           |
| **Preconditions**  | /                                                                                                  |
| **System State After Use Case** | The user is registered in the system and has access to the login functionality        |
| **Scenario**       | 1. The user selects the registration option. <br> 2. The user enters the required information (username, password, email). <br> 3. The system checks if the user's email is already in use. <br> 4. If the email is available, the system creates a new account and notifies the user of a successful registration. |
| **Alternative Flows** | If the email is taken, the system displays a message and prompts the user to choose a different email. |
| **Exceptions**     | The system is unavailable due to technical issues.                                                  |

## Use Case: Add Recipe

| **ID:** 03   | **Use Case:** Add Recipe |                                                                                  |
|----------------------|--------|---------------------------------------------------------------------------------------------|
| **Goal**             | Allow the user to add a new recipe to the system                                             |
| **Actors**           | Registered User                                                                                |
| **Preconditions**    | The user must be logged in                                                                     |
| **System State After Use Case** | The new recipe is saved in the system                                                   |
| **Scenario**         | 1. The user selects the option to add a recipe. <br> 2. The user enters the recipe details (title, ingredients, instructions, etc.). <br> 3. The user confirms the addition. <br> 4. The system saves the recipe and notifies the user of a successful addition. |
| **Alternative Flows** | If required fields are missing, the system displays a notification and prompts the user to complete the information. |
| **Exceptions**       | An error occurs while saving to the database.                                                  |

## Use Case: View Recipes

| **ID:** 04     | **Use Case:** View Recipes |                                                                                             |
|----------------------|--------|---------------------------------------------------------------------------------------------|
| **Goal**             | Allow the user to view recipes                                                                 |
| **Actors**           | Registered User                                                                                |
| **Preconditions**    | The user must be logged in                                                                     |
| **System State After Use Case** | The system remains unchanged                                                            |
| **Scenario**         | 1. The user selects the option to view recipes. <br> 2. The system displays a list of recipes. |
| **Alternative Flows** | If no recipes are saved, the system displays a notification that no recipes are available. |
| **Exceptions**       | The system is unable to connect to the database.                                               |


## Use Case: Edit Recipes

| **ID:** 05      | **Use Case:** Edit Recipes |                                                                                          |
|----------------------|--------|---------------------------------------------------------------------------------------------|
| **Goal**             | Allow the user to edit existing recipes                                                       |
| **Actors**           | Registered User                                                                                |
| **Preconditions**    | The user must be logged in and must have existing recipes                                      |
| **System State After Use Case** | The system updates the recipe data                                                      |
| **Scenario**         | 1. The user selects a recipe to edit. <br> 2. The user changes the recipe data. <br> 3. The user confirms the changes. <br> 4. The system updates the recipe and notifies the user of the successful update. |
| **Alternative Flows** | If the user cancels editing, no changes are saved.                                             |
| **Exceptions**       | An error occurs while updating the database.                                                  |


## Use Case: Delete Recipes

| **ID:** 06        | **Use Case:** Delete Recipes |                                                                                             |
|----------------------|--------|---------------------------------------------------------------------------------------------|
| **Goal**             | Allow the user to delete recipes                                                               |
| **Actors**           | Registered User                                                                                |
| **Preconditions**    | The user must be logged in and must have existing recipes                                      |
| **System State After Use Case** | The selected recipes are removed from the system                                      |
| **Scenario**         | 1. The user selects a recipe to delete. <br> 2. The system displays a confirmation for deletion. <br> 3. The user confirms the deletion. <br> 4. The system deletes the recipe and notifies the user of the successful deletion. |
| **Alternative Flows** | If the user cancels the deletion, the recipe remains unchanged.                               |
| **Exceptions**       | An error occurs while deleting from the database.                                              |


## Use Case: Sort by Recipe Type 

| **ID:** 07     | **Use Case:** Sort by Recipe Type |                                                                                             |
|----------------------------|--------|---------------------------------------------------------------------------------------------|
| **Goal**                   | Allow the user to sort recipes by recipe type                                                |
| **Actors**                 | Registered User                                                                                |
| **Preconditions**          | The user must be logged in and must have recipes in the system                                |
| **System State After Use Case** | The system displays recipes sorted by the selected recipe type                            |
| **Scenario**               | 1. The user selects the option to sort by recipe type. <br> 2. The system displays recipes sorted by the chosen type. |
| **Alternative Flows**      | If there are no recipes of the selected type, the system displays a notification.             |
| **Exceptions**             | The system cannot filter data due to a technical error.                                      |


## Use Case: Sort Alphabetically

| **ID:** 08       | **ID:** 08**Use Case:** Sort Alphabetically |                                                                                             |
|----------------------------|--------|---------------------------------------------------------------------------------------------|
| **Goal**                   | Allow the user to sort recipes alphabetically                                                |
| **Actors**                 | Registered User                                                                                |
| **Preconditions**          | The user must be logged in and must have recipes in the system                                |
| **System State After Use Case** | The system displays recipes sorted alphabetically                                          |
| **Scenario**               | 1. The user selects the option to sort alphabetically. <br> 2. The system displays recipes sorted in alphabetical order. |
| **Alternative Flows**      | If there are no recipes, the system displays a notification.                                 |
| **Exceptions**             | The system cannot perform sorting due to a technical error.                                  |
