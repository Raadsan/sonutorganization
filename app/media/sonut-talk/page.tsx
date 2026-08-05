import Link from "next/link";
import MediaPageBanner from "@/components/Media/PageBanner";
import { ArrowRight, Headphones, MessagesSquare, Mic2, Radio } from "lucide-react";

const formats = [
  {
    icon: Mic2,
    title: "Teacher Voices",
    description: "Honest conversations with teachers about their classrooms, careers, communities, and aspirations.",
  },
  {
    icon: MessagesSquare,
    title: "Expert Conversations",
    description: "Education leaders and specialists unpack the ideas, policies, and innovations shaping learning.",
  },
  {
    icon: Radio,
    title: "Union Updates",
    description: "Accessible discussions about SONUT campaigns, member priorities, achievements, and opportunities.",
  },
];

export const metadata = {
  title: "SONUT Talk | SONUT",
  description: "SONUT Talk shares conversations, ideas, and voices from Somalia's education community.",
};

export default function SonutTalkPage() {
  return (
    <main>
      <MediaPageBanner
        title="SONUT Talk"
        description="Conversations that amplify teacher voices and explore the future of education in Somalia."
      />
      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-white shadow-lg shadow-secondary/20">
                <Headphones className="h-8 w-8" />
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-secondary">Listen. Learn. Connect.</span>
              <h2 className="mt-3 text-3xl font-extrabold text-primary md:text-5xl">The Education Conversation</h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                SONUT Talk is our platform for meaningful discussions with the people working to strengthen teaching and learning.
              </p>
              <Link href="/contactus" className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-105">
                Suggest a Topic <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-5 lg:col-span-3">
              {formats.map((format) => (
                <article key={format.title} className="flex gap-5 rounded-3xl border border-gray-100 bg-gray-50 p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <format.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{format.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{format.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
