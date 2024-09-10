# FinBook - Manage Finance

## Overview

FinBook, A Personal Finance Manager. Securely store finance related details. And Manage Expenses.  

## Features

- Manage Card Details
- Manage Bank Details (Coming Soon)
- Manage Expenses (Coming Soon)

## Environment Variables

Ensure the following environment variables are set in your `.env` file:

- **`PORT`**: Port number for the application.
  - Example: `4000`

- **`PAPERTRAIL_HOST`**: Host for Papertrail logging.
  - Example: `logs.papertrailapp.com`

- **`PAPERTRAIL_PORT`**: Port number for Papertrail logging.
  - Example: `YOUR_PAPERTRAIL_PORT`

- **`MONGO_URI`**: MongoDB connection string.
  - Example: `mongodb+srv://{user}:{password}@{cluster-url}/{database}`

- **`NODE_ENV`**: Set to `'production'` for the production environment, and `'development'` for the development environment.
  - Example: `development`

- **`CORS_ALLOWED_ORIGINS`**: Comma-separated list of allowed origins for Cross-Origin Resource Sharing (CORS).
  - Example: `http://example.com,http://anotherexample.com`

- **`ENCRYPTION_KEY`**: Key used for encryption. Must be 32 characters long.
  - Example: `YOUR_32_CHARACTER_ENCRYPTION_KEY`

- **`IV`**: Initialization vector for encryption. Must be 16 characters long.
  - Example: `YOUR_16_CHARACTER_IV`

- **`JWT_SECRET`**: Secret key for JWT token generation. Should be a long, secure key.
  - Example: `YOUR_LONG_SECURE_JWT_SECRET`

## Setup Project & Installation
**Clone the Repository**
```bash
git clone https://github.com/bkanhu/finbook-backend.git
cd finbook-backend
```
**Install Dependencies**
```bash
npm install
```
**Create a `.env` file**
Copy the .env.example to .env and update with your values:

## Usage
Start the Server

**For development**:
```bash
npm run dev
```

**For production**:
```bash
npm start
```

## Docs:
  - [Project Structure](docs/project.md)
  - [Schema Models](docs/models.md)
  - [API Doc](docs/API.md)