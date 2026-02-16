# Afrobeats San Diego - Backend Server & Admin Dashboard

Complete backend server with MongoDB, Express, and admin dashboard for managing events, news, shop items, and submissions.

## 🚀 Features

### Backend API
- **Events Management** - Create, read, update, delete calendar events
- **News Management** - Manage "What's Poppin" news posts
- **Shop Management** - Handle merchandise and products
- **Form Submissions** - Collect and manage Connect form and Calendar submissions
- **Authentication** - JWT-based admin authentication
- **File Uploads** - Image upload functionality

### Admin Dashboard
- **Secure Login** - Protected admin portal with JWT authentication
- **Events Dashboard** - Full CRUD operations for calendar events
- **News Dashboard** - Manage news posts with trending toggle
- **Shop Dashboard** - Manage products with pricing and inventory
- **Submissions Dashboard** - Review and approve user submissions
- **Statistics Dashboard** - Overview of all content

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **npm** or **yarn**

## 🛠️ Installation

### 1. Install Backend Dependencies
```bash
cd server
npm install
```

### 2. Configure Environment Variables
The `.env` file is already created in the server folder. Update the MongoDB URI if needed:

```env
# Default configuration
PORT=5000
MONGODB_URI=mongodb://localhost:27017/afrobeats-sandiego

# Admin credentials
ADMIN_EMAIL=info@afrobeatsandiego.com
ADMIN_PASSWORD=password123
```

**For MongoDB Atlas:**
Replace `MONGODB_URI` with your connection string:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/afrobeats-sandiego
```

### 3. Start MongoDB (if using local)
```bash
# Windows
mongod

# macOS/Linux
sudo systemctl start mongod
```

## 🎯 Running the Application

### Start Backend Server
```bash
cd server
npm start

# For development with auto-reload
npm run dev
```

The server will run on `http://localhost:5000`

### Start Frontend Client
```bash
cd client
npm run dev
```

The client will run on `http://localhost:3000`

## 🔐 Admin Access

1. Navigate to `http://localhost:3000/admin/login`
2. Login with credentials:
   - **Email:** info@afrobeatsandiego.com
   - **Password:** password123
3. Access the admin dashboard

## 📚 API Endpoints

### Public Endpoints
- `GET /api/events` - Get all events
- `GET /api/news` - Get all news posts
- `GET /api/shop` - Get all shop items
- `POST /api/calendar` - Submit calendar event
- `POST /api/connect` - Submit connect form

### Protected Endpoints (Require JWT Token)
- `POST /api/events` - Create event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event
- `POST /api/news` - Create news post
- `PUT /api/news/:id` - Update news post
- `DELETE /api/news/:id` - Delete news post
- `POST /api/shop` - Create shop item
- `PUT /api/shop/:id` - Update shop item
- `DELETE /api/shop/:id` - Delete shop item
- `GET /api/calendar` - Get submissions
- `PUT /api/calendar/:id/approve` - Approve submission
- `GET /api/connect` - Get connect submissions

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/verify` - Verify token
- `GET /api/auth/me` - Get current admin

## 📁 Project Structure

```
server/
├── config/
│   └── db.js                 # MongoDB connection
├── middleware/
│   ├── auth.js              # JWT authentication
│   └── upload.js            # File upload handler
├── models/
│   ├── Admin.js             # Admin user model
│   ├── Event.js             # Event model
│   ├── News.js              # News post model
│   ├── ShopItem.js          # Shop item model
│   ├── ConnectSubmission.js # Connect form model
│   └── CalendarSubmission.js # Calendar submission model
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── events.js            # Events routes
│   ├── news.js              # News routes
│   ├── shop.js              # Shop routes
│   ├── connect.js           # Connect form routes
│   ├── calendar.js          # Calendar submission routes
│   └── upload.js            # File upload routes
├── uploads/                  # Uploaded files directory
├── .env                     # Environment variables
├── .gitignore
├── package.json
└── index.js                 # Server entry point

client/
├── app/
│   ├── admin/
│   │   ├── dashboard/       # Admin dashboard
│   │   ├── events/          # Events management
│   │   ├── news/            # News management
│   │   ├── shop/            # Shop management
│   │   ├── submissions/     # Submissions review
│   │   ├── login/           # Admin login
│   │   └── layout.js        # Admin layout
│   └── page.js              # Main page
├── components/
│   ├── admin/
│   │   └── ProtectedRoute.jsx
│   └── ...
├── hooks/
│   └── useAuth.js           # Authentication hook
└── lib/
    └── api.js               # API client
```

## 🔧 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check the connection string in `.env`
- Verify network access in MongoDB Atlas (if using cloud)

### CORS Errors
- Backend server must be running on port 5000
- Frontend must be running on port 3000
- Check CORS middleware is configured in `server/index.js`

### Authentication Issues
- Clear browser localStorage and try logging in again
- Verify JWT_SECRET is set in `.env`
- Check admin credentials match `.env` values

## 🔒 Security Notes

⚠️ **IMPORTANT FOR PRODUCTION:**
- Change the JWT_SECRET to a strong, random value
- Use environment-specific .env files
- Implement rate limiting
- Add input sanitization
- Use HTTPS
- Implement proper password hashing iterations
- Consider implementing refresh tokens
- Add role-based access control for multiple admins

## 📝 License

ISC
