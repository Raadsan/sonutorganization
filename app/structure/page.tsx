import WhoWeAreBanner from "@/components/About/WhoWeAreBanner";
import { Building2, Network, School, Users } from "lucide-react";

const structure = [
  {
    icon: Users,
    title: "General Assembly",
    description: "The union's highest decision-making body, representing members and setting SONUT's overall direction.",
  },
  {
    icon: Network,
    title: "National Level",
    description: "National Executive Council (NEC) and National Working Committee.",
  },
  {
    icon: Building2,
    title: "State Level",
    description: "Seven state memberships, each with full-time secretaries.",
  },
  {
    icon: School,
    title: "School Level",
    description: "School representatives in every institution.",
  },
];

export default function StructurePage() {
  return (
    <main>
      <WhoWeAreBanner title="Our Structure" />
      <section className="bg-gray-50 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-secondary">How we are organized</span>
            <h2 className="mt-3 text-3xl font-extrabold text-primary md:text-5xl">A Union Built From Its Members</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              SONUT&apos;s structure connects teachers at local, regional, and national levels so every member has a voice.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {structure.map((item, index) => (
              <article key={item.title} className="relative rounded-3xl border border-gray-100 bg-white p-7 shadow-sm md:p-9">
                <span className="absolute right-7 top-7 text-5xl font-black text-primary/5">0{index + 1}</span>
                <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">{item.title}</h3>
                <p className="leading-relaxed text-muted-foreground">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
