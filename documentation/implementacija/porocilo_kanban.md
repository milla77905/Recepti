# Progress Report - Kanban Documentation

## 1. User Story
**As a user, I want the ability to adjust nutritional values based on the number of servings so that I can plan meals accurately.**

## 2. Kanban Setup
- **Kanban Board**: A Kanban board has been created on GitHub to manage tasks.
- **WIP Limit**: A Work In Progress (WIP) limit of 3 tasks has been defined to ensure focus and minimize context switching.
- **Task Prioritization**: Tasks are labeled with priorities:
  - **High**: Must-have features.
  - **Medium**: Features important for functionality but can be deferred.
  - **Low**: Optional features or improvements.

## 3. Tasks and Task Assignments
The functionality was divided into smaller tasks based on Kanban principles. The tasks were estimated in points, and their priorities were defined.

### 3.1 Backend - Adding 'nutritional values' to `Recipes.java`
- **Estimated Cost**: 8 points
- **Priority**: High
- **Who**: Mila
- **Description**: Add the functionality for 'nutritional values' in the `Recipes.java` class, enabling storage and calculations for nutritional information.

### 3.2 Frontend - Displaying and Updating 'nutritional values' (view)
- **Estimated Cost**: 8 points
- **Priority**: High
- **Who**: Miha
- **Description**: Update the frontend to display nutritional values and dynamically update them when the portion count changes. The frontend will communicate with the backend and adjust values based on server responses.

### 3.3 Backend - Function to Update Nutritional Values
- **Estimated Cost**: 8 points
- **Priority**: High
- **Who**: Nora
- **Description**: Create a function to return an updated list of nutritional values when the portion count is adjusted.

### 3.4 Frontend - Displaying 'Daily Intake Guide' 
- **Estimated Cost**: 5 points  
- **Priority**: Medium  
- **Who**: Miha
- **Description**: Update the frontend to display a "Daily Intake Guide" section that shows nutritional values as percentages of the recommended daily intake. The frontend will dynamically calculate and update these percentages when the nutritional values or portion count changes.  

### 3.5 Frontend - Calculating Percentage for Daily Intake Guide
- **Estimated Cost**: 5 points  
- **Priority**: Medium  
- **Who**: Nora  
- **Description**: Develop the frontend logic to calculate the percentage of each nutritional value (e.g., calories, fat, protein) relative to a standard daily recommended intake. These calculations should be triggered dynamically whenever the nutritional values or portion size changes, ensuring the displayed percentages are always accurate.

### 3.6 Documentation - Kanban System  
- **Estimated Cost**: 2 points  
- **Priority**: Medium  
- **Who**: Mila 
- **Description**: Develop a comprehensive guide on how to use the Kanban system for project management. The documentation includea an overview of Kanban principles, step-by-step instructions for creating and managing tasks, and tips for optimizing workflow efficiency.

## 4. Progress Tracking
- **Task Tracking**: Tasks are moved between columns (`ToDo`, `In Progress`, `Done`) on the Kanban board based on their status.
- **Regular Updates**: The board is updated daily to reflect the latest progress and ensure transparency.

## 5. Conclusion
The nutritional values functionality is being developed according to the Kanban methodology. Tasks are managed on a GitHub Kanban board, and progress is continuously tracked and updated.
