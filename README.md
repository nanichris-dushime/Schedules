# Schedule — Smart Employee Scheduling System

A full-stack employee scheduling system built with Node.js, Express, Sequelize, MySQL, and vanilla HTML/CSS/JS.

## Tech Stack

- **Backend**: Node.js + Express + Sequelize ORM
- **Database**: MySQL (Render MySQL on production)
- **Frontend**: HTML + CSS + Vanilla JS (served as static files by Express)
- **Auth**: JWT (role-based: admin / manager / employee)

---

## Local Development

### 1. Clone & install
```bash
git clone https://github.com/nanichris-dushime/Schedules.git
cd Schedules
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Edit .env with your local MySQL credentials
```

### 3. Run
```bash
npm run dev
```

Open `http://localhost:5000` in your browser.

---

## Deploy to Render

### One-click via render.yaml

1. Push this repo to GitHub
2. Go to [render.com](https://render.com) → **New** → **Blueprint**
3. Connect your GitHub repo — Render will detect `render.yaml` automatically
4. It will create:
   - A **MySQL database** (`schedules-db`)
   - A **Web Service** (`schedules-app`) with `DATABASE_URL` auto-injected
5. Click **Apply** — deployment starts automatically

### Manual setup (alternative)

1. Create a **MySQL** database on Render → copy the **Internal Connection String**
2. Create a **Web Service**:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     - `DATABASE_URL` = (paste Internal Connection String)
     - `JWT_SECRET` = (any long random string)
     - `NODE_ENV` = `production`

---

## Default Seed User

After first deploy, run the seed script once via Render Shell:
```bash
npm run db:sync
```

This creates:
- **Admin**: `admin@example.com` / `password123`

---

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/users/login` | Public | Login |
| GET | `/api/users/users` | Admin | All users |
| POST | `/api/users/admin/users` | Admin | Create user |
| PUT | `/api/users/admin/users/:id` | Admin | Update user |
| DELETE | `/api/users/admin/users/:id` | Admin | Delete user |
| GET | `/api/users/employees` | Admin/Manager | List employees |
| GET | `/api/users/me` | Any | Current user |
| PUT | `/api/users/me` | Any | Update profile |
| PATCH | `/api/users/me/password` | Any | Change password |
| GET | `/api/tasks` | Any | All tasks |
| POST | `/api/tasks` | Admin/Manager | Create task |
| DELETE | `/api/tasks/:id` | Admin/Manager | Delete task |
| GET | `/api/assignments` | Any | Assignments |
| POST | `/api/assignments` | Admin/Manager | Assign employee |
| PATCH | `/api/assignments/:id/status` | Employee | Confirm/Reject |
| GET | `/api/notifications` | Any | Notifications |
| PATCH | `/api/notifications/read-all` | Any | Mark all read |
| PATCH | `/api/notifications/:id/read` | Any | Mark one read |
