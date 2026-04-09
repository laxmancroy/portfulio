import { Navbar } from "./layout/Navbar";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Skills } from "./layout/Skills";
import { Project } from "./layout/Project";
import { Experience } from "./sections/Experience";
import { Testimonials } from "./sections/Testimonials";
import { Contact } from "./sections/Contact";
import { Footer } from "./layout/Footer";
import "./index.css";

const MyApp = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Project />
        <Experience />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default MyApp;
