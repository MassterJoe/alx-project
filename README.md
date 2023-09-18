# Multiple Choice Questions (MCQ) API Documentation

Author: Salawu O. Joseph


This API allows you to manage multiple-choice questions, including creating, retrieving, updating, and deleting questions. Users can also register and log in to access the API's protected endpoints.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Authentication](#authentication)
- [Endpoints](#endpoints)
  - [User Registration](#user-registration)
  - [User Login](#user-login)
  - [Create MCQ](#create-mcq)
  - [Get All MCQs](#get-all-mcqs)
  - [Get MCQ by ID](#get-mcq-by-id)
  - [Update MCQ by ID](#update-mcq-by-id)
  - [Delete MCQ by ID](#delete-mcq-by-id)
- [Sample Requests](#sample-requests)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed
- SQLite database for storing MCQs (configured in `./models/mcq.js`)
- Environment variables set in a `.env` file (refer to `.env.example`)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd mcq-api


1. Install dependencies:

bash

npm install

2. Start the API:

bash

    npm start

The API will be accessible at http://localhost:3000 by default.


Authentication

The API uses JWT (JSON Web Tokens) for authentication. To access protected endpoints, include the JWT token in the Authorization header as follows:

makefile

Authorization: Bearer <your-token>

Endpoints
User Registration

    URL: /api/auth/register
    Method: POST
    Description: Register a new user.
    Request Body:
        username (string, required): User's username
        password (string, required): User's password (min length: 6)
    Response:
        Status: 201 Created
        JSON: { message: 'User registered successfully' }

User Login

    URL: /api/auth/login
    Method: POST
    Description: Log in a user and receive an authentication token.
    Request Body:
        username (string, required): User's username
        password (string, required): User's password
    Response:
        Status: 200 OK
        JSON: { message: 'Login successful' }
        Headers: Authorization: Bearer <your-token>

Create MCQ

    URL: /api/mcqs
    Method: POST
    Description: Create a new MCQ question.
    Authentication: Required
    Request Body:
        question (string, required): MCQ question
        option1 (string, required): Option 1
        option2 (string, required): Option 2
        option3 (string, required): Option 3
        option4 (string, required): Option 4
        correct_option (number, required): Correct option (1-4)
    Response:
        Status: 201 Created
        JSON: { message: 'MCQ created successfully' }

Get All MCQs

    URL: /api/mcqs
    Method: GET
    Description: Retrieve a list of all MCQs.
    Authentication: Required
    Response:
        Status: 200 OK
        JSON: Array of MCQ objects

Get MCQ by ID

    URL: /api/mcqs/:id
    Method: GET
    Description: Retrieve an MCQ by its ID.
    Authentication: Required
    Response:
        Status: 200 OK
        JSON: MCQ object
        Status: 404 Not Found (if MCQ with the specified ID doesn't exist)

Update MCQ by ID

    URL: /api/mcqs/:id
    Method: PUT
    Description: Update an existing MCQ by its ID.
    Authentication: Required
    Request Body:
        Same as the "Create MCQ" endpoint
    Response:
        Status: 200 OK
        JSON: { message: 'MCQ updated successfully' }
        Status: 404 Not Found (if MCQ with the specified ID doesn't exist)

Delete MCQ by ID

    URL: /api/mcqs/:id
    Method: DELETE
    Description: Delete an MCQ by its ID.
    Authentication: Required
    Response:
        Status: 200 OK
        JSON: { message: 'MCQ deleted successfully' }
        Status: 404 Not Found (if MCQ with the specified ID doesn't exist)


Sample Requests

Here are some sample requests to help you get started:

    Register a User:

    

POST /api/auth/register
Content-Type: application/json

{
  "username": "newuser",
  "password": "newpassword"
}

Log In a User:


POST /api/auth/login
Content-Type: application/json

{
  "username": "newuser",
  "password": "newpassword"
}

Create an MCQ:


POST /api/mcqs
Content-Type: application/json
Authorization: Bearer <your-token>

{
  "question": "What is the capital of France?",
  "option1": "Paris",
  "option2": "London",
  "option3": "Berlin",
  "option4": "Madrid",
  "correct_option": 1
}

Get All MCQs:


GET /api/mcqs
Authorization: Bearer <your-token>

Get an MCQ by ID:



GET /api/mcqs/1
Authorization: Bearer <your-token>

Update an MCQ:



PUT /api/mcqs/1
Content-Type: application/json
Authorization: Bearer <your-token>

{
  "question": "Updated question",
  "option1": "Updated option 1",
  "option2": "Updated option 2",
  "option3": "Updated option 3",
  "option4": "Updated option 4",
  "correct_option": 2
}

Delete an MCQ:



DELETE /api/mcqs/1
Authorization: Bearer <your-token>

Error Handling

The API returns appropriate HTTP status codes and JSON error messages for different scenarios. Refer to each endpoint's description for details on error responses.
Contributing

Contributions are welcome! Please follow the Contributing Guidelines.
License

This project is licensed under the MIT License - see the LICENSE file for details.

