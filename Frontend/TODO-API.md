# Frontend Backend-Aligned Redesign for API Integration

## Backend Capabilities:
- Auth: POST /api/users/login
- Admin: POST /api/users/admin/users, GET /api/users/users
- All: GET /api/users/me

## Plan Steps:

**1. Auth/Login (login.html)**
- [ ] Real API login POST
- [ ] JWT localStorage
- [ ] Role-based redirect from response

**2. Admin Dashboard (admin.html)**
- [ ] GET /api/users/users → render table
- [ ] Protected route (401 handler)

**3. Role Dashboards**
- [ ] Manager/Employee: GET /api/users/me + team stub
- [ ] Remove heavy task/schedule until backend APIs

**4. Global**
- [ ] JWT header interceptor
- [ ] Logout clear token
- [ ] Error handling (401 → login)

**5. Test**
- [ ] npm run dev + frontend open
