# Corrective
## Overview
This app was created as a part of solo prework project for Chingu cohort.  It is a system aimed to use in heavy machine industry (automobiles, elevators ...) and lets the companies to inform their end users on potential upgrades (instructions, software updates) for their purchased and  already shipped units. 

**LIVE LINK:** [https://corrective-b0169c.netlify.app//](https://corrective-b0169c.netlify.app/)

![Corrective screenshot](https://user-images.githubusercontent.com/47148325/151711015-308e8515-0db0-40ce-bc68-6415a50dc679.png)


## Features

 - Authorization and registration via Express REST API
 - Search on MongoDB database by unit serial number. Exact matches only (case-insensitive). 

   **Backend code**: [https://github.com/BabkinAV/Corrective-be](https://github.com/BabkinAV/Corrective-be)

 - Download files from MongoDB database
 - Sorting of search items results
 - Authorized users can also change status of search items via responsive table toolbar
 - Changes to statuses are being saved to MongoDB database on Save click.
 - Companion React Native App:  [https://github.com/BabkinAV/corrective-android](https://github.com/BabkinAV/corrective-android)

## Tech used / dependencies
1.  [Create React App](https://reactjs.org/docs/create-a-new-react-app.html)
2. [Material UI](https://mui.com/)
3. [Redux](https://react-redux.js.org/)

## Running the project locally
From the repo:
1. Clone the project locally
2. Run `npm install` in your bash\command line
