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

export default function App() {
  return (
    <ThemeProvider>
      {/* "user" makes every motion component respect prefers-reduced-motion automatically */}
      <MotionConfig reducedMotion="user">
        <div className="min-h-screen bg-bg font-sans text-ink">
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <Navbar />
          <main id="main">
            <Hero />
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
      </MotionConfig>
    </ThemeProvider>
  );
}
