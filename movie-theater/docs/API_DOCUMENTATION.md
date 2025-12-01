# Movie Theater API Documentation

## Overview
Movie Theater is a microservices-based application for managing movie bookings, users, and notifications.

## Services

### 1. Gateway Service
- **Port**: 3000
- **Purpose**: API Gateway, request routing, load balancing
- **Routes**: `/api/*`

### 2. Movies Service
- **Port**: 3001
- **Purpose**: Movie management, listings, schedules
- **Base URL**: `/api/movies`

#### Endpoints:
- `GET /api/movies` - Get all movies
- `GET /api/movies/:id` - Get movie details
- `POST /api/movies` - Create new movie (Admin)
- `PUT /api/movies/:id` - Update movie (Admin)
- `DELETE /api/movies/:id` - Delete movie (Admin)

### 3. Users Service
- **Port**: 3002
- **Purpose**: User management, authentication
- **Base URL**: `/api/users`

#### Endpoints:
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user account

### 4. Bookings Service
- **Port**: 3003
- **Purpose**: Booking management, seat selection
- **Base URL**: `/api/bookings`

#### Endpoints:
- `POST /api/bookings` - Create new booking (Protected)
- `GET /api/bookings/:id` - Get booking details (Protected)
- `GET /api/bookings/user/:userId` - Get all bookings for a user (Protected)

### 5. SMS Service
- **Purpose**: SMS notifications via Twilio
- **Methods**:
  - `sendSms(toNumber, message)` - Send generic SMS
  - `sendVerificationCode(toNumber, code)` - Send OTP
  - `sendBookingConfirmation(toNumber, bookingDetails)` - Send booking confirmation
  - `sendReminder(toNumber, eventDetails)` - Send reminder

## Environment Variables

### Gateway
```
GATEWAY_PORT=3000
MOVIES_SERVICE_URL=http://localhost:3001
USERS_SERVICE_URL=http://localhost:3002
BOOKING_SERVICE_URL=http://localhost:3003
```

### Movies Service
```
MOVIES_PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=movie_theater
```

### Users Service
```
USERS_PORT=3002
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=movie_theater
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h
```

### Bookings Service
```
BOOKINGS_PORT=3003
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=movie_theater
JWT_SECRET=your-secret-key
```

### SMS Service
```
SMS_PROVIDER=twilio
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890
```

## Running the Application

### Start all services
```bash
npm run start:all
```

### Start individual service
```bash
npm run start:gateway
npm run start:movies
npm run start:users
npm run start:bookings
```

## Project Structure

```
backend/
├── shared/          # Shared utilities, models, middleware
│   ├── constants/   # Common constants
│   ├── middleware/  # Shared middleware (auth, error handling)
│   ├── models/      # Shared Sequelize models
│   └── utils/       # Helper functions, validators
├── config/          # Configuration files
├── services/        # Microservices
│   ├── movies/
│   ├── users/
│   └── (other services)
├── gateway/         # API Gateway
└── sms/             # SMS service
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Error Handling

Standard error response format:
```json
{
  "success": false,
  "message": "Error description",
  "error": {}
}
```

## Contributing

Please follow the project structure and coding standards when contributing.
