export const sampleTechnicalDoc = `# Database Configuration Guide

## Introduction

This guide explains how to configure database connections for your application. Proper database configuration is essential for performance and reliability.

## Connection Settings

To configure your database connection, you need to specify several parameters. The connection string format depends on which database you're using.

### PostgreSQL Configuration

For PostgreSQL databases, use the following connection string format: postgresql://username:password@hostname:port/database_name

The username and password should match the credentials you created when setting up your database. Make sure to use strong passwords in production environments.

### Connection Pooling

Connection pooling improves application performance by reusing database connections instead of creating new ones for each request. This reduces overhead and allows your application to handle more concurrent users.

To enable connection pooling, set the pool_size parameter to the maximum number of connections you want to maintain. A good starting point is 10-20 connections for most applications.

The pool_timeout parameter controls how long the application waits for an available connection before timing out. Set this to 30 seconds or more to avoid unnecessary timeout errors.

### SSL Configuration

For production environments, always use SSL to encrypt database connections. This protects sensitive data from being intercepted during transmission.

To enable SSL, add sslmode=require to your connection string. For additional security, you can also specify the path to your SSL certificate files using the sslcert and sslkey parameters.

## Performance Tuning

Database performance can be optimized through several configuration parameters. The most important ones are related to memory allocation and query optimization.

### Memory Settings

Increase the shared_buffers setting to allocate more memory for caching data. A good rule of thumb is to set this to 25% of your total system memory.

The work_mem parameter controls memory used for sorting and hash operations. Increase this if you have complex queries with large result sets.

### Query Optimization

Enable query logging to identify slow queries. Set log_min_duration_statement to 1000 (milliseconds) to log queries that take longer than one second.

Use EXPLAIN ANALYZE to understand query execution plans and identify optimization opportunities.`;

export const sampleAPIDoc = `# User Authentication API

## POST /api/auth/login

Authenticates a user and returns an access token.

**Request Body:**
- email (string, required): User's email address
- password (string, required): User's password
- remember_me (boolean, optional): Whether to extend session duration

**Response:**
- 200 OK: Returns access token and user information
- 401 Unauthorized: Invalid credentials
- 429 Too Many Requests: Rate limit exceeded

**Example Request:**
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123",
  "remember_me": true
}

**Example Response:**
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "expires_in": 3600
}

## GET /api/users/:id

Retrieves information about a specific user.

**Parameters:**
- id (string, required): User ID

**Headers:**
- Authorization (string, required): Bearer token from login

**Response:**
- 200 OK: Returns user information
- 401 Unauthorized: Invalid or missing token
- 404 Not Found: User does not exist

**Example Request:**
GET /api/users/123
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

**Example Response:**
{
  "id": "123",
  "email": "user@example.com",
  "name": "John Doe",
  "created_at": "2024-01-15T10:30:00Z",
  "role": "user"
}`;
