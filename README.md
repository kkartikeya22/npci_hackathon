# Anonymous Payment System
The application is a full-stack anonymous payment system designed to facilitate secure transactions between users. It includes a frontend built with React for user interaction and a backend using Node.js and Express to handle requests, manage user data, and perform transactions securely. MongoDB is used as the database to store user credentials and transaction details.

## Key Components

### 1. Frontend (React)

- **User Interface**: The frontend provides an intuitive interface where users can register, log in, and conduct transactions. It consists of several components:
  - **Register**: Allows new users to create an account by providing a username and password. On successful registration, users can be redirected to the login page.
  - **Login**: Authenticates users by validating their credentials. Once logged in, users gain access to transaction functionalities.
  - **Transaction**: Users can send payments by entering the receiver's public key and the amount. This component also fetches the receiver's public key based on the provided username or email.

- **State Management**: The application uses React hooks (`useState`) to manage local component state, such as storing user input and public keys. The main `App` component controls the flow between the Register and Login components based on whether a user is authenticated (i.e., if they have a public key).

- **Styling**: The application incorporates inline styling to ensure a modern, responsive layout. It aims for a clean and user-friendly experience.

### 2. Backend (Node.js & Express)

- **User Registration**: The backend handles user registration by creating a new entry in the database with a hashed password for security. It uses middleware for validating inputs and ensuring secure data handling.

- **User Authentication**: When a user logs in, the server validates their credentials against the stored data. If successful, it generates a JWT (JSON Web Token) for maintaining session integrity and authentication for subsequent requests.

- **Transaction Processing**: The backend processes payment transactions by:
  - Fetching the sender's public key (authenticated user).
  - Verifying the receiver's public key.
  - Updating the database to reflect the transaction details (e.g., sender, receiver, amount).

- **Public Key Management**: The backend provides an endpoint for retrieving a user's public key based on their username or email, allowing users to find each other in the system.

### 3. Database (MongoDB)

- **User Data Storage**: The MongoDB database stores user information securely, including usernames, hashed passwords, and public keys. It allows for efficient querying and management of user-related data.

- **Transaction History**: The database can also store transaction history, enabling users to review past transactions if implemented.

## Application Flow

1. **User Registration**: 
   - A new user enters their username and password.
   - The frontend sends this data to the backend for processing.
   - If registration is successful, the user is redirected to the login page.

2. **User Login**:
   - Users enter their credentials.
   - The backend verifies the credentials and returns a JWT if valid, allowing access to the transaction features.

3. **Transaction**:
   - Users can look up a receiver's public key.
   - Upon entering the public key and amount, the frontend sends a transaction request to the backend.
   - The backend processes the transaction and updates the database accordingly.

## Security Considerations

- **Password Hashing**: The application ensures that passwords are hashed before storage, enhancing security against unauthorized access.
- **JWT Authentication**: Using JWTs allows for stateless authentication, improving scalability and performance.
- **Data Validation**: Both frontend and backend validate user inputs to prevent injection attacks and ensure data integrity.

## Conclusion

This full-stack anonymous payment system not only serves as a practical application for conducting secure transactions but also illustrates essential concepts in web development, such as component-based architecture, state management, RESTful APIs, and database interactions. Its modular design allows for easy scalability and feature enhancement in the future.
