# Route Mapper w/ TSP

## Description

This project was built was built for an imaginary dispatcher who needs to be able to map out an optimal route for a driver to deliver goods. It uses a Genetic Algorithm (GA) in an attempt to solve the traveling salesman problem.

## Getting Started

1. Clone this repo

2. Get a token from mapbox (more detailed instructions below)

3. in the server folder, make a copy of the example.env and rename it to just ".env"

4. replace the MAPBOX_ACCESS_KEY value with your own token (it should start with "pk.eyJ1...")

5. in the client folder, go to /src/util/constants.ts and replace the MAPBOX_ACCESS_TOKEN value with your own token

2. in the terminal, cd into the "client" folder and run ```npm install```

3. in a separate terminal, cd into the "server" folder and run ```npm install```

4. wait for both folder's dependencies to finish installing

5. run ```npm start``` in the root directory of the "server" folder

6. in a separate terminal, run ```npm start``` in the root directory of the "client" folder

## Getting a Mapbox Access Token

1. Go to mapbox.com and create an account

2. At the top right, click the avatar and go to Account

3. Scroll down to the Access tokens section and click "Create a token"

4. Name your token and keep all the Public scopes checked

5. Enter "http://localhost:3000/, http://localhost:4000/" as your URL and click "Add URL"

6. Press "Create token"

## Usage

After running npm start in both the client and server folder, navigate to localhost:3000 in your browser. Press "Create" at the top right corner of the side bar which opens up a modal. Create a shipment by entering it's pickup and dropoff coordinates and also a short description of the shipment. Press create and after a brief moment, it should automatically zoom into/out far enough to see the entire route comfortably. If you want to edit or delete a shipment, hover over the appropriate card in the side bar. 

### Valid Coordinates

#### Longitude -180 to 180
#### Latitude -90 to 90

![](https://github.com/jeffreycao1998/route-mapper/blob/master/documents/create-shipment.gif?raw=true)

## Tech Stack

### Backend

GraphQL w/ Apollo Server

Typescript Node

### Frontend

GraphQL w/ Apollo Client

MapboxGL

Typescript React

Styled Components

## Problem

Given a list of cities and the distances between each pair of cities, what is the shortest possible route that visits each city exactly once and returns to the origin city?

## Solutions

The first solution I tried used a brute force algorithm which simply made a list of every possible combination and looped through all of them, calculating the total distance of the sequence and recording the shortest one. This solution quickly became obselete as I added more and more routes as the number of possible solutions increases at the rate n!. After allocating 8gb of ram to node, it would constantly run out of memory at 14 + locations and took well over 10 minutes.

The second solution I tried was a Genetic Algorithm. I started out by created an initial "population", which in this case was a short list of possible combinations. Next I would calculate the total distance of each combination and assign a "fitness" score to it. In this case, the lower the distance, the higher the fitness. From this I would generate the next generation of a population. The next generation is created by picking 2 random combinations from the previous population and combining them into one. The rate of which combination will be picked is weighted by a combination's fitness score so that combinations that are more fit are more likely to appear in the next generations. This means that the next generation will keep getting more and more accurate! After merging two combinations I swap 2 points in the combination at a "mutation rate". This rate lowers as I iterate through more and more generations at an exponential rate.

## Conclusion

This was a lot of fun but I still have a lot of fine tuning and research to do if I want a higher accuracy.
