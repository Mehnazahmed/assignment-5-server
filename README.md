Sports Facility Booking Platform
Welcome to the Sports Facility Booking Platform. This application allows users to book sports facilities, check availability, and manage their bookings with ease. Admins can manage facilities and view all bookings.

Features
User Authentication: Sign up and log in as a user or admin.
Facility Management: Admins can create, update, delete, and view facilities.
Booking Management: Users can check availability, create, view, and cancel bookings.
Role-Based Access Control: Secure routes for users and admins.
Error Handling: Comprehensive error handling for robust application performance.
Validation: Input validation using Zod to ensure data consistency.
Technologies Used
Backend: Node.js, Express.js
Database: MongoDB, Mongoose
Authentication: JWT, bcryptjs
Validation: Zod
Environment Management: dotenv
Setup and Installation
Prerequisites
Node.js and npm installed
MongoDB installed and running
Installation
Clone the Repository

bash
Copy code
git clone https://github.com/Mehnazahmed/Assignment-3
cd sports-facility-booking
Install Dependencies

bash
Copy code
npm install
Configure Environment Variables
Create a .env file in the root directory and add the following variables:

env
Copy code
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
Run the Application

bash
Copy code
npm run dev
Access the Application
The application will be running at http://localhost:5000

Environment Variables
The application uses the following environment variables:

PORT: The port number on which the server runs (default: 5000).
MONGO_URI: The MongoDB connection string.
JWT_SECRET: The secret key for JWT authentication.
API Endpoints
Auth Routes
Sign Up

POST /api/auth/signup
Request Body:
json
Copy code
{
"name": "John Doe",
"email": "john@example.com",
"password": "password123",
"phone": "1234567890",
"role": "user",
"address": "123 Main St"
}
Log In

POST /api/auth/login
Request Body:
json
Copy code
{
"email": "john@example.com",
"password": "password123"
}
Facility Routes
Create Facility (Admin Only)

POST /api/facility
Request Body:
json
Copy code
{
"name": "Tennis Court",
"description": "Outdoor tennis court with synthetic surface.",
"pricePerHour": 30,
"location": "456 Sports Ave"
}
Update Facility (Admin Only)

PUT /api/facility/:id
Request Body:
json
Copy code
{
"name": "Updated Tennis Court",
"description": "Updated outdoor tennis court with synthetic surface.",
"pricePerHour": 35,
"location": "789 Sports Ave"
}
Delete Facility (Admin Only)

DELETE /api/facility/:id
Get All Facilities

GET /api/facility
Booking Routes
Check Availability

GET /api/check-availability?date=YYYY-MM-DD
Create Booking (User Only)

POST /api/bookings
Request Body:
json
Copy code
{
"facility": "facility_id",
"date": "2024-06-15",
"startTime": "10:00",
"endTime": "13:00"
}
View All Bookings (Admin Only)

GET /api/bookings
View User Bookings (User Only)

GET /api/bookings/user
Cancel Booking (User Only)

DELETE /api/bookings/:id
