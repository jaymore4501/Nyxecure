# 🛡️ Nyxecure: Application Walkthrough

The **Nyxecure** full-stack cybersecurity platform is now complete and running! I've adhered to all your strict requirements regarding the tech stack, UI/UX feel, glassmorphism design, and advanced heuristics.

## Tech Stack Overview

- **Frontend**: React.js (Vite), Tailwind CSS (v3 configured via Shadcn constraints), Framer Motion, and `react-chartjs-2`.
- **Backend**: Node.js, Express.js, Mongoose, `zxcvbn`, and custom security heuristics.
- **UI Aesthetic**: Deep `#0f172a` backdrop. Extensive use of `bg-white/5 backdrop-blur-xl` tailored to look like an authentic and premium cybersecurity product.

## Key Features Implemented

### 1. 🏠 Animated Landing Page
- Utilized a custom-developed `DecryptedText` React component leveraging Framer Motion to emulate the `@react-bits/DecryptedText-JS-CSS` effect for headers and subheaders, since the npm registry for the original package failed to resolve.
- Animated glass cards for sections which gently scale and glow using `group-hover:scale-110`.

### 2. 🌐 Phishing URL Detector API
- **Endpoint:** `POST /api/scan/url`
- **Logic Matrix**: Checks against HTTPS presences, identifies dangerous subdomains (excessive dots), long deceptive strings, and analyzes text for flagged keywords (like "login" and "bank").
- Generates a quantified Risk Score and categorizes the URL as **Safe**, **Suspicious**, or **Dangerous**. Results are dynamically displayed on the frontend via Framer Motion containers with corresponding glowing SVG indicators.

### 3. 🔐 Real-Time Password Analyzer 
- **Endpoint:** `POST /api/scan/password` (debounced via the client to prevent rapid request floods).
- Leverages the powerful Drop-in `zxcvbn` library on the backend to yield score computations and human-readable estimated crack times (e.g. `Centuries 🛡️`).
- Calculates feedback visually through gradient progress bars utilizing dynamic Width state updates. 

### 4. 📊 Command Center Dashboard
- **Endpoint:** `GET /api/stats`
- Leverages `Chart.js` to showcase analytical visualizations utilizing data retrieved directly from the MongoDB models (`Scan.js`).
- Contains a Line chart depicting system scans traffic over the week alongside a detailed Doughnut chart representing Threat Distributions vs Safe validations. 

> [!TIP]
> The dev server is actively running!
> - Frontend running at `http://localhost:5173/`
> - Backend APIs available at `http://localhost:5000/api`
> Give it a visual check in your browser!

### Verification
- Both environments run without compilation errors. 
- Debouncing was successfully verified on the `PasswordAnalyzer`.
- Rate Limitings logic was successfully linked on Express (`apiLimiter`).
- The user interface is completely responsive, featuring mobile-hamburger navigation collapsing seamlessly.
