# 🚀 Quick Start Guide

## Afrobeats San Diego - Backend & Admin Dashboard

### Step 1: Start MongoDB
Make sure MongoDB is running on your system.

**Windows:**
```powershell
# Start MongoDB service (if installed as service)
net start MongoDB

# OR run mongod directly
mongod
```

**If you don't have MongoDB installed locally:**
- Sign up for free MongoDB Atlas: https://www.mongodb.com/cloud/atlas
- Create a cluster and get your connection string
- Update `MONGODB_URI` in `server/.env` file

### Step 2: Start Backend Server
```bash
cd server
npm start
```

✅ Server should be running on: http://localhost:5000

### Step 3: Start Frontend
Open a NEW terminal window:
```bash
cd client
npm run dev
```

✅ Frontend should be running on: http://localhost:3000

### Step 4: Access Admin Dashboard
1. Open browser: http://localhost:3000/admin/login
2. Login with:
   - Email: `info@afrobeatsandiego.com`
   - Password: `password123`
3. Start managing your content!

---

## 📱 What You Can Do

### Admin Dashboard Features:
- ✅ **Events**: Add, edit, delete calendar events
- ✅ **News**: Manage "What's Poppin" news posts
- ✅ **Shop**: Add products with prices
- ✅ **Submissions**: Review user-submitted events and connect forms

### Main Website:
- Visit http://localhost:3000 to see the public website
- Submit events and connect forms - they'll appear in admin dashboard
- All data now comes from your database!

---

## 🔧 Troubleshooting

**"Cannot connect to MongoDB"**
- Make sure MongoDB is running
- Check connection string in `server/.env`

**"Port 5000 already in use"**
- Stop any other process using port 5000
- Or change PORT in `server/.env`

**"Login not working"**
- Make sure backend server is running
- Check browser console for errors
- Verify credentials match `server/.env`

---

## 📚 More Information

See `server/README.md` for complete documentation.

Check `walkthrough.md` artifact for detailed implementation guide.
