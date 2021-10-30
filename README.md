# FANTASTIG

Full stack web application using Mongoose, Express, React (with Hooks), and NodeJS. Authentication is done through the usage of JWT tokens and bcrypt.

Live Heroku deployment: https://fantastig.herokuapp.com/

## Quick Start

```bash
# Install dependencies for server
npm install

# Install dependencies for client
npm install --prefix client

# Run the client & server with concurrently
npm run dev

# Run the Express server only
npm run server

# Run the React client only
npm run client

# Server runs on http://localhost:5000 and client on http://localhost:3000
```

You will need to create a dev.js in the server config folder with

```
module.exports = {
    mongoURI: <Your MongoURI here>,
    jwtSecret: <Your JWT Secret here>,
};
```

## App Info

### Author

Jeong Seok (David) Han

### Version

1.0.0

### License

This project is licensed under the MIT License
