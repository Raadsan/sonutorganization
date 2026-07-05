import Hero from "@/components/ui/Home/Hero";
import About from "@/components/ui/Home/About";
import Priorities from "@/components/ui/Home/Priorities";
import Statics from "@/components/ui/Home/Statics";
import Team from "@/components/ui/Home/Team";
import Partners from "@/components/ui/Home/Partners";
import Blog from "@/components/ui/Home/blog";
import Cta from "@/components/ui/Home/Cta";
import SocialUpdates from "@/components/ui/Home/SocialUpdates";

export default function Home() {
  return (
    <>
      <Hero />
      <Statics />
      <About />
      <Team />
      <Priorities />
      <Partners />
      <SocialUpdates />
      <Blog />
      <Cta />
    </>
  );
}