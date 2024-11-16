### README

# Match Prediction App

## Overview
The Match Prediction App is a web application that allows users to view upcoming matches, submit score predictions, and manage their profiles. The app is built using React and communicates with a backend API to fetch match data and handle user interactions.

## Features
- **View Matches**: Users can view a list of upcoming matches.
- **Submit Predictions**: Users can submit their score predictions for matches that have not yet started.
- **Profile Management**: Users can update their profile information such as name, username, and email.
- **Show More/Less Matches**: Users can toggle between viewing a limited number of matches and all available matches.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/match-prediction-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd match-prediction-app
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Usage
1. Start the development server:
   ```bash
   npm start
   ```
2. Open your browser and navigate to `http://localhost:3000`.

## Technologies
- **JavaScript**: The primary programming language used.
- **React**: A JavaScript library for building user interfaces.
- **npm**: Node package manager used for managing dependencies.
- **date-fns**: A library for manipulating dates in JavaScript.

## API Endpoints
- **GET /matches**: Fetches a list of matches.
  - **Response**: An array of match objects, each containing details such as match date, home team, away team, and scores.
- **PUT /users/:id**: Updates user profile information.
  - **Request Body**: JSON object containing the updated user information (name, username, email).
  - **Response**: Status code indicating success or failure of the update operation.

## Components
### Matches
- **MatchesTable**: Displays a table of matches with a "Show More" button to toggle between showing a limited number of matches and all matches.
- **SingleMatch**: Displays details of a selected match and allows users to submit score predictions if the match has not started.

### Profile
- **Profile**: Allows users to update their profile information.

## Code Structure
- `src/components/Matches.jsx`: Main component that includes `MatchesTable` and `SingleMatch`.
- `src/components/MatchesTable.jsx`: Component for displaying the matches table.
- `src/components/SingleMatch.jsx`: Component for displaying and interacting with a single match.
- `src/components/Profile.jsx`: Component for managing user profile information.

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.
