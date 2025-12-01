# Backend Services

Microservices architecture for the Movie Theater application.

## Project Structure

```
backend/
├── config/                  # Configuration files
│   ├── database.js         # Database configuration
│   └── jwt.js              # JWT configuration
├── shared/                 # Shared utilities and middleware
│   ├── constants/          # Common constants (error messages)
│   ├── middleware/         # Shared middleware (auth, error handling)
│   ├── models/             # Shared Sequelize models
│   └── utils/              # Helper functions (validators)
├── services/               # Microservices
│   ├── movies/             # Movies service
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   └── package.json
│   └── users/              # Users service
│       ├── controllers/
│       ├── routes/
│       ├── models/
│       └── package.json
├── gateway/                # API Gateway
│   ├── server.js
│   └── package.json
├── sms/                    # SMS service
│   ├── providers/          # SMS providers (Twilio)
│   ├── smsService.js
│   ├── package.json
│   └── .env.example
└── package.json            # Root package.json

```

## Services

### 1. **API Gateway** (Port 3000)
- Route requests to appropriate services
- Load balancing
- Request validation

### 2. **Movies Service** (Port 3001)
- Movie CRUD operations
- Movie listings and schedules
- Movie details management

### 3. **Users Service** (Port 3002)
- User registration and authentication
- User profile management
- JWT token generation

### 4. **SMS Service**
- Send SMS notifications via Twilio
- Verification codes
- Booking confirmations and reminders

## Installation

### Prerequisites
- Node.js >= 14
- MySQL/MariaDB
- Twilio account (for SMS service)

### Setup

1. **Install dependencies for all services:**
   ```bash
   npm install
   ```

2. **Setup environment variables:**
   - Copy `.env.example` to `.env` in each service folder
   - Update values with your configuration

3. **Setup database:**
   ```bash
   mysql -u root < ../../create_tables.sql
   mysql -u root < ../../insert_data.sql
   ```

## Running Services

### Start all services at once:
```bash
npm run start:all
```

### Start individual service:
```bash
npm run start:gateway      # Start API Gateway
npm run start:movies       # Start Movies Service
npm run start:users        # Start Users Service
npm run start:sms          # Start SMS Service
```

### Development mode with auto-reload:
```bash
npm run dev:all
```

## API Documentation

See [`../docs/API_DOCUMENTATION.md`](../docs/API_DOCUMENTATION.md) for detailed API endpoints and usage examples.

## Environment Variables

Each service has its own `.env.example` file. Key variables:

**Gateway:**
- `GATEWAY_PORT` - Gateway port (default: 3000)
- `MOVIES_SERVICE_URL` - Movies service URL
- `USERS_SERVICE_URL` - Users service URL

**Movies & Users Services:**
- `DB_HOST` - Database host
- `DB_USER` - Database user
- `DB_PASSWORD` - Database password
- `DB_NAME` - Database name
- `JWT_SECRET` - JWT secret key

**SMS Service:**
- `SMS_PROVIDER` - SMS provider (twilio)
- `TWILIO_ACCOUNT_SID` - Twilio account SID
- `TWILIO_AUTH_TOKEN` - Twilio auth token
- `TWILIO_PHONE_NUMBER` - Twilio phone number

## Architecture

The application follows a **microservices architecture**:

- **API Gateway**: Single entry point for all client requests
- **Services**: Independent services for different business domains
- **Shared Components**: Reusable middleware, utilities, and models
- **SMS Service**: Notification service for all other services

## Contributing

1. Follow the project structure and naming conventions
2. Use the shared middleware and utilities
3. Write unit tests for new features
4. Update documentation when adding new endpoints

## License

ISC

