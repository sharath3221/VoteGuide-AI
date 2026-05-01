# VoteGuide AI 🗳️🤖

VoteGuide AI is a modern, interactive, and responsive web application designed to act as a personal assistant to guide users—especially first-time voters—through the entire election process.

![VoteGuide AI](/frontend/public/logo.png)

## 🌟 Features

- **💬 Smart Chat Assistant**: Powered by OpenAI's `gpt-4o-mini`, the assistant asks targeted questions (age, voter ID status, etc.) to determine your eligibility and intelligently remembers your answers to avoid repeating questions.
- **📊 Dynamic Dashboard**: A real-time status tracker that updates as you chat with the assistant (e.g., changes from "Verification Pending" to "Ready to Vote").
- **🪜 Step-by-Step Voting Guide**: Structured, visually pleasing guide that highlights your current actionable step based on your chat interaction.
- **⏳ Visual Election Timeline**: A sleek, animated timeline displaying critical stages of the election process (Registration, Campaigns, Voting Day, Results).
- **✨ Premium UI/UX**: Built with Vanilla CSS utilizing glassmorphism, soft gradients, modern typography (Inter), and staggered micro-animations for a highly professional look.

## 🛠️ Tech Stack

- **Frontend**: React (scaffolded with Vite), Vanilla CSS (Custom Design System).
- **Backend**: Node.js, Express.
- **AI Integration**: Google Gemini AI.

## 🚀 Getting Started

Follow these steps to run VoteGuide AI on your local machine.

### Prerequisites
- Node.js (v18+ recommended)
- A Google AI API Key (from Google AI Studio)

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/sharath3221/VoteGuide-AI.git
cd VoteGuide-AI
\`\`\`

### 2. Backend Setup
Navigate to the backend directory, install dependencies, and configure your environment:
\`\`\`bash
cd backend
npm install
\`\`\`

Copy `backend/.env.example` to `backend/.env` and add your OpenAI API key:
```bash
cp backend/.env.example backend/.env
```

Then edit `backend/.env` and replace the placeholder with your real OpenAI API key:
\`\`\`env
OPENAI_API_KEY=sk-your-real-api-key-here
PORT=3001
\`\`\`

Start the backend server:
\`\`\`bash
node server.js
\`\`\`
The backend will run on `http://localhost:3001`.

### 3. Frontend Setup
Open a new terminal window, navigate to the frontend directory, and start the development server:
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`
The frontend will run on `http://localhost:5173`.

---

Open `http://localhost:5173` in your browser and start chatting with VoteGuide AI!
