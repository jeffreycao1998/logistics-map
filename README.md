# Route Mapper w/ TSP

## Description

This project was built was built for an imaginary dispatcher who needs to be able to map out an optimal route for a driver to deliver goods. It uses a Genetic Algorithm (GA) in an attempt to solve the traveling salesman problem.

## Getting Started

1. Clone this repo

2. Get a token from mapbox (more detailed instructions below)

3. in the server folder, make a copy of the example.env and rename it to just ".env"

4. replace the MAPBOX_ACCESS_KEY value with your own token

5. in the client folder, go to /src/util/constants.ts and replace the MAPBOX_ACCESS_TOKEN value with your own token

2. in the terminal, cd into the "client" folder, run ```npm install```

3. in a separate terminal, cd into the "server" folder, run ```npm install```

4. wait for both folder's dependencies to finish installing

5. run ```npm start``` in the root directory of the "server" folder

6. in a separate terminal, run ```npm start``` in the root directory of the "client" folder

7. If the browser does not automatically open up, go to http://localhost:3000

## Getting a Mapbox Access Token

1. Go to mapbox.com and create an account

2. At the top right, click the avatar and go to Account

3. Scroll down to the Access tokens section and click "Create a token"

4. Name your token and keep all the Public scopes checked

5. Enter "http://localhost:3000/, http://localhost:4000/" as your URL and click "Add URL"

6. Press "Create token"

7. Copy the token you just created
