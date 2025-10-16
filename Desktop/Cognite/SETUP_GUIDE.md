# COGNITE - Quick Setup Guide

## 🚀 Quick Start (5 Minutes)

### Step 1: Verify Installation
Make sure you have Node.js installed:
```powershell
node --version
# Should show v16.0.0 or higher
```

### Step 2: Install Dependencies
```powershell
npm install
```

This will install:
- React & React DOM
- React Router DOM (navigation)
- Framer Motion (animations)
- Lucide React (icons)
- Recharts (charts)
- Tailwind CSS (styling)
- Vite (build tool)

### Step 3: Run Development Server
```powershell
npm run dev
```

You should see:
```
VITE v5.0.8  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Step 4: Open in Browser
Navigate to: **http://localhost:5173**

---

## 🧪 Testing the Demo

### Landing Page Test
1. You should see the COGNITE hero section
2. Four role buttons should be visible
3. Floating flowers should animate in background
4. Click "Patient" or "Explore Demo"

### Patient Dashboard Test
1. Profile card with Rajan Iyer should appear
2. Three suggested memory cards
3. Horizontal scrolling memory timeline
4. Engagement chart at bottom
5. Try clicking "Visit Garden" button

### Virtual Garden Test
1. Interactive garden with flowers and trees
2. Click any element to see memory modal
3. Modal should have image, title, emotion tag
4. Close modal and try another element
5. "Return to Dashboard" button in bottom right

### Memory Library Test
1. Three tabs: Photos, Music, Stories
2. Filter dropdowns work
3. Click through different tabs
4. Memory cards display correctly

### Caregiver Dashboard Test
1. Summary cards with statistics
2. Engagement chart displays
3. Session table with all patients
4. Click patient cards to navigate

### Family Portal Test
1. Upload form visible
2. Try "uploading" an image
3. Fill out title, description, emotion
4. Click "Upload Memory"
5. Success modal should appear

---

## 🎨 Customization Guide

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  'cognite-purple': '#YOUR_COLOR',
  'cognite-lavender': '#YOUR_COLOR',
  // etc.
}
```

### Add More Patients
Edit `src/data/samplePatients.js`:
```javascript
{
  id: 5,
  name: "Your Patient",
  age: 75,
  diagnosis: "Your Diagnosis",
  memories: [...]
}
```

### Modify Animations
Edit components with Framer Motion props:
```javascript
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1 }}
>
```

---

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 is busy:
```powershell
npm run dev -- --port 3000
```

### Dependencies Not Installing
Try:
```powershell
# Clear cache
npm cache clean --force

# Remove node_modules
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

# Reinstall
npm install
```

### Vite Not Recognized
Make sure you're in the project directory:
```powershell
cd c:\Users\harsh\Desktop\Cognite
npm run dev
```

### Tailwind Styles Not Loading
Ensure `src/index.css` is imported in `main.jsx`:
```javascript
import './index.css'
```

---

## 📦 Building for Production

### Create Production Build
```powershell
npm run build
```

### Preview Production Build
```powershell
npm run preview
```

### Deploy to Netlify/Vercel
1. Push code to GitHub
2. Connect repository to Netlify/Vercel
3. Build command: `npm run build`
4. Publish directory: `dist`

---

## 🎯 Presentation Tips

### For Professor Demo:

1. **Start with Landing Page**
   - Explain the role-based approach
   - Highlight emotional design philosophy

2. **Show Patient Dashboard**
   - Point out personalized elements
   - Demonstrate suggested memories
   - Explain timeline concept

3. **Interactive Garden**
   - Most impressive visual feature
   - Shows creativity in memory interaction
   - Demonstrate clickable elements

4. **Caregiver Dashboard**
   - Highlight analytics & monitoring
   - Show how caregivers track progress
   - Mention data-driven insights

5. **Family Portal**
   - Demonstrate upload flow
   - Explain family engagement model
   - Show success feedback

### Key Points to Mention:
- ✅ Empathy-based design thinking
- ✅ Accessibility for elderly users
- ✅ Multi-role user experience
- ✅ Emotional comfort through design
- ✅ Scalable prototype architecture

---

## 📹 Recording Demo Video

### Suggested Flow (3-5 minutes):

1. **Intro (30s)**: Landing page + explain concept
2. **Patient View (90s)**: Dashboard → Library → Garden
3. **Caregiver View (60s)**: Analytics and monitoring
4. **Family View (60s)**: Memory upload process
5. **Closing (30s)**: Impact and future vision

### Recording Tips:
- Use OBS Studio or Loom
- Full screen browser (F11)
- Smooth, deliberate clicks
- Narrate as you navigate
- Show key features clearly

---

## ✅ Pre-Presentation Checklist

- [ ] All dependencies installed (`npm install`)
- [ ] Dev server runs without errors (`npm run dev`)
- [ ] All pages load correctly
- [ ] Navigation works between pages
- [ ] Animations play smoothly
- [ ] No console errors in browser DevTools
- [ ] Test on both Chrome and Firefox
- [ ] Screenshots/video prepared
- [ ] Talking points rehearsed

---

## 🎓 Design Thinking Connection

### Empathy Stage:
- Researched dementia patient needs
- Understood family caregiver challenges
- Identified emotional comfort requirements

### Define Stage:
- Problem: Memory loss causes anxiety
- Solution: Digital reminiscence therapy
- Focus: Personalized, calming experience

### Ideate Stage:
- Memory garden concept
- Role-based interfaces
- Sensory memory triggers

### Prototype Stage:
- This clickable demo
- Visual design system
- Interactive components

### Test Stage:
- Professor evaluation
- Usability feedback
- Future iteration plans

---

## 📚 Additional Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Router Docs](https://reactrouter.com/)
- [Lucide Icons](https://lucide.dev/)

---

## 🎉 You're Ready!

Your COGNITE prototype is complete and ready for demonstration.

**Good luck with your Design Thinking project presentation! 🌸**
