import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "./theme";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Hackathons } from "./components/Hackathons";
import { Certifications } from "./components/Certifications";
import { Education } from "./components/Education";
import { Profiles } from "./components/Profiles";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { BootScreen } from "./components/LoadingScreen";
import { CoreStack } from "./components/CoreStack";
import { ProgressBar } from "./components/ProgressBar";
import { AchievementToasts } from "./components/AchievementToasts";
import { CommandPalette } from "./components/CommandPalette";
import { Cursor } from "./components/Cursor";
import { LiveProvider } from "./lib/live";

export default function App() {
  return (
    <ThemeProvider>
      {/* "user" makes every motion component respect prefers-reduced-motion automatically */}
      <MotionConfig reducedMotion="user">
        <LiveProvider>
          <BootScreen />
          <ProgressBar />
          <Cursor />
          <CommandPalette />
          <AchievementToasts />
          <div className="min-h-screen bg-bg font-sans text-ink">
            <a href="#main" className="skip-link">
              Skip to content
            </a>
            <Navbar />
            <main id="main">
              <Hero />
              <CoreStack />
              <About />
              <Skills />
              <Experience />
              <Projects />
              <Hackathons />
              <Certifications />
              <Education />
              <Profiles />
              <Contact />
            </main>
            <Footer />
          </div>
        </LiveProvider>
      </MotionConfig>
    </ThemeProvider>
  );
}
