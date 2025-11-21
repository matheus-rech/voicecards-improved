# Full-Stack Setup Guide

## Project Structure

```
voicecards-improved/
├── backend/
│   ├── server.js              # Express server
│   ├── config/
│   │   └── database.js        # Supabase client
│   ├── middleware/
│   │   └── auth.js            # Authentication middleware
│   ├── routes/
│   │   ├── auth.js            # User authentication
│   │   ├── decks.js           # Deck CRUD operations
│   │   ├── cards.js           # Card CRUD operations
│   │   ├── sessions.js        # Study sessions
│   │   └── stats.js           # User statistics
│   └── database/
│       └── schema.sql         # PostgreSQL schema
├── frontend/
│   ├── index.html             # Main HTML file (to be moved)
│   ├── css/                   # CSS files
│   └── src/                   # JavaScript modules
├── package.json
├── .env.example
└── README.md
```

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to **SQL Editor** and run the schema from `backend/database/schema.sql`
4. Go to **Settings → API** and copy:
   - Project URL → `SUPABASE_URL`
   - `anon` `public` key → `SUPABASE_ANON_KEY`
   - `service_role` `secret` key → `SUPABASE_SERVICE_ROLE_KEY`

## Step 3: Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:

```env
PORT=5000
NODE_ENV=development
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
JWT_SECRET=generate_a_random_string_here
CORS_ORIGINS=http://localhost:3000,http://localhost:5000
```

## Step 4: Run Database Schema

1. Open Supabase Dashboard → SQL Editor
2. Copy contents of `backend/database/schema.sql`
3. Run the SQL script
4. Verify tables are created: `decks`, `cards`, `card_progress`, `sessions`

## Step 5: Start Development Servers

### Option A: Run Both Together (Recommended)
```bash
npm run dev
```

### Option B: Run Separately

Terminal 1 (Backend):
```bash
npm run dev:backend
```

Terminal 2 (Frontend):
```bash
npm run dev:frontend
```

## Step 6: Access the App

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## Next Steps

1. **Move Frontend**: Copy `voice-flashcard-prototype.html` to `frontend/index.html`
2. **Update Frontend**: Modify frontend to use API endpoints instead of IndexedDB
3. **Add Authentication UI**: Create login/register forms
4. **Test API**: Use Postman or curl to test endpoints

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Decks
- `GET /api/decks` - Get user's decks
- `GET /api/decks/public` - Get public decks
- `GET /api/decks/:id` - Get single deck
- `POST /api/decks` - Create deck
- `PUT /api/decks/:id` - Update deck
- `DELETE /api/decks/:id` - Delete deck

### Cards
- `GET /api/cards/deck/:deckId` - Get cards in deck
- `GET /api/cards/:id` - Get single card
- `POST /api/cards` - Create card
- `PUT /api/cards/:id` - Update card
- `DELETE /api/cards/:id` - Delete card

### Sessions
- `GET /api/sessions` - Get user's sessions
- `POST /api/sessions` - Create session
- `PUT /api/sessions/:id` - Update session

### Stats
- `GET /api/stats` - Get user statistics

## Testing the API

```bash
# Health check
curl http://localhost:5000/api/health

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## Deployment

### Backend Deployment Options:
- **Vercel**: `vercel --prod`
- **Railway**: Connect GitHub repo
- **Render**: Connect GitHub repo
- **Heroku**: `git push heroku main`

### Frontend Deployment:
- **Vercel**: Deploy `frontend/` folder
- **Netlify**: Deploy `frontend/` folder
- **GitHub Pages**: Deploy static files

## Troubleshooting

### "Supabase credentials not found"
- Check `.env` file exists and has correct values
- Restart the server after changing `.env`

### "Table does not exist"
- Run the SQL schema in Supabase SQL Editor
- Check table names match exactly

### CORS errors
- Add your frontend URL to `CORS_ORIGINS` in `.env`
- Restart server after changes

