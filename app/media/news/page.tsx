import MediaPageBanner from "@/components/Media/PageBanner";
import OurNews from "@/components/news/ournews";

export const metadata = {
  title: "News | SONUT",
  description: "Read the latest news, announcements, and updates from SONUT.",
};

export default function NewsPage() {
  return (
    <main>
      <MediaPageBanner
        title="News"
        description="Stay informed with the latest announcements, stories, and updates from SONUT."
      />
      <OurNews />
    </main>
  );
}
