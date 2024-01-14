<p align="center">
  <img src="build/Assets/1.png">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-61dafb"> <img src="https://img.shields.io/badge/Node.js-43853d"> <img src="https://img.shields.io/badge/Express-000000">
  <img src="https://img.shields.io/badge/HTML-e34c26"> <img src="https://img.shields.io/badge/CSS-563d7c"> <img src="https://img.shields.io/badge/Bcrypt-8a83ad">
  <img src="https://img.shields.io/badge/Cookies-326ce5"> <img src="https://img.shields.io/badge/MongoDB-4ea94b"> <img src="https://img.shields.io/badge/Mongoose-880000">
  <img src="https://img.shields.io/badge/Webpack-8dd6f9">
</p>

<h1 align="center">TravelAgent</h1>

Travel Agent serves as your dedicated travel planning application. Users can effortlessly create accounts and engage with a virtual travel receptionist. By providing essential details such as the desired destination, departure and return dates, etc., users initiate requests to our backend travel API. The application fetches information on the top 3 hotels, local attractions, and the most budget-friendly flights from their nearest airport. Additionally, users can conveniently save their past searches in a planner for future reference.

## Table of Contents
- [Interface & Features](#interface--features)
- [Prerequisites](#prerequisites)
- [Usage](#usage)
- [For Future Iterations](#for-future-iterations)
- [The TravelAgent Team](#the-TravelAgent-team)

## Interface & Features

**Sign-Up/Login page**
- Users can create and log in to an account that holds their previous searches' data.

**Series of chat options where users input their travel information**
- Users can follow a series of chat options to create a customizable vacation itinerary.

**Travel Itinerary**
- A page that displays the three best sights in the areas, hotels, and cheapest flights from your nearest airport.

**Option to save Itinerary for later use**
- Users can save the itinerary for specific days and locations for future reference.

## Prerequisites

To use TravelAgent, you will need to:

- Create a MongoDB cluster and copy the URI.
- Create a .env file within the root of the project.
- In the env file, create an ATLAS_URI with the copied URI code from MongoDB Atlas.

## Usage

To use TravelAgent effectively, follow these steps:

1. In the root terminal, type the command `npm run dev`, and a page should load.

2. Navigate to `localhost:8080/signup` and create an account.

<p align="center">
  <img src="build/Assets/2.png" alt="Image 2">
  <img src="build/Assets/3.png" alt="Image 3">
</p>

3. Click option 3 or number 3 on your keyboard for the first option and type a city you would like to travel to in the United States.

<p align="center">
  <img src="build/Assets/4.png" alt="Image 4">
</p>

4. Click option 3 or number 3 on your keyboard for the second option and type a date you would like to fly out in this format “xx/xx/xx”.

<p align="center">
  <img src="build/Assets/5%20(2).png" alt="Image 5 (2)">
</p>

5. Click option 3 or number 3 on your keyboard for the third option and type a date you would like to return in this format “xx/xx/xx”.

<p align="center">
  <img src="build/Assets/6.png" alt="Image 6">
</p>

6. Do not touch anything and wait 30 seconds, and the TravelAgent should lead you to a custom itinerary made for you.

<p align="center">
  <img src="build/Assets/7.png" alt="Image 7">
</p>

7. If you would like to save an itinerary, click the “Add Trip” button at the top left.

8. If you would like to view your itinerary, click the “View All Trips” button on the top right, or you can just go to `localhost:8080/userPage`.

<p align="center">
  <img src="build/Assets/8.png" alt="Image 8">
</p>

## For Future Iterations
- Ensure the application retrieves flights based on the server's location aligned with the user's departure point.
- Exercise caution in location selection to prevent errors, favoring city specificity over states for robust performance.
- Be mindful when setting date ranges to prevent crashes, avoiding the selection of dates too far into the future.
- Exercise caution in choosing locations in less populated areas to prevent application crashes.
- The `userPage` does not refresh when items are deleted.
- Users can input anything in the input boxes, leading to potential errors, and the required format is not specified.
- If you reach the end of the dialogue, the app crashes.
- Attempting to animate text only works on the first call, and it appears somewhat unusual.
- The backend lacks proper error handling; the frontend should not crash when errors occur and should inform the user about the issue.
- We ensured that adding more dialogue is easy, so feel free to expand the lore.

## The TravelAgent Team

Developed by:

- **Preston Mounivong**
  - LinkedIn: [Preston Mounivong](https://www.linkedin.com/in/prestonmounivong/)
  - GitHub: [prrrrreston](https://github.com/prrrrreston)

- **Josh Nelson**
  - LinkedIn: [Josh Nelson](https://www.linkedin.com/in/joshnelson98/)
  - GitHub: [JoshNelson98](https://github.com/JoshNelson98)

- **Ayden Yip**
  - LinkedIn: [Ayden Yip](https://www.linkedin.com/in/aydenyip/)
  - GitHub: [aydenyipcs](https://github.com/aydenyipcs)

- **Quinn Craddock**
  - LinkedIn: [Quinn Craddock](https://www.linkedin.com/in/quinn-craddock4/)
  - GitHub: [quinnCraddock4](https://github.com/quinnCraddock4)
