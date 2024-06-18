# Social Nest

A full-featured social media website built using the MERN stack (MongoDB, Express.js, React.js, Node.js). This project includes user authentication, posting images, real-time chat, trending in India.

## FEATURES

1. User authentication (signup, login, logout)
2. Profile management
3. Image and Video posting
4. Real-time chat
5. Trendig in India
6. Follow and unfollow users
7. Like and comment on posts
8. Users are getting their posts based on people whom they follow (following)

## TECHNOLOGIES USED

#### FRONTEND:

1. React.js
2. Redux (for state management)
3. CSS / SCSS

#### BACKEND:

1. Node.js
2. Express.js
3. MongoDB
4. Mongoose (for MongoDB object modeling)

#### SOCKET SERVER:

1. Socket.io

## INSTRUCTIONS TO RUN:

#### Frontend

1. Add a `.env` file in the `./frontend` directory. It must contain `REACT_APP_PUBLIC_FOLDER` the path to the public folder(for assets). Example: `REACT_APP_PUBLIC_FOLDER = http://localhost:5000/images/`. View the `.env.example`.
2. Use these commands to start the frontend:
   `cd "frontend"`
   `npm install`
   `npm start`

#### Backend:

1. Add a `.env` file in the `./backend` directory. It must contain `MONGODB_CONNECTION`,`PORT=5000` and `JWTKEY`. Example :
   <code>MONGODB_CONNECTION=mongodb://localhost:27017
   PORT=5000
   JWTKEY=sreelekha-key</code>
   View the `.env.example`.
2. Use these commands to start the backend:
   `cd "backend"`
   `npm install`
   `npm start`

#### Socket:

`cd "web-socket"`
`npm install`
`npm start`

Run all the three terminals parallely and refresh the page to reload everything timely when needed.
