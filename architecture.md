# FigScreen Architecture Documentation

## System Overview

FigScreen is a web application that enables users to capture website screenshots and integrate them directly into Figma projects. The application follows a modern web architecture using Next.js with API routes and integrates with several external services.

## Architecture Components

### 1. Frontend Architecture

```mermaid
graph TD
    A[Figma Plugin] --> B[Next.js Frontend]
    B --> C[Authentication Layer]
    B --> D[API Layer]
    B --> E[Dashboard UI]
```

#### Key Components:

- **Figma Plugin Interface**: Handles interaction with Figma workspace
- **Dashboard**: User interface for managing profile and credits
- **Authentication UI**: Handles user login/signup via Google OAuth

### 2. Backend Architecture

```mermaid
graph TD
    A[Next.js API Routes] --> B[Authentication Middleware]
    B --> C[Business Logic Layer]
    C --> D[Database Layer]
    C --> E[External Services]
    E --> F[LemonSqueezy]
    E --> G[Resend Email]
    E --> H[Google OAuth]
```

#### API Layer:

- **Verify API**: Authenticates user tokens for Figma plugin
- **Deduct API**: Manages credit deduction system
- **SaveTransaction API**: Records screenshot transactions

### 3. Database Schema

```mermaid
erDiagram
    User ||--o{ Transaction : has
    User {
        string id
        string email
        string name
        string apiToken
        int credits
        datetime createdAt
        datetime updatedAt
    }
    Transaction {
        string id
        string userId
        string website
        datetime createdAt
    }
```

### 4. Authentication Flow

```mermaid
sequenceDiagram
    participant User
    participant FigmaPlugin
    participant APIAuth
    participant Google
    participant Database

    User->>FigmaPlugin: Initiate Login
    FigmaPlugin->>APIAuth: Request Auth using API Token
    APIAuth->>Database: Verifies User using token
    APIAuth-->>FigmaPlugin: Return User Id, User Name and Credits
```

## External Service Integration

### 1. Payment System (LemonSqueezy)

- Handles payment processing for credits
- Manages subscription variants
- Webhook integration for payment events

### 2. Email Service (Resend)

- Handles authentication emails
- Handles transactional emails
- User notifications
- System alerts

### 3. Authentication (Google OAuth)

- User authentication
- Session management
- Security layer

### Frontend

- Next.js 14+ (App Router)
- React
- Tailwind CSS
- Figma Plugin SDK

### Backend

- Next.js API Routes
- Prisma ORM
- PostgreSQL Database
- NextAuth.js

### Infrastructure

- Environment: Development/Production modes
- Database: PostgreSQL
- API Authentication: Bearer token system
- Email: Resend API
- Payments: LemonSqueezy Integration

## Data Flow

1. **Screenshot Capture Flow**:

```mermaid
sequenceDiagram
    participant FigmaPlugin
    participant API
    participant Database
    participant User

    FigmaPlugin->>API: Verify API Token
    API->>Database: Check User Credits
    API-->>FigmaPlugin: Authorization Status
    FigmaPlugin->>API: Capture Screenshot
    API->>Database: Deduct Credit
    API->>Database: Save Transaction
    API-->>FigmaPlugin: Success Response
```

## Security Measures

1. **API Security**:

   - Bearer token authentication
   - Rate limiting (recommended)
   - Input validation
   - CORS configuration

2. **Data Security**:
   - Encrypted environment variables
   - Secure database connections
   - Protected API routes

## Scalability Considerations

1. **Database Optimization**:

   - Index on frequent queries
   - Connection pooling
   - Transaction management

2. **Performance**:
   - API response caching
   - Optimized database queries
   - Efficient credit management

## Development Workflow

1. **Local Development**:

   - Environment setup
   - Database migration
   - API testing

2. **Production Deployment**:
   - Build optimization
   - Environment configuration
   - Database synchronization

## Monitoring and Maintenance

1. **System Monitoring**:

   - API endpoint health
   - Database performance
   - User credit tracking

2. **Error Handling**:
   - Structured error responses
   - Transaction logging
   - User notification system

## Future Considerations

1. **Scalability**:

   - Implement caching layer
   - Add rate limiting
   - Optimize database queries

2. **Features**:
   - Batch screenshot processing
   - Advanced screenshot customization