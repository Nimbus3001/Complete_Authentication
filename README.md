
# Codemania Backend Setup

To stop "Simulation Mode" and use the real auth logic, follow these steps:

1. **Install Node.js**: Ensure you have Node.js installed on your machine.
2. **Install Dependencies**: Open your terminal in this project folder and run:
   ```bash
   npm install
   ```
3. **Start the Server**:
   ```bash
   npm start
   ```
4. **Connect**: Once the server is running at `http://localhost:3000`, refresh your frontend. It will now talk to this real server instead of using the LocalStorage fallback.

**Note**: This server uses an in-memory array for users. If you restart the server, all registered users will be cleared. For permanent storage, you would integrate a database like MongoDB.
