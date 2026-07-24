# AI Email Reply Generator

## Run Locally

Backend:

```powershell
cd backend
py -3.12 -m pip install -r requirements.txt
copy .env.example .env
py -3.12 -m uvicorn backend.main:app --reload --port 8000
```

Frontend:

```powershell
cd frontend
npm install
npm run dev
```

The frontend talks to `http://localhost:8000` by default.

If you want Gemini-generated replies, set `GEMINI_API_KEY` in `backend/.env`. If it is missing, the app will still run with a local fallback reply.


python -m uvicorn main:app --reload --port 8000