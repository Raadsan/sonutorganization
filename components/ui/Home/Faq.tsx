"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import Link from "next/link";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "What is SONUT?",
    answer: "SONUT stands for the Somali National Union of Teachers. It is a national organization that represents, supports, and advocates for teachers across Somalia.",
  },
  {
    question: "What is the main purpose of SONUT?",
    answer: "The main purpose of SONUT is to protect teachers’ rights, promote quality education, strengthen the teaching profession, and unite Somali teachers under one national platform.",
  },
  {
    question: "Who can become a member of SONUT?",
    answer: "Teachers working in public schools, private schools, universities, colleges, and other educational institutions can apply to become members of SONUT, according to the union’s membership requirements.",
  },
  {
    question: "Why should a teacher join SONUT?",
    answer: "Joining SONUT gives teachers an opportunity to be represented, access professional development opportunities, participate in educational discussions, build networks with fellow teachers, and contribute to improving education in Somalia.",
  },
  {
    question: "What services does SONUT provide to teachers?",
    answer: "SONUT supports teachers through advocacy, training, workshops, conferences, awareness programs, professional networking, representation, and educational development activities.",
  },
  {
    question: "Does SONUT protect teachers’ rights?",
    answer: "Yes. SONUT works to advocate for the professional, social, and employment rights of teachers. It also raises teachers’ concerns with relevant educational stakeholders and decision-makers.",
  },
  {
    question: "How can I register as a SONUT member?",
    answer: "A teacher can register by completing the SONUT membership form, providing the required personal and professional information, and fulfilling the membership conditions set by the union.",
  },
  {
    question: "Is SONUT only for school teachers?",
    answer: "No. SONUT can support teachers and educators from different levels of education, including primary schools, secondary schools, colleges, universities, vocational institutions, and other learning centers.",
  },
  {
    question: "Does SONUT organize training for teachers?",
    answer: "Yes. SONUT organizes and supports training programs, workshops, seminars, conferences, and professional development activities aimed at improving teachers’ knowledge, skills, and classroom performance.",
  },
  {
    question: "What topics are covered in SONUT teacher trainings?",
    answer: "Training topics may include effective teaching methods, classroom management, curriculum development, assessment techniques, educational leadership, child protection, inclusive education, technology in teaching, and teachers’ rights.",
  },
  {
    question: "How does SONUT contribute to improving education in Somalia?",
    answer: "SONUT contributes by strengthening teachers’ capacity, promoting teacher welfare, encouraging professional standards, supporting educational reforms, and working with education authorities and partners.",
  },
  {
    question: "Can SONUT work with the Ministry of Education?",
    answer: "Yes. SONUT can cooperate with the Ministry of Education, regional education authorities, schools, universities, civil society organizations, and international partners to promote quality education and teacher development.",
  },
  {
    question: "Does SONUT represent female teachers?",
    answer: "Yes. SONUT supports the participation, leadership, rights, safety, and professional growth of female teachers. It may also organize special programs and conferences for women teachers.",
  },
  {
    question: "What is the role of SONUT in teachers’ professional development?",
    answer: "SONUT helps teachers improve their professional skills through capacity-building programs, mentorship, information sharing, networking opportunities, and participation in educational events.",
  },
  {
    question: "Can young or newly qualified teachers join SONUT?",
    answer: "Yes. Newly qualified teachers and early-career educators can join SONUT and benefit from professional guidance, training opportunities, networking, and teacher development programs.",
  },
  {
    question: "Does SONUT organize national teacher conferences?",
    answer: "Yes. SONUT can organize national conferences, meetings, forums, and educational summits that bring together teachers, school leaders, education experts, government representatives, and partners.",
  },
  {
    question: "How can teachers participate in SONUT activities?",
    answer: "Teachers can participate by becoming members, attending meetings, joining training sessions, volunteering in programs, participating in committees, and following SONUT’s official announcements.",
  },
  {
    question: "What is SONUT’s vision for Somali teachers?",
    answer: "SONUT aims to build a united, empowered, skilled, respected, and professionally supported teaching community that contributes to a strong education system in Somalia.",
  },
  {
    question: "How can schools or organizations collaborate with SONUT?",
    answer: "Schools, universities, NGOs, government institutions, and development partners can collaborate with SONUT through teacher training, education projects, research, conferences, advocacy campaigns, and community education initiatives.",
  },
  {
    question: "How can I get more information about SONUT?",
    answer: "You can contact SONUT through its official leadership, communication channels, social media platforms, meetings, membership offices, or official announcements.",
  },
];

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-gray-50/50 relative overflow-hidden border-t border-gray-100">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-72 h-72 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div>
          
          {/* Left Column - Header info */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-14 flex max-w-3xl flex-col items-center text-center"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1E0D79]/10 text-primary text-xs font-bold tracking-widest uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              FAQ
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-serif font-extrabold text-primary mb-6 leading-tight">
              Frequently Asked Questions About SONUT
            </h2>

            {/* Paragraph */}
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-8">
              Here are answers to the most common questions about the Somali National Union of Teachers (SONUT). If you can&apos;t find what you are looking for, feel free to contact us.
            </p>

            {/* Secondary CTA */}
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contactus"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-primary text-primary px-6 py-3 text-sm font-semibold transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-lg"
              >
                Still have questions? Contact Us
              </Link>
            </div>
          </motion.div>

          {/* Two accordion columns: 10 questions in each column */}
          <div className="grid items-start gap-5 lg:grid-cols-2">
            {[faqs.slice(0, 10), faqs.slice(10, 20)].map((column, columnIndex) => (
              <div key={columnIndex} className="flex flex-col gap-4">
            {column.map((faq, index) => {
              const actualIndex = columnIndex * 10 + index;
              const isOpen = activeIndex === actualIndex;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className={`bg-white rounded-2xl border transition-all duration-300 ${
                    isOpen 
                      ? "border-primary/20 shadow-lg shadow-primary/5" 
                      : "border-gray-100 hover:border-gray-200 hover:shadow-md"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(actualIndex)}
                    className="w-full flex items-start gap-4 px-6 md:px-8 py-5 text-left font-bold text-gray-900 group"
                  >
                    <div className={`mt-0.5 rounded-lg p-1.5 flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? "bg-primary/10 text-primary" : "bg-gray-100 text-gray-400 group-hover:bg-primary/5 group-hover:text-primary"
                    }`}>
                      <HelpCircle className="w-5 h-5" />
                    </div>
                    <span className="text-base md:text-lg flex-grow pr-4 select-none pt-0.5 leading-snug">
                      {faq.question}
                    </span>
                    <div className="shrink-0 mt-1">
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-primary" : "group-hover:text-gray-600"
                        }`}
                      />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 md:px-8 pb-6 ml-11 text-sm md:text-base text-muted-foreground leading-relaxed border-t border-gray-50 pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
