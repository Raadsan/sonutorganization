import MediaPageBanner from "@/components/Media/PageBanner";
import { BarChart3, BookOpen, FileText, Search } from "lucide-react";

const reportTypes = [
  {
    icon: FileText,
    title: "Annual Reports",
    description: "An overview of SONUT's yearly achievements, programmes, partnerships, and institutional progress.",
  },
  {
    icon: BarChart3,
    title: "Education Reports",
    description: "Evidence and insights on the teaching profession, learning conditions, and education priorities in Somalia.",
  },
  {
    icon: Search,
    title: "Research & Assessments",
    description: "Research findings that help educators and decision-makers understand challenges and identify solutions.",
  },
  {
    icon: BookOpen,
    title: "Policy Briefs",
    description: "Concise recommendations designed to support informed policy discussions and sustainable education reform.",
  },
];

export const metadata = {
  title: "Reports | SONUT",
  description: "Access SONUT reports, research, assessments, and education policy briefs.",
};

export default function ReportsPage() {
  return (
    <main>
      <MediaPageBanner
        title="Reports"
        description="Explore our reports, research, and publications on teachers and education in Somalia."
      />
      <section className="bg-gray-50 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-secondary">Knowledge & Evidence</span>
            <h2 className="mt-3 text-3xl font-extrabold text-primary md:text-5xl">Our Publications</h2>
            <p className="mt-4 text-muted-foreground">SONUT publications support transparency, learning, and evidence-based decisions.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {reportTypes.map((report) => (
              <article key={report.title} className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm md:p-9">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <report.icon className="h-7 w-7" />
                </div>
                <h2 className="mb-3 text-xl font-bold text-gray-900">{report.title}</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">{report.description}</p>
                <span className="mt-5 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500">Publications coming soon</span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
