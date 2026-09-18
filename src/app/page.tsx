import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Expertise } from "@/components/Expertise";
import { FeaturedWork } from "@/components/FeaturedWork";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { MoreWork } from "@/components/MoreWork";

export default function Home() {
  return (
    <>
      <main id="main">
        <Hero />
        <FeaturedWork />
        <MoreWork />
        <Expertise />
        <About />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
