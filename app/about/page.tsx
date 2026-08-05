import WhoWeAreBanner from "@/components/About/WhoWeAreBanner";
import AboutPageContent from "@/components/About/AboutPageContent";
import VissionAndMission from "@/components/About/VissionandMission";
import CoreValues from "@/components/About/corevalues";
import AimsAndObjectives from "@/components/About/AimsAndObjectives";
import Partners from "@/components/ui/Home/Partners";

export default function AboutPage() {
  return (
    <main>
      <WhoWeAreBanner title="About" />
      <AboutPageContent />
      <VissionAndMission />
      <CoreValues />
      <AimsAndObjectives />
      <Partners />
      {/* <OurHistory /> */}


    </main>
  );
}
