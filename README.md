# 401(k) Contribution Manager

A modern, intuitive 401(k) contribution management application with real-time projections and multi-language support.

## ✨ Features

- 💰 **Flexible Contribution Settings** - Toggle between percentage or dollar amount
- 📊 **Retirement Projections** - Visualize your retirement savings growth
- 💵 **Paycheck Impact Analysis** - See how contributions affect your take-home pay
- 📈 **Year-to-Date Tracking** - Monitor progress toward IRS limits
- 🌍 **Multi-language Support** - English, Spanish, and Mandarin
- ♿ **Accessible** - WCAG 2.1 AA compliant
- 📱 **Mobile-First** - Responsive design works on all devices

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- A modern web browser

### Installation & Running

```bash
# 1. Install all dependencies
npm run install:all

# 2. Start development servers (both frontend and backend)
npm run dev

# 3. Open your browser
#    Desktop: http://localhost:5173
#    Mobile: http://<your-local-ip>:5173
```

The application will be available at:
- **Frontend**: http://localhost:5173  
      - If this doesn't work due to Windows networking issues, try usig 127.0.0.1 rather than localhost
- **Backend API**: http://localhost:3001

### Running on Mobile

To test on your mobile device:

1. Find your computer's local IP address:
   ```bash
   # On macOS/Linux
   ifconfig | grep "inet " | grep -v 127.0.0.1
   
   # On Windows
   ipconfig | findstr IPv4
   ```

2. Ensure your mobile device is on the same network

3. Open `http://<your-ip>:5173` on your mobile browser

## 📦 Tech Stack

**Frontend:**
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- Recharts (data visualization)
- i18next (internationalization)

**Backend:**
- Node.js + Express
- TypeScript
- SQLite (embedded database)
- Zod (validation)

## 🏗️ Project Structure

```
401k-app/
├── client/              # React frontend
├── server/              # Express backend
├── shared/              # Shared types and constants
└── README.md
```

## 🧪 Test User

The app comes pre-loaded with test data:

- **Name**: Brandon
- **Salary**: $120,000
- **Age**: 30
- **Current Contribution**: 5% traditional 401(k)
- **YTD**: $5,000 (employee) + $2,000 (employer match)
- **Employer Match**: 4% up to 6% of salary

## 🎯 Key Design Decisions

1. **Zero Magic Strings** - All constants defined in `shared/constants/`
2. **Type Safety** - Full TypeScript coverage with shared types
3. **i18n Built-In** - Demonstrates scalability thinking
4. **Service Architecture** - Clean separation of concerns
5. **Mobile-First** - Touch-friendly, responsive design

## 📱 Mobile Optimization

- Viewport meta tag prevents zooming
- Touch-friendly buttons (min 44x44px)
- Responsive grid layout
- Optimized font sizes for readability
- Smooth scroll behavior

## 🛠️ Development

```bash
# Run frontend only
npm run dev:client

# Run backend only
npm run dev:server

# Build for production
npm run build
```

## 📖 Additional Documentation

See `SETUP.md` for detailed setup instructions and troubleshooting.

## 🎨 Design Philosophy

- **Clarity over cleverness** - Every number instantly understandable
- **Action-oriented** - Easy to increase savings with one click
- **Educational** - Explain concepts without condescension
- **Confidence-building** - Show progress, celebrate milestones

## 📄 License

MIT

---

**Built for Human Interest Take-Home Assignment**
