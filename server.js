
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// In-memory user store (Resets on server restart)
// In a real production app, use a database like MongoDB or PostgreSQL
const users = [];

/**
 * REGISTRATION ENDPOINT
 * Receives: { name, password }
 */
app.post('/users', async (req, res) => {
  try {
    const { name, password } = req.body;
    
    if (!name || !password) {
      return res.status(400).send('Operator ID and Access Key required');
    }

    if (users.find(u => u.name === name)) {
      return res.status(400).send('Identity already exists in mainframe');
    }

    // Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);
    
    users.push({
      name,
      password: hashedPassword
    });

    console.log(`[AUTH] New identity registered: ${name}`);
    res.status(201).send();
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

/**
 * LOGIN ENDPOINT
 * Receives: { name, password }
 */
app.post('/users/login', async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = users.find(u => u.name === name);

    if (!user) {
      return res.status(400).send('Cannot find identity');
    }

    // Compare provided password with hashed password
    if (await bcrypt.compare(password, user.password)) {
      console.log(`[AUTH] Access granted to: ${name}`);
      res.send('Success');
    } else {
      console.log(`[AUTH] Login denied for: ${name}`);
      res.send('Not Allowed');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log('-------------------------------------------');
  console.log(`CODEMANIA BACKEND ACTIVE ON PORT ${PORT}`);
  console.log(`URL: http://localhost:${PORT}`);
  console.log('-------------------------------------------');
});
