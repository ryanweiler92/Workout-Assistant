# Workout-Assistant 

## To Launch Just Server side
From the server folder// npm start  localhost:3001/graphql

## To Launch Just Client Side
From the client folder// npm start localhost:3000 

## To Launch Server & Client
From root directoy// npm run develop 



## (Description) 
We want to provide users with a platform where they can keep track of 
exercise routines. Improve their exercise regiment with other resources including APIs.
Provide a user interface which is integrated with our database, so that we can display
the tracked data in a way that is persistent and engaging for the user. 

## (User Story) 
An application where users can look at an exercise library and save workouts to their dashboard. 

CSS UI -Ryan
Backend- Katie 

Login In/Logout Signup Front End/Login (Ryan) 


Search/Save Workouts Dropdowns Page (Greg)
--Push to profile


Profile Page ()
--Display saved exercises 
--Chose from your saved exercises and apply routines

MODELS:

userModel
username,
email,
password,
savedWorkouts: [workoutSchema]

WorkoutSchema
name,
bodyPart,
equipment,
gifURL,
id,
notes(blank)