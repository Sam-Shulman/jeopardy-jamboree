### Jeopardy Jamboree
Welcome to Jeopardy Jamboree. This app uses a react front end to display random questions and categories from the JService API, so
you can play your favorite trivia game whenever you want. Whether you want to practice or just mess around by testing your knowledge,
this is the app for you!

### Authors
Sam Shulman

### Site
https://localhost3000

### Technologies used: 
    - JavaScript
    - Express
    - React
    - Foundation CSS
    - PostgreSQL

### Installation
    - Run `git clone https://github.com/Sam-Shulman/jeopardy-jamboree.git` in your terminal.
    - Navigate to the app in your terminal: `cd jeopardy-jamboree`
    - Navigate to the server folder to complete the following commands: `cd server`
    - Create the database using postGresSQL: `createdb jeopardy-jamboree_development`
    - run yarn install in your terminal before opening the app: `yarn install`
    - Run the following command to confirm migrations are up to date: `yarn migrate:latest`
    - start server by running: `yarn dev`

### Usage:
    - Navigate to https://localhost:3000/
    - Make an account using the registration form in the top right of the webpage
    - Click play a game and test yourself!

<img width="1439" alt="Screenshot 2023-06-06 at 3 22 08 PM" src="https://github.com/Sam-Shulman/jeopardy-jamboree/assets/122935111/f2efac6f-7db7-4f1d-99fb-a832ae7f80ba">



### To-Do:
    - I would like people to be able to save their games and send it to their friends, competing with the same questions
    - Work towards building a customizable game, where users can make their own questions

