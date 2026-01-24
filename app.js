const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;
const JWT_SECRET = 'cyberpunk_secret_key_2025';

app.use(express.json());
app.use(cors());

// In-memory user store
const users = [];

app.post('/api/auth/admin/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and Password required' });
    }

    if (users.find(u => u.username === username)) {
      return res.status(400).json({ message: 'Identity already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/api/auth/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ success: true, message: 'Success', token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`MAINFRAME ONLINE: Port ${PORT}`);
});