# 🇯🇵 AI Study Buddy

An AI-powered learning platform designed to help students prepare for the Japanese Language Proficiency Test (JLPT). The application generates personalized quizzes, creates AI-powered study plans, provides an intelligent Japanese tutor, and tracks learning progress using AWS DynamoDB.

---

## 🚀 Features

### 🧠 AI Quiz Generator
- Generate unlimited JLPT quizzes using Google Gemini AI.
- Select JLPT Level (N5–N1).
- Choose quiz category:
  - Vocabulary
  - Grammar
  - Kanji
  - Reading
  - Listening
- Select number of questions.
- Instant scoring and answer review.

### 🤖 AI Tutor
- Ask questions about Japanese grammar.
- Learn vocabulary meanings.
- Get kanji explanations.
- Receive sentence structure guidance.

### 📅 AI Study Plan
- Generate personalized JLPT study schedules.
- Based on:
  - Target level
  - Exam date
  - Daily study hours
- Week-by-week learning roadmap.

### 📊 Dashboard
- Track quiz history.
- Highest score.
- Average score.
- Total quizzes completed.
- Recent quiz attempts.

---

# 🛠 Tech Stack

## Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router DOM

## Backend
- Node.js
- Express.js

## AI
- Google Gemini API (Gemini 2.5 Flash)

## Database
- AWS DynamoDB

## Deployment
- Vercel (Frontend)
- Render (Backend)

---

# 🏗 Architecture

```
User
   │
   ▼
React + Vite (Frontend)
   │
REST API (Axios)
   │
   ▼
Node.js + Express
   │
   ├────────► Google Gemini API
   │             │
   │             ▼
   │      AI Quiz Generation
   │      AI Tutor
   │      Study Plan
   │
   ▼
AWS DynamoDB
   │
   ▼
Quiz Results & Dashboard
```

---

# 📂 Project Structure

```
AI-Study-Buddy/

frontend/
│
├── src/
│   ├── api/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   └── App.jsx
│
└── package.json

backend/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   └── server.js
│
└── package.json
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/your-username/AI-Study-Buddy.git
```

---

## Backend

```bash
cd backend

npm install

npm run dev
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 🔑 Environment Variables

## Backend (.env)

```env
PORT=5000

AWS_REGION=

AWS_ACCESS_KEY_ID=

AWS_SECRET_ACCESS_KEY=

GEMINI_API_KEY=
```

---

## Frontend (.env)

```env
VITE_API_URL=http://localhost:5000
```

---

# 🎯 How It Works

1. User selects:
   - JLPT Level
   - Category
   - Number of Questions

2. Backend requests Google Gemini API.

3. Gemini generates AI quiz questions.

4. User answers the quiz.

5. Backend evaluates the answers.

6. Results are stored in AWS DynamoDB.

7. Dashboard displays user progress and quiz history.

---

# 🚀 Deployment

Frontend

- Vercel

Backend

- Render

---

# 🌟 Future Improvements

- Voice-based Japanese pronunciation practice
- AI speaking assessment
- Daily challenge mode
- Flashcards with spaced repetition
- Leaderboard
- JLPT mock exams
- User profiles and cloud sync

---

# 👨‍💻 Author

**Mohit Chauhan**

