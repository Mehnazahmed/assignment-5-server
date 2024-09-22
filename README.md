# Sports Facility Booking Platform - Backend

This project is a full-stack sports facility booking application. It allows users to book sports facilities, check availability, and manage their bookings. Admins have the ability to manage facilities, view bookings, and handle user management. The application is divided into backend and frontend repositories.

# Features

## User Features:

-**Sign Up / Log In**: Users can register and log in to the platform.

-**Book Facilities**: Users can view available facilities, check availability, and create bookings.

-**Manage Bookings**: Users can view and cancel their bookings.

# Admin Features:

-**Facility Management**: Admins can create, update, delete, and view facilities. -**Booking Management**: Admins can view all bookings.

# General Features:

-**Role-Based Access Control**: Secure routes for users and admins. -**Error Handling**: Comprehensive error handling ensures a robust application. -**Validation**: Zod validation ensures input data consistency.

## Technologies Used

### Core Libraries:

### Backend:

-**Node.js and Express.js** for building the server-side application. -**MongoDB and Mongoose** for database management. -**JWT and bcryptjs** for authentication and authorization. -**Zod** for schema validation.

### Frontend:

-**React** for the user interface. -**Redux** for state management. -**TypeScript** for scalability and type safety. -**Ant Design** for UI components. -**Tailwind CSS** for styling. -**Sonner** for toast notifications.

### Additional Technologies:

- **Toast Notifications**: Notifications are managed using the `sonner` library for displaying messages and alerts to users.

### DevOps:

- **pnpm**: An efficient package manager (optional).
- **npm**: The default package manager.

## Getting Started

### Backend Setup and Installation

## Prerequisites

-**Install Node.js and npm.**
-Ensure MongoDB is installed and running.
-Installation
-Clone the Backend Repository:
-Clone the repository to your local machine:

```bash
git clone https://github.com/Mehnazahmed/assignment-5-server.git
cd assignment-5-server




```

```bash
Install all required dependencies using npm or pnpm:

npm install

```

```bash
Running the Development Server
To start the development server, use the following command:

bash
Copy code
npm run dev

```

```bash
Building for Production
To create a production build of the project, run:

bash
Copy code
npm run build

```

````


```bash
Configure Environment Variables:
Make sure to configure the necessary environment variables in a .env file at the root of the project. Example:

bash
Copy code
NEXT_PUBLIC_API_URL=http://your-api-url.com
NEXT_PUBLIC_STRIPE_KEY=your-stripe-public-key
NEXTAUTH_SECRET=your-auth-secret
NODE_ENV= development
PORT=5000
DATABASE_URL=mongodb+srv://"":""@cluster0.sn1j5xu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0


JWT_ACCESS_SECRET=
JWT_ACCESS_EXPIRES_IN=2d
JWT_REFRESH_SECRET=

JWT_REFRESH_EXPIRES_IN=3d
SUPER_ADMIN_PASSWORD=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

STORE_ID=
SIGNATUREKEY=
PAYMENT_URL=
PAYMENT_VERIFY_URL=
````

```bash
npm run dev
```

The backend server will be running at http://localhost:5000.

## Backend API Endpoints

## Authentication:

**POST /api/auth/signup – Register a new user.**
**POST /api/auth/login – Log in to the platform.**
**Facility Management (Admin Only):**

**POST /api/facility – Create a new facility.**
**PUT /api/facility/:id – Update an existing facility.**
**DELETE /api/facility/:id – Delete a facility.**
**GET /api/facility – Get all available facilities.**

## Booking:

**GET /api/check-availability?date=YYYY-MM-DD – Check facility availability.**
**POST /api/bookings – Create a new booking.**
**GET /api/bookings/user – View user bookings.**
**DELETE /api/bookings/:id – Cancel a booking.**

## seeded Admin

email: admin@gmail.com
password: admin123
