import WhatWeDoPageBanner from "@/components/WhatWeDo/PageBanner";
import {
  BookOpenCheck,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Megaphone,
  Network,
  SearchCheck,
  Users,
} from "lucide-react";

const programmes = [
  {
    icon: GraduationCap,
    title: "Teachers Professional Development Program",
    description: "SONUT provides training, workshops, and learning opportunities to improve teachers’ knowledge, skills, teaching methods, and professional standards.",
  },
  {
    icon: HeartHandshake,
    title: "Teachers’ Rights and Welfare Program",
    description: "SONUT works to promote teachers’ rights, improve their working conditions, and support their professional and social welfare.",
  },
  {
    icon: BookOpenCheck,
    title: "Education Quality Improvement Program",
    description: "SONUT contributes to improving the quality of education by promoting effective teaching practices, innovation, and better learning environments.",
  },
  {
    icon: Megaphone,
    title: "Teacher Advocacy and Representation Program",
    description: "SONUT represents teachers’ voices and engages with education stakeholders on issues affecting teachers and the education sector.",
  },
  {
    icon: Users,
    title: "Leadership and Capacity Building Program",
    description: "SONUT develops leadership skills among teachers and strengthens the capacity of education professionals to contribute to educational development.",
  },
  {
    icon: SearchCheck,
    title: "Research and Policy Engagement Program",
    description: "SONUT supports research, shares knowledge, and participates in discussions on education policies and reforms.",
  },
  {
    icon: Network,
    title: "Teacher Networking and Collaboration Program",
    description: "SONUT creates opportunities for teachers to connect, share experiences, exchange ideas, and collaborate on educational initiatives.",
  },
  {
    icon: Handshake,
    title: "Community Engagement and Awareness Program",
    description: "SONUT works with communities and education partners to promote the value of education and the important role of teachers in society.",
  },
];

export const metadata = {
  title: "Our Programmes | SONUT",
  description: "Explore SONUT programmes supporting teachers and quality education across Somalia.",
};

export default function OurProgrammesPage() {
  return (
    <main className="min-h-screen bg-gray-50/50">
      <WhatWeDoPageBanner
        title="Our Programmes"
        description="Practical programmes that empower educators, protect their rights, and improve education across Somalia."
      />

      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-bold tracking-widest text-secondary uppercase mb-4">
              <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
              Our Areas of Work
            </div>
            <h2 className="text-3xl font-extrabold text-primary md:text-5xl tracking-tight">
              Building a Stronger Teaching Profession
            </h2>
            <p className="mt-4 text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              SONUT implements comprehensive, teacher-centered programmes designed to advance educational quality, empower educators, and protect their welfare.
            </p>
          </div>

          {/* Programmes Grid with Perfect Alignment */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
            {programmes.map((programme, index) => (
              <article
                key={programme.title}
                className="group relative flex flex-col justify-between h-full rounded-3xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/20"
              >
                <div className="flex flex-col h-full">
                  {/* Top Bar: Icon on Left, Number on Right */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:scale-105 shadow-sm">
                      <programme.icon className="h-7 w-7" />
                    </div>
                    <span className="text-4xl font-extrabold text-primary/15 tracking-tight select-none transition-colors duration-300 group-hover:text-primary/30">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Title with uniform min-height for horizontal alignment across cards */}
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 min-h-[4rem] sm:min-h-[4.5rem] flex items-start leading-snug">
                    {programme.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-muted-foreground flex-grow">
                    {programme.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
