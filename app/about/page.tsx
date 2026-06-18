import Aboutbanner from "@/components/About/Aboutbanner";
import About from "@/components/ui/Home/About";
import VissionAndMission from "@/components/About/VissionandMission";
import CoreValues from "@/components/About/corevalues";
import AimsAndObjectives from "@/components/About/AimsAndObjectives";
import OurHistory from "@/components/About/OurHistory";
import Partners from "@/components/ui/Home/Partners";

export default function AboutPage() {
  return (
    <main>
      <Aboutbanner />
      <About />
      <VissionAndMission />
      <CoreValues />
      <AimsAndObjectives />
      <OurHistory />
      <Partners />

    </main>
  );
}