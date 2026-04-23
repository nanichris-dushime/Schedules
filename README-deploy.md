Deploying to Render
-------------------

1. In the Render dashboard, create a new Web Service and connect your repository.
2. Use the following build and start commands:
   - Build Command: npm install
   - Start Command: npm start
3. Set the environment variables in the Render service settings (do not commit secrets):
   - PORT (optional) - Render provides a port automatically via $PORT. You can leave unset.
   - DB_HOST = sql.freedb.tech
   - DB_PORT = 3306
   - DB_USER = <your freedb username> (e.g. freedb_nanichris-dushime)
   - DB_PASSWORD = <your freedb password>
   - DB_NAME = freedb_Schedulesdb
   - JWT_SECRET = <your jwt secret>

Notes:
- The repository includes `render.yaml` which provides a baseline configuration; you can edit or remove it and set env vars via the Render UI.
- `.env` is listed in `.gitignore` so credentials won't be committed. Use the Render Dashboard Secrets instead of `.env` in production.
