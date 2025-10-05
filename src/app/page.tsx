import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
// import { ScrollProgress } from "@/components/ui/scroll-progress";

export default function Home() {
  return (
    <div className="min-h-screen w-full ">
      <NavBar />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
