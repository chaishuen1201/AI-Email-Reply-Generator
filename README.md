# AI Email Reply Generator
<p align="center">
  <img src="https://github.com/user-attachments/assets/edf777b0-1358-410c-8f1e-e42b18985559" width="700" />
</p>


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

---

## System Architecture

```
User
 |
 | React + Vite
 |
 | HTTPS API Request
 |
 v
FastAPI Backend
 |
 | Google Gemini API
 |
 v
Generated Email Response
```

---

## Project Structure

```
AI-Email-Reply-Generator/

├── backend/
│   ├── main.py
│   ├── routes.py
│   ├── models.py
│   ├── services.py
│   ├── prompts.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## Running Locally

### Clone Repository

```bash
git clone https://github.com/chaishuen1201/AI-Email-Reply-Generator.git

cd AI-Email-Reply-Generator
```

---

# Backend Setup

Navigate to backend:

```bash
cd backend
```

Create virtual environment:

```bash
python -m venv .venv
```

Activate virtual environment:

Windows:

```bash
.venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create `.env` file:

```env
GEMINI_API_KEY=your_api_key_here
```

Start backend server:

```bash
uvicorn main:app --reload
```

Backend runs at:

```
http://localhost:8000
```

API documentation:

```
http://localhost:8000/docs
```

---

# Frontend Setup

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
VITE_API_URL=http://localhost:8000
```

Start development server:

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## API Endpoints

### Health Check

```
GET /
```

### Generate Email

```
POST /generate
```

### Streaming Email Generation

```
POST /generate/stream
```

---

## Deployment

The application is deployed using:

### Frontend

Platform:

```
Vercel
```

Production URL:

```
https://ai-email-reply-generator-sand.vercel.app/
```

### Backend

Platform:

```
Render
```

The backend runs as a FastAPI web service with environment-based Gemini API configuration.

---

## Environment Variables

### Backend

Required:

```env
GEMINI_API_KEY=your_gemini_api_key
```

### Frontend

Required:

```env
VITE_API_URL=your_backend_url
```

Environment variables are excluded from version control to prevent exposing sensitive information.

---

## Future Improvements

- User authentication
- Email history and saved drafts
- Multiple AI model support
- Gmail and Outlook integration
- Personal writing style adaptation
- Email export functionality

---

## Author

Built as a full-stack AI application using React, FastAPI, and Google Gemini.

If you find this project useful, consider starring the repository.
