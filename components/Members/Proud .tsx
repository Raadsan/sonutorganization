"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type Member = {
  id: number;
  name: string;
  role: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
};

const members: Member[] = [
  {
    id: 1,
    name: "Hassan Ali",
    role: "Chairperson",
    shortDescription: "A visionary leader dedicated to educational reform.",
    fullDescription: "Hassan Ali has over 20 years of experience in the education sector. He has been instrumental in advocating for better working conditions for teachers and shaping national education policies in Somalia.",
    image: "https://ui-avatars.com/api/?name=Hassan+Ali&background=0D8ABC&color=fff&size=300",
  },
  {
    id: 2,
    name: "Fadumo Abdi",
    role: "Vice Chairperson",
    shortDescription: "Championing inclusivity and teacher empowerment.",
    fullDescription: "Fadumo focuses on creating programs that empower female educators and ensure inclusive education for all students. She leads various professional development workshops across regions.",
    image: "https://ui-avatars.com/api/?name=Fadumo+Abdi&background=f43f5e&color=fff&size=300",
  },
  {
    id: 3,
    name: "Ahmed Jama",
    role: "Secretary General",
    shortDescription: "Managing operations and union administration.",
    fullDescription: "Ahmed brings strong administrative skills to the union. He oversees daily operations, member communications, and ensures that the union's strategic goals are executed effectively.",
    image: "https://ui-avatars.com/api/?name=Ahmed+Jama&background=10b981&color=fff&size=300",
  },
  {
    id: 4,
    name: "Zahra Mohamed",
    role: "Treasurer",
    shortDescription: "Ensuring financial transparency and growth.",
    fullDescription: "Zahra is responsible for the union's financial health. With a background in finance and education, she ensures transparent accounting and manages funding for teacher welfare programs.",
    image: "https://ui-avatars.com/api/?name=Zahra+Mohamed&background=8b5cf6&color=fff&size=300",
  },
  {
    id: 5,
    name: "Omar Hussein",
    role: "Head of Professional Development",
    shortDescription: "Leading training programs for educators.",
    fullDescription: "Omar designs and implements continuous learning programs for teachers. He partners with educational institutions to provide up-to-date pedagogical training for union members.",
    image: "https://ui-avatars.com/api/?name=Omar+Hussein&background=f59e0b&color=fff&size=300",
  },
  {
    id: 6,
    name: "Amina Yusuf",
    role: "Member Welfare Coordinator",
    shortDescription: "Advocating for the well-being of our teachers.",
    fullDescription: "Amina is dedicated to improving the social and economic well-being of teachers. She manages the union's welfare initiatives, including health benefits and support systems.",
    image: "https://ui-avatars.com/api/?name=Amina+Yusuf&background=0ea5e9&color=fff&size=300",
  },
];

export default function ProudMembers() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  // Prevent scrolling when modal is open
  if (typeof window !== "undefined") {
    if (selectedMember) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }

  const closeModal = () => setSelectedMember(null);

  return (
    <section className="py-24 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            OUR TEAM
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-extrabold text-primary mb-4">
            Our Proud Members
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Meet the dedicated individuals who lead and represent our union. 
            Click on any member to learn more about their role and contributions.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member) => (
            <motion.div
              key={member.id}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedMember(member)}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-square relative overflow-hidden bg-gray-100 flex items-center justify-center group">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-sm font-semibold text-primary mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {member.shortDescription}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()} // Prevent click from closing when clicking inside
              className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/10 hover:bg-black/20 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-gray-800" />
              </button>

              <div className="flex flex-col md:flex-row h-full">
                {/* Left side: Image */}
                <div className="w-full md:w-2/5 aspect-square md:aspect-auto bg-gray-100 relative">
                   <img 
                    src={selectedMember.image} 
                    alt={selectedMember.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Right side: Content */}
                <div className="w-full md:w-3/5 p-8 md:p-10 flex flex-col justify-center">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    {selectedMember.name}
                  </h3>
                  <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6 w-max">
                    {selectedMember.role}
                  </div>
                  
                  <h4 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wider">
                    About
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedMember.fullDescription}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
