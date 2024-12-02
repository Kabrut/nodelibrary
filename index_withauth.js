const express = require("express");
const routes = require("./routes/users.js");
const jwt = require("jsonwebtoken");
const session = require("express-session");
users = [];
const app = express();
const PORT = 5000;

app.use(
  session({ secret: "fingerpint", resave: true, saveUninitialized: true })
);

// Middleware for user authentication
app.use("/user", (req, res, next) => {
  // Check if user is authenticated
  if (req.session.authorization) {
    let token = req.session.authorization["accessToken"]; // Access Token

    // Verify JWT token for user authentication
    jwt.verify(token, "access", (err, user) => {
      if (!err) {
        req.user = user; // Set authenticated user data on the request object
        next(); // Proceed to the next middleware
      } else {
        return res.status(403).json({ message: "User not authenticated" }); // Return error if token verification fails
      }
    });

    // Return error if no access token is found in the session
  } else {
    return res.status(403).json({ message: "User not logged in" });
  }
});

// Parse JSON request bodies
app.use(express.json());

// User routes
app.use("/user", routes);

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    // Find user
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const accessToken = jwt.sign({ username }, 'secret', { expiresIn: '1h' });

    // Store token in session
    req.session.authorization = { accessToken };

    return res.status(200).json({ message: "User logged in successfully" });
});

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  users.push({ username, password });

  return res.status(201).json({ message: "User registered successfully" });
});

// Start server
app.listen(PORT, () => console.log("Server is running at port " + PORT));