### **Step 1: Initialize a Node.js project**

1. First, navigate to your project folder and initialize it:
```bash
npm init -y
```
This will create a `package.json` file.

---

### **Step 2: Install Express**

2. Install **Express** via npm:
```bash
npm install express
```
**package.json: customized start**:
```json
{
  "name": "expressserver",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.21.0",
    "nodemon": "^3.1.7"
  }
}
```

### **Step 3: Create the Server**

3. Now, let's create a basic Express server in `index.js`:

```javascript
// Import express
const express = require('express');
const app = express();

// Define a port
const port = 3000;

// Create a basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

4. Run the server:
```bash
node index.js
```

Navigate to `http://localhost:3000` in your browser, and you should see the message: **Hello World!**

---

🥷 **Hacker Tip**: Want to make your development process smoother? Install **nodemon** for auto-reloading your server during development:

```bash
npm install -g nodemon
```

Run your app with:
```bash
nodemon index.js
```
If nodemon create problem
```bash
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```
- Installing the CORS (Cross-Origin Resource Sharing) middleware in Node.js application
```bash
npm i cors
```
