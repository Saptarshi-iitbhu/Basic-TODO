# Todo App

A full-stack Todo application built with the MERN stack (MongoDB, Express, React, Node.js). This application allows users to create accounts, manage their personal todo lists, and mark tasks as completed.

## Features

- **User Authentication**: Secure sign-up and sign-in functionality using JWT and bcrypt.
- **Create Todos**: Users can add new todos with a title and description.
- **View Todos**: Users can see a list of their own created todos.
- **Complete Todos**: Users can mark todos as done (which currently removes them from the list).
- **Responsive Design**: The frontend is built with React and styled with Tailwind CSS for a modern, responsive user interface.

## Tech Stack

### Frontend
- **Framework**: React (powered by Vite)
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Validation**: Zod
- **Authentication**: JSON Web Tokens (JWT) & bcrypt

## Prerequisites

Before running the application, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (Local instance or Atlas connection string)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository_url>
cd "Todo App"
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

**Configuration:**
Create a `.env` file in the `backend` directory with the following variables:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

*Note: Replace `your_mongodb_connection_string` and `your_jwt_secret_key` with your actual MongoDB URI and a secure secret string.*

Start the backend server:

```bash
node index.js
```
The server will start on port 3000 (or the port specified in your .env).

### 3. Frontend Setup

Open a new terminal, navigate to the frontend directory, and install dependencies:

```bash
cd frontend
npm install
```

Start the frontend development server:

```bash
npm run dev
```

Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`).

## API Endpoints

The backend exposes the following RESTful API endpoints:

**Authentication**
- `POST /sign-up`: Create a new user account.
  - Body: `{ username, password, email }`
- `POST /sign-in`: Log in to an existing account.
  - Body: `{ username, password }`

**Todos**
- `GET /todo`: Retrieve all todos for the logged-in user.
- `POST /todo`: Create a new todo.
  - Body: `{ title, description }`
- `DELETE /todo/:todoId`: Mark a todo as completed (deletes the todo).

## License
This project is licensed under the ISC License.