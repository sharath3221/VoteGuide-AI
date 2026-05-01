# VoteGuide AI 🗳️🤖

VoteGuide AI is a modern, interactive, and responsive web application designed to act as a personal assistant to guide users—especially first-time voters—through the entire election process.

![VoteGuide AI](/frontend/public/logo.png)

## 🌟 Features

- **💬 Smart Chat Assistant**: Powered by **Google Gemini 2.5 Flash**, the assistant asks targeted questions (age, voter ID status, etc.) to determine your eligibility and intelligently remembers your answers to provide personalized guidance.
- **📊 Dynamic Dashboard**: A real-time status tracker that updates as you chat with the assistant (e.g., changes from "Verification Pending" to "Ready to Vote").
- **🪜 Step-by-Step Voting Guide**: Structured, visually pleasing guide that highlights your current actionable step based on your chat interaction.
- **⏳ Visual Election Timeline**: A sleek, animated timeline displaying critical stages of the election process (Registration, Campaigns, Voting Day, Results).
- **✨ Premium UI/UX**: Built with Vanilla CSS utilizing glassmorphism, soft gradients, modern typography (Inter), and staggered micro-animations.

## 🛠️ Tech Stack

- **Frontend**: React (scaffolded with Vite), Vanilla CSS.
- **Backend**: Node.js, Express.
- **AI Integration**: Google Gemini AI (SDK: `@google/generative-ai`).

## 🚀 Deployment (Vercel)

This project is configured as a monorepo for easy deployment to Vercel.

1. **Connect your GitHub repo** to Vercel.
2. Vercel will automatically detect the root `vercel.json` and deploy both the frontend and the backend API.
3. **Environment Variables**: Add `GEMINI_API_KEY` in the Vercel project settings.

## 💻 Local Development

### Prerequisites
- Node.js (v18+)
- A Google Gemini API Key

### 1. Clone and Install
```bash
git clone https://github.com/sharath3221/VoteGuide-AI.git
cd VoteGuide-AI
cd backend && npm install
cd ../frontend && npm install
```

### 2. Configure Environment
Create a `.env` file in the `backend` directory:
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3001
```

### 3. Run Locally
Start the backend (Terminal 1):
```bash
cd backend
node server.js
```

Start the frontend (Terminal 2):
```bash
cd frontend
npm run dev
```

Open `http://localhost:5173` in your browser.
