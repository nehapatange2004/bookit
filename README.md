# Bookit - Travel Experience Booking 

## Project Overview
Highway Delite is a full-stack web application for booking travel experiences and adventures. The platform offers various activities like kayaking, mountain trekking, scuba diving, camping, and more.

## Technology Stack

### Backend
- Node.js + Express.js
- MongoDB (with Mongoose)
- Environment: Node.js

### Frontend
- React + TypeScript
- Vite as build tool
- Tailwind CSS for styling
- Shadcn/ui components
- Bun package manager

## Setup Instructions
```bash
git clone https://github.com/nehapatange2004/bookit.git
```
### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
echo "PORT=5000
MONGO_URI=your_mongodb_connection_string" > .env

# Start the server
npm start
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
bun install

# Create .env file
echo "VITE_BACKEND_URL=http://localhost:5000" > .env

# Start the development server
bun dev
```

## API Routes

### Experiences
```
GET /experiences     # Get all available experiences
GET /experiences/:id # Get a specific experience by ID
```

### Bookings
```
GET /bookings       # Get all bookings for a user
POST /bookings      # Create a new booking
```

### Promo Codes
```
POST /promo/apply   # Apply a promo code to a booking
```

## Valid Promo Codes

| Code       | Type      | Value    | Min Amount | Validity            | Notes                |
|------------|-----------|----------|------------|---------------------|----------------------|
| WELCOME100 | Flat      | ₹100 off | ₹500       | Dec 31, 2026       | -                    |
| FESTIVE20  | Percent   | 20% off  | ₹1,000    | Nov 15, 2026       | -                    |
| NEWUSER50  | Percent   | 50% off  | ₹300      | Dec 31, 2026       | Single-use only      |
| TRAVEL500  | Flat      | ₹500 off | ₹2,500    | Nov 30, 2026       | -                    |
| FLASH10    | Percent   | 10% off  | None      | Oct 30, 2026       | -                    |

## Features

### 1. Experience Browsing
- Grid view of available experiences
- Filtering by category
- Search functionality
- Detailed view for each experience

### 2. Booking System
- Date and time slot selection
- Real-time availability checking
- Promo code application
- Booking summary

### 3. Promo Code System
- Multiple discount types (flat and percentage)
- Minimum amount requirements
- Usage limit tracking
- Validity period checking

### 4. User Interface
- Responsive design
- Modern UI components
- Toast notifications
- Loading states
- Error handling

### 5. Available Experience Categories
- Water Sports
- Adventure
- Nature
- Leisure

## Project Structure
```
project/
├── backend/
│   ├── controllers/
│   │   ├── bookings.controller.js
│   │   ├── experiences.controller.js
│   │   └── promo.controller.js
│   ├── models/
│   │   ├── Booking.js
│   │   ├── Experience.js
│   │   └── Promo.js
│   ├── routes/
│   │   ├── bookings.routes.js
│   │   ├── experiences.routes.js
│   │   └── promo.routes.js
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   └── types/
│   ├── package.json
│   └── vite.config.ts
```

## Deployment
- Backend is deployed on Render

- Frontend is deployed on Netlify

