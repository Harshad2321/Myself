# COGNITE - Digital Memory Garden 🌸

## Project Overview

**COGNITE** is a digital "Memory Garden" platform designed to help dementia patients reconnect with their past through personalized sensory memories including photos, music, and short stories. This prototype was developed as part of a **Design Thinking project** to demonstrate empathy-based user design and digital therapy concepts.

### Core Features
- 🌸 **Personalized Memory Experiences** - Photos, music, and stories curated for each patient
- 🎨 **Emotional Comfort Design** - Calming pastel colors, gentle animations, soft gradients
- 👥 **Multi-Role Support** - Patients, Family Members, Caregivers, and Admins
- 🏡 **Virtual Memory Garden** - Interactive environment to explore memories
- 📊 **Engagement Analytics** - Track emotional wellness and memory recall
- 📤 **Family Upload Portal** - Family members can contribute memories

---

## 🎨 Design Philosophy

### Visual Style
- **Primary Colors:** Deep royal purple (#301934) → lavender gradient (#C1A3FF)
- **Accent Color:** Soft gold (#D4A017)
- **Typography:** Poppins & Nunito (rounded, highly legible)
- **Animations:** Gentle fade-ins, floating elements, scale transitions
- **Accessibility:** Large fonts (≥18px), high contrast, ≥48px touch targets

### Color Palette
```css
--cognite-purple: #301934
--cognite-lavender: #C1A3FF
--cognite-gold: #D4A017
--cognite-mint: #B8E6D5
--cognite-cream: #FFF8E7
--cognite-rose: #FFB6C1
```

---

## 📁 Project Structure

```
cognite-prototype/
├── public/
├── src/
│   ├── assets/              # Logo and images (to be added)
│   │   ├── cognite_logo.png
│   │   └── sampleImages/
│   ├── components/
│   │   ├── Navbar.jsx       # Top navigation with logo
│   │   ├── Footer.jsx       # Bottom footer
│   │   ├── MemoryCard.jsx   # Memory display card
│   │   ├── EmotionTag.jsx   # Color-coded emotion chips
│   │   └── ChartMock.jsx    # Engagement analytics chart
│   ├── pages/
│   │   ├── LandingPage.jsx        # Hero section & role selection
│   │   ├── PatientDashboard.jsx   # Patient home with timeline
│   │   ├── MemoryLibrary.jsx      # Browse memories by type
│   │   ├── VirtualGarden.jsx      # Interactive memory garden
│   │   ├── CaregiverDashboard.jsx # Analytics & monitoring
│   │   └── FamilyPortal.jsx       # Memory upload interface
│   ├── data/
│   │   └── samplePatients.js      # 4 patient profiles with memories
│   ├── App.jsx              # React Router setup
│   ├── main.jsx             # App entry point
│   └── index.css            # Tailwind + custom styles
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Installation

1. **Clone or download the project**
   ```bash
   cd cognite-prototype
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

---

## 📄 Pages & Navigation Flow

### 1. **Landing Page** (`/`)
- Hero section with COGNITE branding
- Role selection buttons:
  - **Patient** → Patient Dashboard
  - **Family Member** → Family Upload Portal
  - **Caregiver** → Caregiver Dashboard
  - **Guest Demo** → Patient Dashboard

### 2. **Patient Dashboard** (`/patient/:id`)
- Welcome message with patient profile
- Today's suggested memories (3 cards)
- Full memory timeline (horizontal scroll)
- Weekly engagement chart
- Quick navigation to Library and Garden

### 3. **Memory Library** (`/memory-library/:id`)
- Tabbed interface: Photos | Music | Stories
- Filter by emotion and decade
- Grid layout for browsing
- Clickable memory cards

### 4. **Virtual Memory Garden** (`/virtual-garden/:id`)
- Interactive garden background
- Clickable flowers and trees linked to memories
- Modal popup with memory details
- "Play Memory" and guided voice options
- Return to Dashboard button

### 5. **Caregiver Dashboard** (`/caregiver`)
- Engagement summary cards (statistics)
- Weekly emotional trend charts
- Session history table with all patients
- Quick links to patient profiles
- Export report button (static)

### 6. **Family Upload Portal** (`/family/:id`)
- Upload form for photos
- Text fields for title, description
- Emotion tag dropdown
- Decade selection
- Preview of recently uploaded memories
- Success confirmation modal

---

## 👥 Sample Patient Profiles

### 1. Rajan Iyer (ID: 1)
- **Age:** 78
- **Diagnosis:** Early-Stage Alzheimer's
- **Theme:** Temple & Garden
- **Memories:** Wedding, Chess Championship, Morning Walks

### 2. Fatima Begum (ID: 2)
- **Age:** 72
- **Diagnosis:** Moderate Dementia
- **Theme:** Family & Cuisine
- **Memories:** Eid Celebrations, Cooking, Rose Garden

### 3. David Fernandes (ID: 3)
- **Age:** 81
- **Diagnosis:** Advanced Alzheimer's
- **Theme:** Ocean & Faith
- **Memories:** Fishing, Christmas Mass, Beach Walks

### 4. Priya Sharma (ID: 4)
- **Age:** 69
- **Diagnosis:** Early-Stage Vascular Dementia
- **Theme:** Books & Culture
- **Memories:** University Graduation, Kathak Dance, Library

---

## 🎨 Key Technologies

- **React 18** - UI framework
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Lucide React** - Icon library
- **Recharts** - Data visualization
- **Vite** - Fast build tool

---

## 🧩 Component Details

### MemoryCard
- Displays memory photo, title, description
- Shows emotion tag and decade
- Hover effects with play button overlay
- Clickable to view full details

### EmotionTag
- Color-coded chips based on emotion:
  - **Love** → Pink (#FFB6C1)
  - **Joy** → Yellow (#FFD700)
  - **Calm** → Blue (#87CEEB)
  - **Peace** → Mint (#B8E6D5)
  - **Nostalgia** → Lavender (#C1A3FF)
  - **Triumph** → Orange (#FFA500)
  - **Pride** → Gold (#D4A017)

### ChartMock
- Line chart showing weekly engagement
- Static mock data for demo purposes
- Uses Recharts library

---

## ♿ Accessibility Features

- ✓ All buttons ≥ 48px height for easy tapping
- ✓ Alt text for all images
- ✓ Large readable fonts (≥18px)
- ✓ High color contrast (WCAG AA compliant)
- ✓ Keyboard navigable
- ✓ Voice toggle placeholder (for future TTS integration)
- ✓ Clear visual hierarchy

---

## 🎯 Project Purpose

This prototype demonstrates:

1. **Empathy-Based Design** - Understanding dementia patients' needs
2. **Emotional Design Consistency** - Calming, comforting interface
3. **Clear Navigation Flow** - Intuitive user experience across roles
4. **Digital Therapy Model** - How technology can aid memory recall
5. **Clinical Presentation Ready** - Professional, polished demo

**Target Audience:** Design Thinking course professor and evaluation panel

---

## 📦 Build for Production

```bash
npm run build
```

The build output will be in the `dist/` folder, ready for deployment.

---

## 🔮 Future Enhancements (Not in Demo)

- Real backend integration (Firebase/Supabase)
- Actual file upload functionality
- Text-to-speech for guided memories
- Real-time caregiver notifications
- Mobile app version (React Native)
- AI-powered memory suggestions
- Video memory support
- Multi-language support

---

## 👨‍💻 Development Notes

### To Add Your Own Logo:
1. Place `cognite_logo.png` in `src/assets/`
2. Update Navbar.jsx image source
3. Recommended size: 200x200px, transparent background

### To Add More Patients:
Edit `src/data/samplePatients.js` and add new patient objects following the existing structure.

### To Customize Colors:
Edit `tailwind.config.js` and `src/index.css` to change the color scheme.

---

## 📝 License

This is an educational project created for Design Thinking coursework.

---

## 🙏 Acknowledgments

Built with empathy for:
- Dementia patients seeking comfort and connection
- Families wanting to preserve and share memories
- Caregivers dedicated to patient well-being

**COGNITE** - *Reminiscence With Us* 🌸

---

## 📞 Contact

For questions about this Design Thinking project, please contact your course instructor.

---

**Last Updated:** October 2025
