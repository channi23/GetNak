const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const router = express.Router();
const cors = require('cors');
router.use(cors());
const db = require('../db');
const jwt = require('jsonwebtoken');
const authenticateUser = require('../middleware/auth');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Helper function to validate email
const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

// User Signup
router.post('/signup', (req, res) => {
    const { name, email, password, role } = req.body;

    // Input validation
    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (!validateEmail(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    if (password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }

    // Hash password and insert user
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.error("Error hashing password:", err);
            return res.status(500).json({ error: "Internal server error" });
        }

        db.query("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", 
        [name, email, hash, role], (err, result) => {
            if (err) {
                console.error("Error inserting user:", err);
                return res.status(500).json({ error: "Error inserting user" });
            }
            console.log("User inserted successfully");
            return res.status(201).json({ message: "User registered successfully!", userId: result.insertId });
        });
    });
});

// User Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(401).json({ message: "User not found" });

        const user = results[0];

        // Compare hashed password
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!isMatch) return res.status(401).json({ message: "Incorrect password" });

            // Generate JWT Token with 30 days expiration
            try {
                const token = jwt.sign(
                    { userId: user.user_id, email: user.email },
                    process.env.JWT_SECRET, // Secret key from .env
                    { expiresIn: "30d" } // Token expiration set to 30 days
                );

                res.status(200).json({
                    message: "Login successful",
                    token: token, // Return the JWT token
                    userId: user.user_id
                });
            } catch (error) {
                console.error("JWT signing error:", error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    });
});

// Google Login Route
router.post('/google-login', async (req, res) => {
    const { token } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const { email, name } = ticket.getPayload();

        // Check if user exists in the database
        db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
            if (err) {
                console.error("Error checking email:", err);
                return res.status(500).json({ error: "Internal server error" });
            }

            if (results.length > 0) {
                // User already exists - generate JWT token
                const user = results[0];
                const jwtToken = jwt.sign(
                    { userId: user.user_id, email: user.email },
                    process.env.JWT_SECRET,
                    { expiresIn: "30d" }
                );

                return res.status(200).json({
                    message: "Google login successful",
                    token: jwtToken,
                    userId: user.user_id,
                    name: user.name,
                    email: user.email
                });

            } else {
                // User does not exist, register new Google user with a default role "customer"
                db.query("INSERT INTO users (name, email, role) VALUES (?, ?, ?)", [name, email, "customer"], (err, result) => {
                    if (err) {
                        console.error("Error registering Google user:", err);
                        if (err.code === "ER_DUP_ENTRY") {
                            return res.status(400).json({ message: "Email already exists" });
                        }
                        return res.status(500).json({ error: "Internal server error" });
                    }

                    // After inserting new user, generate JWT token
                    const newUserId = result.insertId;
                    const jwtToken = jwt.sign(
                        { userId: newUserId, email: email },
                        process.env.JWT_SECRET,
                        { expiresIn: "30d" }
                    );

                    return res.status(201).json({
                        message: "Google login successful",
                        token: jwtToken,
                        userId: newUserId,
                        name: name,
                        email: email
                    });
                });
            }
        });
    } catch (error) {
        console.error("Google Token Verification Error:", error.message || error.stack);
        return res.status(401).json({ message: "Invalid Google token" });
    }
});

// Get User Profile
router.get('/profile', authenticateUser, (req, res) => {
    const userId = req.user.userId; // Get userId from JWT token

    db.query("SELECT user_id, name, email, role FROM users WHERE user_id = ?", [userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: "User not found" });

        res.status(200).json(results[0]);
    });
});

module.exports = router;