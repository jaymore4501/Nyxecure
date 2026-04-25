<div align="center">
  <img src="client/public/Logo.png" alt="Nyxecure Logo" width="50" />
</div>

# 🛡️ Nyxecure

## 📝 Short Project Description
Nyxecure is a modern, lightweight cybersecurity web application built to help users identify deceptive links and create uncrackable passwords. It provides a simple, clean interface where anyone can quickly check if a URL is a phishing attempt or test how long it would take a hacker to crack their password. 

![Project Preview](client/public/Project_Image 2.png.png)

## ✨ Key Features
- **Phishing URL Detection 🎣:** Instantly flags deceptive links as Safe, Suspicious, or Dangerous.
- **Password Strength Analyzer 🔑:** Evaluates passwords in real-time, providing a strength score and estimated crack time.
- **Dark Mode Glassmorphism UI 🌌:** A premium, fully responsive cybersecurity dashboard.
- **Live Analytics Dashboard 📊:** Visualizes scanned threats and safe URLs using interactive charts.
- **Secure by Design 🔒:** No passwords are saved or stored in plaintext.

## 🚀 Live Working / Demo Explanation
Using Nyxecure is incredibly straightforward:
1. **To check a link 🔗:** Paste any URL into the URL Scanner. The system will instantly check for missing encryption, deceptive keywords (like "login" or "bank" in the wrong place), and unusual link lengths, then display a Risk Score out of 100.
2. **To test a password 🔐:** Type a password into the Password Analyzer. As you type, the system's progress bar will change colors and immediately tell you if the password is "Very Weak" or "Strong", along with exactly how long it would take a computer to crack it (e.g., "Centuries").

## 🧠 How the System Works
Nyxecure runs on a fast, decoupled client-server architecture:
- **Frontend (React & Vite) ⚛️:** Provides the fast, interactive user interface where you paste your links and passwords.
- **Backend (Node.js & Express) 🟢:** Acts as the brain. When you submit a URL, custom heuristic rules scan the text for red flags. When you submit a password, it uses the industry-standard `zxcvbn` algorithm to compute the entropy and dictionary match probability.
- **Database (MongoDB) 🍃:** Simply logs the metadata (like the risk score) so the Dashboard can show overall threat statistics, keeping personal data completely anonymous.

## 📂 Folder Structure
```
Nyxecure/
├── client/                 # React Frontend (Vite)
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── lib/            # Utilities (Axios, etc.)
│   │   ├── pages/          # Application views (Dashboard, Scan, etc.)
│   │   ├── App.jsx         # Main routing file
│   │   └── main.jsx        # Entry point
│   ├── tailwind.config.js  # Tailwind CSS configuration
│   └── vite.config.js      # Vite configuration
├── server/                 # Node.js Backend (Express)
│   ├── controllers/        # Core logic (Phishing & Password Analysis)
│   ├── models/             # MongoDB Schemas (Mongoose)
│   ├── routes/             # API Endpoints
│   ├── utils/              # Helper functions (Heuristics)
│   └── server.js           # Server entry point
├── Snapshots and Demonstration Video/ # Project screenshots and demo videos
├── LICENSE.md              # Project License
├── System-Overview.md      # System Design Document
└── README.md               # Project Documentation
```

## ⚙️ Installation / Setup Instructions

### 📌 Prerequisites
Make sure you have the following installed on your machine:
- **Node.js** 📦 (v16 or higher)
- **MongoDB** 🗄️ (Running locally or via MongoDB Atlas)

### 1️⃣ Clone the repository
```bash
git clone https://github.com/jaymore4501/Nyxecure.git
cd Nyxecure
```

### 2️⃣ Setup the Backend
```bash
cd server
npm install
```
Create a `.env` file inside the `server` folder and add your MongoDB URI:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/nyxecure
```

### 3️⃣ Setup the Frontend
```bash
cd ../client
npm install
```

## 🏃‍♂️ How to Run the Project
You will need two terminal windows open to run the frontend and backend simultaneously.

**Terminal 1 (Start the Backend) 🖥️:**
```bash
cd server
npm run dev
```
*(The server will start on `http://localhost:5000`)*

**Terminal 2 (Start the Frontend) 💻:**
```bash
cd client
npm run dev
```
*(The frontend will start on `http://localhost:5173`)*

Simply open your browser and navigate to `http://localhost:5173/` 🌐 to use the app!

---

## 🧪 Testing Data

### 🌐 URL Classification Sheet
| # | URL | Category |
|---|---|---|
| 1 | http://login-paypal.example.com | Suspicious ⚠️ |
| 2 | http://secure-bank-update.example.net | Suspicious ⚠️ |
| 3 | http://amazon.verify-account.example.org | Suspicious ⚠️ |
| 4 | http://secure.login.bank.com.site.com | Dangerous 🚨 |
| 5 | https://www.google.com | Safe ✅ |
| 6 | https://www.geeksforgeeks.org | Safe ✅ |
| 7 | https://www.wikipedia.org | Safe ✅ |
| 8 | https://www.microsoft.com | Safe ✅ |
| 9 | https://github.com | Safe ✅ |

### 🔑 Password Strength Sheet
| # | Password | Strength |
|---|---|---|
| 1 | 12345678 | Very Weak ❌ |
| 2 | password | Very Weak ❌ |
| 3 | John@2026 | Weak ⚠️ |
| 4 | T9$kL!2vQ#8pZ | Strong 🛡️ |

---

## 📊 Results Summary
During testing, the system successfully and accurately flagged all standard Safe URLs from major organizations ✅. It effectively caught deceptive patterns in Suspicious and Dangerous URLs based on HTTPS absence, excessive subdomains, and manipulative keywords 🚨. Similarly, the password analyzer instantly recognized common dictionary passwords as "Very Weak", while appropriately rewarding complex, high-entropy strings with "Strong" ratings and vast crack-time estimations 🛡️.

### 🗄️ Database Export
To verify the backend logging, a file named **`nyxecure.scans.csv`** has been included in the project. This file was directly exported from **MongoDB Compass** and contains the actual scan results and metadata stored in the database.

## 🔐 Security Concepts Used
- **Heuristics Analysis 🧩:** Using rule-based pattern matching to flag malicious URL intent.
- **Cryptographic Entropy Calculation 🧮:** Utilizing algorithmic dictionaries to estimate brute-force vulnerability.
- **Data Sanitization & Rate Limiting 🚦:** Protecting the backend API from automated abuse and XSS injections.
- **Zero-Knowledge Principle 🕵️‍♂️:** The backend explicitly avoids logging plaintext passwords to ensure no sensitive credential leaks occur.

## 👨‍💻 Author / Credits
- Developed by **Jay More** 🌟🚀
- Built for educational and academic cybersecurity training 🎓.

