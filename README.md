# Wallet Transaction Frontend

This project is a ReactJS application that utilizes JWT (JSON Web Tokens) for authentication. It provides a frontend interface for user login, registration, and access to protected routes.

## Features

- User registration and login
- JWT-based authentication
- Protected routes accessible only to authenticated users
- User-friendly interface

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (Node Package Manager)

### Architecture

   - The frontend is built using ReactJs, a popular Node.js framework.

### Deployment

- Deployed on Github Pages.

  This repo uses Github Action as CI/CD. main.yaml could be found in .github/workflows/main.yaml

### Setup

1. **Clone the Repository**

   ```
   git clone https://github.com/yourusername/wallet-transaction-frontend.git
   cd wallet-transaction-frontend
   ```

2. **Install Dependencies**
    ```
    npm install --legacy-peer-deps   
    ```
3. **Create a `.env` File**

    ```
    REACT_APP_BACKEND_URL=http://wallet-transaction-backend-url
    ```

4. **Start the Application**
   ```
   npm start
   ```
   The application will start and be available at [http://localhost:3000](http://localhost:3000)


### Future Improvement
- Use React Redux
- Use cookies to store JWT instead of localStorage
- If user role is User, then do not load all APIs