# 🌟 PawMart - MERN Stack Backend

This is the backend component of the **PawMart** MERN stack application, built using **Node.js**, **Express.js**, and **MongoDB** with **Mongoose**.

---

## ⚙️ Technologies Used

- **Node.js** – JavaScript runtime environment.
- **Express.js** – Web framework for building APIs.
- **MongoDB** – NoSQL document database for scalable data storage.
- **Mongoose** – ODM (Object Data Modeling) library for MongoDB.
- **dotenv** – Environment variable management.
- **cors** – Enable cross-origin resource sharing.
- **nodemon** – Development tool for live server reloading.

---

## 💡 Key Features (Backend)

- 🔗 **RESTful API:** Provides endpoints for managing pets, users, and orders.
- 🧩 **Data Modeling:** Structured and validated data using **Mongoose Schemas**.
- 🔐 **Authentication:** (Optional) JWT-based authentication support.
- 🧠 **Error Handling:** Centralized error handling and validation.
- 🌐 **Database Connection:** Secure connection to MongoDB Atlas via Mongoose.

---

## 🛠️ Installation and Setup

### **Prerequisites**

- Node.js (LTS version recommended)
- MongoDB installed locally or access to a MongoDB Atlas cluster

---

### **Steps**

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/YourUsername/PawMart-Server.git
cd PawMart-Server
2️⃣ Install Dependencies

npm install
3️⃣ Environment Variables
Create a .env file in the project root and add the following configuration:

env

PORT=5000
MONGO_URI="mongodb+srv://<username>:<password>@cluster0.mongodb.net/PawMart?retryWrites=true&w=majority"
JWT_SECRET="your_jwt_secret_key"
⚠️ Note: Replace <username> and <password> with your MongoDB credentials. Do not use < and > symbols.

4️⃣ Run the Server
npm run dev
Or:

bash
Copy code
npm start
The server will start on:
🌍 http://localhost:5000

📚 API Endpoints
Method	Endpoint	Description
GET	/api/users	Get a list of all users
POST	/api/users/register	Register a new user
POST	/api/users/login	Log in an existing user
GET	/api/pets	Fetch all pet listings
POST	/api/pets	Add a new pet listing
PUT	/api/pets/:id	Update a pet listing
DELETE	/api/pets/:id	Delete a pet listing
GET	/api/orders	Retrieve all orders

Add or modify routes in the routes/ directory as your project expands.

🔗 Mongoose Usage (Example Schema)
All data models are defined in the models/ directory.

javascript
Copy code
// Example: models/User.js
const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

module.exports = mongoose.model('User', userSchema);
📦 Folder Structure


🧠 What is Mongoose?
Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
Since MongoDB is schema-less, Mongoose helps bring structure and validation to your data.

Key Benefits:

✅ Schema enforcement for reliability

🧱 Data modeling for clean structure

🛡️ Built-in & custom validation

🧩 Easy CRUD operations via high-level model methods

📹 Learning Resource
🎥 Recommended: A MERN Stack tutorial on YouTube that covers backend setup with MongoDB, Express, and Mongoose step by step.
```
