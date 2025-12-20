# DeepThink – Personality Insight Platform

Hey there! 👋  
DeepThink is a modern, web‑based personality insight platform that helps you understand how you **think**, decide, and respond using structured questions and simple psychological patterns – not random guesses.

---

## 🧠 About This Project

DeepThink focuses on:
- Highlighting consistent thinking and behavior patterns.
- Encouraging self‑reflection instead of rigid personality labels.
- Giving clear, friendly summaries you can actually use in real life.

> ⚠️ DeepThink is designed for self‑awareness and growth, not for clinical diagnosis.

---

## 💻 Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Styling & UX:** Custom CSS, responsive layout, smooth scroll animations
- **Extras:** LocalStorage (theme), Canvas background lights, DOM‑based quiz engine
- **Deployment Ready For:** Vercel / Netlify / GitHub Pages

---

## ✨ Key Features

- 🎯 **Interactive Landing Page**  
  Clean hero section with a “Start” flow and multiple test cards (10 / 30 / 50 questions – 10‑Q live, others “Coming Soon”).

- ⏱️ **10‑Question Timed Quiz**  
  10 minutes to answer 10 curated questions about logic, decisions, teamwork, pressure handling, and intuition, with progress bar and navigation.

- 🌓 **Smart Theme System**  
  Toggle between light and dark themes, with your choice remembered using LocalStorage.

- 🌈 **Animated Experience**  
  Scroll‑reveal effects, subtle card animations, and a soft floating light canvas background.

- 📊 **Instant Personality Summary**  
  Answer scores are calculated and mapped to a short, human‑readable summary of your thinking and decision patterns.

---

## 🧩 How It Works

1. Open the landing page and click on the **10 Questions** card.  
2. Hit **Start Test** to begin the timer and show the first question.  
3. Navigate using **Previous** / **Next** buttons; progress is reflected in the progress bar.  
4. Submit your answers or let the timer auto‑submit when time is over.  
5. Read your generated summary and optionally restart the quiz.

---

## 📁 Project Structure
```bash
DeepThink/
│
├── Index.html      # Landing page with overview, test cards, info sections, and philosophy text
├── index2.html     # 10-question timed quiz page with timer, progress, navigation, and result summary
├── Styles.css      # Global styling, dark mode, animations, quiz UI, and responsive layout
└── app.js          # Theme toggle, scroll reveal, canvas lights, quiz logic, timer, and scoring

