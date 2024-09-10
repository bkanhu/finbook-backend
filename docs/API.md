
# FinBook API

## Base URL
`/api/v1`

## Authentication
Most endpoints require authentication using a JWT token. The token should be included in the `token` cookie for authenticated requests. The API uses cookie-based authentication with HTTP-only cookies.


## User Authentication Endpoints

### Register

- Endpoint: `POST /auth/signup`
- Description: Register a new user
- Request Body:
  ```json
  {
  "name":"B Kanhu",
  "email":"iamkanhuc@gmail.com",
  "phone":"8093358472",
  "password":"123456"
  }
  ```

### Login

- Endpoint: `POST /auth/login`
- Description: Login a user
- Request Body:
  ```json
  {
  "email": "iamkanhuc@gmail.com",
  "password": "123456"
  }
  ```
### Save New Card
- **Endpoint**: `POST /cards`
- **Auth**: Required
- **Description**: Save a new card for the authenticated user.
- **Request Body**:
  ```json
  {
    "cardHolderName": "B Kanhu",
    "lastFourDigits": "8472",
    "cvv": "123",
    "expiryDate": "12/25",
    "cardType": "Visa"
  }
  ```

### Get All Cards
- **Endpoint**: `GET /cards`
- **Auth**: Required
- **Description**: View all cards for the authenticated user.

### View Individual Card
- **Endpoint**: `GET /cards/:id`
- **Auth**: Required
- **Description**: View Individual card for the authenticated user.
- **Parameters**: `id`(path parameter): Card ID

### Other Endpoints
- **Health Check:** GET /api/health - Check if the server is running.
- **Status Monitoring:** GET /status - Access the status monitoring page.


