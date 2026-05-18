# Heartbreak Hellfire 🔥

A cinematic, emotional, and dark web application built as a "silent void." It allows users to write the things they never got to say to an ex-partner, record voice notes, and ultimately experience a cathartic ritual of burning the messages away forever.

## 🌌 The Concept

*Some conversations never happen in real life.*

When a user enters the room, they are entering a private chat void. They can send messages and voice notes to their ex. **The ex never responds.** Once they have said everything they need to say, the user can press the "Burn It All" button to trigger a dramatic, screen-shaking fire animation that dissolves their words into ash. 

## 🚀 Features

- **The Silent Void**: A chat interface where messages are stored temporarily but never answered.
- **Unsent Voice Notes**: Utilize the HTML5 `MediaRecorder` API to record and playback voice messages in the void.
- **Cinematic Experience**: Rain effects, floating particles, glassmorphism UI, and dark aesthetics utilizing beautiful typography (`Cinzel` and `Cormorant Garamond`).
- **The Burn Ritual**: An intense vanilla JavaScript HTML5 Canvas fire particle engine that erupts from the bottom of the screen, combined with CSS shake and dissolve animations to turn the void into ashes.

## 🛠️ Tech Stack

- **Backend**: Python with Flask (extremely lightweight, handles routing and temporary memory storage).
- **Frontend**: HTML5, Vanilla JavaScript, CSS3.
- **No Frameworks**: 100% pure CSS and JS. No React, no external component libraries, no npm.

## 💻 Getting Started (Local Development)

Since this app uses native browser APIs (like microphone access for voice notes), it is highly recommended to run it on `localhost`.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/heartbreak-hellfire.git
   cd heartbreak-hellfire
   ```

2. **Set up a virtual environment (Recommended):**
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install the dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the server:**
   ```bash
   python3 app.py
   ```
   
5. **Open in browser:**
   Navigate to `http://localhost:5000` to enter the void.

## 🌐 Deployment

The application is lightweight and ready to be deployed to standard hosting platforms like **Render.com** or **PythonAnywhere**. 

1. Create a Web Service on Render.
2. Set the build command to `pip install -r requirements.txt`.
3. Set the start command to `gunicorn app:app` (you may need to add `gunicorn` to your `requirements.txt`).

---
*Created for emotional release. Some things deserve to stay in ashes.*
