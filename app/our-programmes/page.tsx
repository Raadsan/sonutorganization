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
    <main>
      <WhatWeDoPageBanner
        title="Our Programmes"
        description="Practical programmes that empower educators, protect their rights, and improve education across Somalia."
      />
      <section className="bg-gray-50 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-secondary">Our Areas of Work</span>
            <h2 className="mt-3 text-3xl font-extrabold text-primary md:text-5xl">Building a Stronger Teaching Profession</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programmes.map((programme, index) => (
              <article key={programme.title} className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                <span className="absolute right-5 top-3 text-6xl font-black text-primary/5">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <programme.icon className="h-7 w-7" />
                </div>
                <h3 className="relative mb-3 text-xl font-bold text-gray-900">{programme.title}</h3>
                <p className="relative text-sm leading-relaxed text-muted-foreground">{programme.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
