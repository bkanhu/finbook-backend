## Models

### User Model
- `name`: String (required)
- `email`: String (required)
- `password`: String (required)
- `createdAt`: Date (default: current date)

### Card Model
- `userId`: ObjectId (reference to User, required)
- `cardHolderName`: String (required)
- `cardType`: String (enum: Visa, MasterCard, Rupay, American Express, Discover, Other, required)
- `lastFourDigits`: String (required)
- `cvv`: String (required, encrypted)
- `expiryDate`: String (required, encrypted)
- `createdAt`: Date (default: current date)

