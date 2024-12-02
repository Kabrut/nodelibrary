// Import Express and user routes, create an instance of Express
const express = require('express');
const users = require('./routes/users.js');
const books = require('./routes/books.js');
const app = express();
const PORT = 5000;

// Use JSON parsing middleware and user routes
app.use(express.json());
app.use("/user", users);
app.use("/book", books);


// Start the server and log a message when it's running
app.listen(PORT, () => console.log("Server is running at port " + PORT));
