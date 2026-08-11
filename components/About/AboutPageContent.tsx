import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

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
              Somali National Union of Teachers
            </h2>

            <div className="mb-8 space-y-5 text-sm leading-relaxed text-muted-foreground md:text-base text-justify">
              <p>
                The <strong className="text-foreground">Somali National Union of Teachers (SONUT)</strong>{" "}is a national service organization concerned with ensuring better conditions of service for its members. Our members are drawn from pre-tertiary levels of the educational system, including public and private primary and secondary schools, teacher training colleges, technical institutes, and offices of educational administration units.
              </p>
              <p>
                SONUT (formerly SNUT) was established on{" "}
                <strong className="text-foreground">November 21st, 2004</strong>{" "}by a group of head teachers from seven different regions across Somalia. The union was created to revive hope and support teachers in their effort to transform the lives of pupils and students at all levels of education. We are committed to providing programs that answer teachers&apos; basic needs and remain highly relevant to current challenges, welcoming all teachers regardless of race or location.
              </p>
              <p>
                Importantly, SONUT was established to break ethnic and tribal barriers, organizing teachers into one cohesive force to safeguard their interests and those of the nation. The organization is fully equipped to maintain professional norms, shape national policies, and build strong international relations.
              </p>
              <p>
                Our formation came at a critical time when many teachers faced severe issues with local hostility, including kidnappings, injuries, and tragic loss of life in broad daylight. These issues raised an alarming siren across the nation. Today, they challenge all of us to introspect on the value we place on our educators, and what contributions we must make to ensure they can work in a safe atmosphere that brings out their best.
              </p>
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
