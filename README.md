Basic To-Do List Application

Task Description:

     Create a basic To-Do list application that allows users to register, login, and manage their to-do items. This application should use Node.js, Supabase, and MongoDB for the backend. Deploy the backend using Render and create a simple front-end interface with Netlify.


Task to Complete:
### 1. Setup:

- **Initialize a Node.js Project**: Create a new folder and run `npm init -y` to start a new Node.js project. This will generate a `package.json` file.
- **Install Necessary Dependencies**:
    - `express` for creating the server.
    - `sqlite3` for interacting with the SQLite database.
    - `bcryptjs` for hashing passwords securely.
    - `jsonwebtoken` for handling JWTs for authentication.
    - `cors` to handle cross-origin requests from the frontend.
    - `dotenv` for managing environment variables.

### 2. Database Setup:

- **SQLite Database**: Instead of MongoDB, use SQLite to store user information and to-do items.
- **Schema Definition**: Define tables for users and to-do items. Users might have fields like `id`, `username`, `password`, and to-do items might include `id`, `user_id`, `description`, `status`.

### 3. User Authentication:

- **Registration and Login**:
    - For registration, take the username and password, hash the password using `bcryptjs`, and store in the SQLite database.
    - For login, compare the hashed password stored in the database with the password provided by the user using `bcryptjs`.
- **JWT Integration**: Use `jsonwebtoken` to create a JWT when the user logs in, which will be used to authenticate subsequent requests.

### 4. To-Do Operations:

- **CRUD Operations**:
    - **Create**: Insert a new to-do item linked with the user's `id`.
    - **Read**: Fetch all to-do items for the logged-in user using their `id`.
    - **Update**: Allow users to update the description or status of their to-do items.
    - **Delete**: Enable users to delete their to-do items.

### 5. Session Management:

- **Session with JWT**: Instead of session management through MongoDB, manage sessions using JWTs that expire after a certain period.
- **Store Login Activity**: Optionally, you could store user activity logs in a separate table in SQLite if needed for audit purposes.

### 6. API Endpoints:

- Define endpoints as per the requirements but ensure they interact with SQLite. For instance:
    - `POST /register` and `POST /login` for user registration and login.
    - `POST /todos`, `GET /todos`, `PUT /todos/:id`, and `DELETE /todos/:id` for managing to-do items.

### 7. Frontend and Deployment:

- **React Frontend**:
    - Use `create-react-app` to initialize a new React project.
    - Create components for registration, login, and to-do item management.
    - Use `axios` or `fetch` for API requests to communicate with the Node.js backend.
- **Deployment**:
    - Deploy the backend using any Node.js compatible hosting service, e.g., Heroku.
    - Deploy the frontend on Netlify or Vercel.

### 8. Documentation:

- **API Documentation**: Use tools like Swagger or just provide a markdown file detailing your API endpoints, including request and response formats.
- **Deployment Documentation**: Detail the steps required to deploy both the frontend and backend, including any environment variables needed.