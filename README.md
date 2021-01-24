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

After running npm start in both the client and server folder, navigate to localhost:3000 in your browser. Press "Create" at the top right corner of the side bar which opens up a modal. Create a shipment by entering it's pickup and dropoff coordinates and also a short description of the shipment. Press create and after a brief moment, it should automatically zoom into/out to a far enough to see the entire route at a comfortable distance. If you want to edit or delete a shipment, hover over the appropriate card in the side bar. 

### Valid Coordinates

#### Longitude -180 to 180
#### Latitude -90 to 90

## Tech Stack

### Backend

GraphQL w/ Apollo Server

Typescript Node

### Frontend

GraphQL w/ Apollo Client

MapboxGL

Typescript React

Styled Components
