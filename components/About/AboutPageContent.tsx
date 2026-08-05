import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpen, ShieldCheck } from "lucide-react";

export default function AboutPageContent() {
  return (
    <section className="overflow-hidden bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-16">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-lg overflow-hidden rounded-3xl bg-gray-100 shadow-2xl md:mx-0">
            <Image src="/images/1.jpg" alt="SONUT teacher representative" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>

          <div className="flex flex-col">
            <div className="mb-6 inline-flex items-center gap-2 self-start rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-secondary">
              <span className="h-2 w-2 animate-pulse rounded-full bg-secondary" />
              About Us
            </div>
            <h2 className="mb-6 font-serif text-4xl font-extrabold leading-[1.15] text-primary md:text-5xl">
              Empowering Teachers, Strengthening Education
            </h2>

            <div className="mb-8 space-y-5 text-sm leading-relaxed text-muted-foreground md:text-base">
              <p>
                The <strong className="text-foreground">Somali National Union of Teachers (SONUT)</strong> is an organization that represents teachers in Somalia and plays an important role in advocating for their rights and welfare. Its members come from pre-tertiary levels of the education system, including public and private primary, junior and senior secondary schools, teacher training colleges, and technical institutes.
              </p>
              <p>
                SONUT, formerly SNUT, was established on November 21, 2007, by a group of head teachers from seven different regions across Somalia. It was established to revive hope and support teachers in their efforts to transform the lives of pupils and students at all levels of education. SONUT is committed to providing programs that address teachers&apos; essential needs and are relevant to the current situation. Membership is open to all teachers, regardless of race or location.
              </p>
            </div>

            <div className="mb-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-100 bg-gray-50/80 p-5">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10 text-secondary"><ShieldCheck className="h-5 w-5" /></div>
                  <span className="text-sm font-bold text-primary">Teacher Advocacy</span>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">Defending teachers&apos; rights, welfare, and professional interests.</p>
              </div>
              <div className="rounded-xl border border-gray-100 bg-gray-50/80 p-5">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10 text-secondary"><BookOpen className="h-5 w-5" /></div>
                  <span className="text-sm font-bold text-primary">Professional Development</span>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">Providing training, capacity building, and educational support.</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/contactus" className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-transform hover:scale-105">
                Contact Now <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link href="/join" className="inline-flex items-center gap-2 rounded-full border border-primary px-7 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white">
                Join Us <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
