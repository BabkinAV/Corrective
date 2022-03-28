# Corrective
## Overview
This app was created as a part of solo prework project for Chingu cohort.  It is a system aimed to use in heavy machine industry (automobiles, elevators ...) and lets the companies to inform their end users on potential upgrades (instructions, software updates) for their purchased and  already shipped units. 

**LIVE LINK:** [https://corrective-b0169c.netlify.app//](https://corrective-b0169c.netlify.app/)

![Corrective screenshot](https://user-images.githubusercontent.com/47148325/151711015-308e8515-0db0-40ce-bc68-6415a50dc679.png)


## Features

 - Authorization and registration via Firebase REST API
 - Search on the Firestore database via unit serial number. Exact matches only (case-insensitive). 
 - Download files from Firestore database
 - Sorting of search items results
 - Authorized users can also change status of search items via responsive table toolbar
 - Changes to statuses are being saved to Firestore database on Save click.

## Tech used / dependencies
1.  [Create React App](https://reactjs.org/docs/create-a-new-react-app.html)
2. [Material UI](https://mui.com/)
3. [Express](https://expressjs.com/)
4. [Firebase](https://firebase.google.com/) 
5. [Redux](https://react-redux.js.org/)

## Running the project locally
From the repo:
1. Clone the project locally
2. Run `npm install` in your bash\command line
