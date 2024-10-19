# Express TypeScript Drizzle Template

This is a comprehensive template for building robust backend applications using Express, TypeScript, and Drizzle ORM. It provides a solid foundation for creating scalable, maintainable, and secure server-side applications.

## Features

- **Express Server**: Fast, unopinionated, minimalist web framework for Node.js
- **TypeScript Support**: Adds static typing to JavaScript, enhancing code quality and developer productivity
- **Drizzle ORM**: Modern TypeScript ORM for SQL databases with a focus on type safety
- **SQLite Database**: Lightweight, serverless database for easier setup and development
- **User Authentication**: Secure user authentication system inspired by [Lucia-auth](https://lucia-next.pages.dev/)
- **Session Management**: Efficient handling of user sessions
- **Error Handling Middleware**: Centralized error handling for consistent error responses
- **Rate Limiting**: Protects against brute-force attacks and ensures fair usage
- **Security Middleware**: Implements best practices for web application security
- **Input Validation**: Uses Zod for robust and type-safe input validation
- **CORS Support**: Handles Cross-Origin Resource Sharing for frontend integration
- **Cookie Parsing**: Efficiently manages client-side cookies

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

## Getting Started

1. Clone the repository:

   ```
   git clone https://github.com/your-username/express-ts-drizzle-template.git
   cd express-ts-drizzle-template
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up environment variables:

   - Copy the `.env.example` file to `.env`
   - Update the values in `.env` as needed

4. Start the development server:

   ```
   npm run dev
   ```

   This will start the server using `tsx watch`, which will automatically restart the server when changes are detected.

5. For production, build and start the server:
   ```
   npm run build
   npm start
   ```

The server will start on the port specified in your `.env` file (default is 3000). You can now make requests to `http://localhost:3000/api/v1` (or whatever port and prefix you've configured).

Note: Make sure to run database migrations before starting the server for the first time:

## Project Structure

The project structure is organized as follows:

- `src/`: Contains the main source code of the application.

  - `db/`: Contains the database configuration and schema definitions.

  - `handlers/`: Contains the route handlers for different endpoints.

  - `middleware/`: Contains custom middleware functions.

  - `models/`: Contains data models and validation schemas.

  - `routes/`: Contains the route definitions.

  - `utils/`: Contains utility functions and configuration.

- `drizzle.config.ts`: Configuration file for Drizzle.

- `migrate.ts`: Script for running database migrations.

- `tsconfig.json`: TypeScript configuration file.

## Database

The template uses SQLite as the database and Drizzle ORM for database management. The database schema is defined in the `src/db/schema` directory.

To generate new migration files, run:

```
npm run db:generate
```

To run the database migrations, use:

```
npm run db:migrate
```

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more information.
