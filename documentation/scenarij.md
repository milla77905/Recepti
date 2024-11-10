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

| **ID:** 08       | **Use Case:** Sort     Alphabetically |                                                                                             |
|----------------------------|--------|---------------------------------------------------------------------------------------------|
| **Goal**                   | Allow the user to sort recipes alphabetically                                                |
| **Actors**                 | Registered User                                                                                |
| **Preconditions**          | The user must be logged in and must have recipes in the system                                |
| **System State After Use Case** | The system displays recipes sorted alphabetically                                          |
| **Scenario**               | 1. The user selects the option to sort alphabetically. <br> 2. The system displays recipes sorted in alphabetical order. |
| **Alternative Flows**      | If there are no recipes, the system displays a notification.                                 |
| **Exceptions**             | The system cannot perform sorting due to a technical error.                                  |


## Use Case: Export Recipes to Excel

| **ID:** 09                     | **Use Case:** Export to Excel file    |
|--------------------------------|---------------------------------------|
| **Use Case:**                  | Export Recipes to Excel               |
| **Goal:**                      | Allow the user to export recipes to an Excel file for offline use |
| **Actors:**                    | Registered User                       |
| **Preconditions:**             | The user must be logged in and have recipes in the system |
| **System State After Use Case:** | The system generates and downloads an Excel file containing the selected recipes |
| **Scenario:**                  | 1. The user selects the option to export recipes to an Excel file. <br> 2. The system prompts the user to choose specific recipes or all recipes for export. <br> 3. The user selects the recipes to export and confirms. <br> 4. The system generates an Excel file with the selected recipes. <br> 5. The system initiates the download of the Excel file for the user. |
| **Alternative Flows:**         | If no recipes are available to export, the system displays a notification. |
| **Exceptions:**                | If the system encounters an error generating the Excel file, it displays an error message and prompts the user to try again later. |

## Use Case: Choose Recipes to Export to Excel

| **ID:** 10                     |  **Use Case:** Select specific recipes   |
|--------------------------------|---------------------------------------|
| **Use Case:**                  | Choose Recipes to Export to Excel     |
| **Goal:**                      | Allow the user to select specific recipes to include in the exported Excel file |
| **Actors:**                    | Registered User                       |
| **Preconditions:**             | The user must be logged in and have recipes available in the system |
| **System State After Use Case:** | The system prepares a list of selected recipes for export to Excel |
| **Scenario:**                  | 1. The user selects the option to export recipes to an Excel file. <br> 2. The system displays a list of the user’s recipes, allowing them to select specific recipes or choose all recipes. <br> 3. The user chooses individual recipes or selects an "Export All" option. <br> 4. The user confirms their selection. <br> 5. The system proceeds to generate an Excel file with the selected recipes. |
| **Alternative Flows:**         | If no recipes are available for selection, the system displays a notification. |
| **Exceptions:**                | If the system encounters an error displaying the list of recipes, it notifies the user and prompts them to try again later. |
