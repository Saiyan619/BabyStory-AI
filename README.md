# 👶✨ BabyStory AI – Personalized AI-Powered Story Generator for Kids

**BabyStory AI** is an AI-powered web application that generates personalized baby and kids' stories from simple text prompts. Designed for parents and storytellers, the app creates unique narratives tailored to a child’s name, theme, and imagination — all powered by artificial intelligence.

---

## 🚀 Features

- 🧠 Generate original baby stories from custom prompts using **OpenAI’s GPT model**
- ✍️ Personalize stories with child’s name, interests, and storytelling tone
- 📖 Display the generated story in a clean, reader-friendly format
- 🎨 Optional illustrations using AI image APIs (if integrated)
- 🔄 Regenerate or edit story content on the fly
- 📱 Fully responsive UI for phones, tablets, and desktops

---

## 🛠️ Tech Stack

### Frontend
- [React.js](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)

### AI / Backend
- [OpenAI API](https://platform.openai.com/) (for story generation)
- [Node.js](https://nodejs.org/) + [Express.js](https://expressjs.com/) *(if backend is used)*
- Optional: [Cloudinary](https://cloudinary.com/) or [Replicate](https://replicate.com/) for image generation

---

## 📦 Installation

### Prerequisites

- Node.js & npm installed
- OpenAI API key
- (Optional) Image API key if using AI-generated illustrations

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/babystory-ai.git
cd babystory-ai

npm install

VITE_Gemini_API_KEY=your_gemini_api_key

npm run dev
