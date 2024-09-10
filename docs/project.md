# Project 

## Structure
```lua
finbook-backend/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── auth.js
│   ├── model/
│   │   ├── card.js
│   │   └── user.js
│   ├── routes/
│   │   ├── v1/
│   │   │   ├── controllers/
│   │   │   └── index.js
│   │   └── v2/
│   │       └── index.js
│   ├── utils/
│   │   ├── encryption-utils.js
│   │   ├── generateToken.js
│   │   └── sendResponse.js
│   └── index.js
├── docs/
├── .env
├── .gitignore
├── .prettierrc
├── .gitignore
├── package.json
└── README.md
```

## Environment Variables

Ensure the following environment variables are set in your `.env` file:

- **`PORT`**: Port number for the application.
- **`PAPERTRAIL_HOST`**: Host for Papertrail logging.
- **`PAPERTRAIL_PORT`**: Port number for Papertrail logging.
- **`MONGO_URI`**: MongoDB connection string.
- **`NODE_ENV`**: Set to `'production'` for the production environment, and `'development'` for the development environment.
- **`CORS_ALLOWED_ORIGINS`**: Comma-separated list of allowed origins for Cross-Origin Resource Sharing (CORS).
- **`ENCRYPTION_KEY`**: Key used for encryption. Must be 32 characters long.
- **`IV`**: Initialization vector for encryption. Must be 16 characters long.
- **`JWT_SECRET`**: Secret key for JWT token generation. Should be a long, secure key.