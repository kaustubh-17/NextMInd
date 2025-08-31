# 📊 NextMind  

A React + Tailwind CSS project that displays posts, portfolios, and NAV reports from Excel data with interactive charts and a sidebar navigation layout.  

## 🚀 Features  
- 📂 **Posts Section**: Read full articles like *CM Fixed Income*, *Craftsman Automation*, and *Focused Portfolio*.  
- 📈 **Portfolio Dashboard**: Displays NAV data in a scrollable table and renders interactive line charts using Recharts.  
- 📊 **Excel Integration**: NAV data is read directly from an `.xlsx` file in `/src/assets/`.  
- 🧭 **Sidebar Navigation**: Minimal left navigation for Home, Portfolios, and Posts.  
- 🎨 **UI**: Built with **Tailwind CSS** for styling.  

---

## 🏗️ Tech Stack  
- **React** (Frontend Framework)  
- **React Router DOM** (Routing)  
- **Tailwind CSS** (Styling)  
- **Recharts** (Data Visualization)  
- **xlsx** (Excel data parsing)  

---

## 📂 Project Structure  

```
src/
 ├── assets/            # Excel file(s), images
 ├── components/        # Shared UI components (Sidebar, Layout, etc.)
 ├── pages/             # Home, Portfolio, PostPage
 ├── App.jsx            # Main app routes
 ├── index.css          # Global styles
 └── main.jsx           # Entry point
```

---

## ⚙️ Installation & Setup  

Clone the repo:  
```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```

Install dependencies:  
```bash
npm install
```

Run locally:  
```bash
npm run dev
```

Build for production:  
```bash
npm run build
```

---

## 🌐 Deployment  

This project is ready for **Netlify**.  

1. Push code to GitHub.  
2. Connect repo to Netlify.  
3. Set **build command**:  
   ```
   npm run build
   ```  
4. Set **publish directory**:  
   ```
   dist
   ```  
5. Deploy 🚀  

---

## 📷 Screenshots  
*(Add screenshots of NAV chart, posts, sidebar UI etc.)*  

---

## 🤝 Contributing  
Pull requests are welcome. For major changes, please open an issue first to discuss what you’d like to change.  

---

## 📄 License  
This project is for learning purposes only.  
