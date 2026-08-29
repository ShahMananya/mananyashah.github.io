import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { MicroInternshipItem } from '../types';
import { Briefcase, Building, ArrowRight, CheckCircle2, Award, Download } from 'lucide-react';

interface MicroInternshipsSectionProps {
  onSelectInternship: (item: MicroInternshipItem) => void;
}

export const MicroInternshipsSection: React.FC<MicroInternshipsSectionProps> = ({ onSelectInternship }) => {
  return (
    <section className="py-20 lg:py-28 scroll-mt-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-md">
            <Building className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
            <span>Virtual Experiences & Industry Simulations</span>
          </div>
          <h2 className="font-display font-light text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Enterprise <span className="font-extrabold text-slate-900 dark:text-white">Virtual Experience Programs</span>
          </h2>
          <p className="text-slate-600 dark:text-white/60 mt-2 text-base">
            Hands-on technical simulations solving quantitative modeling, risk analytics, GenAI, and distributed engineering workflows.
          </p>
        </div>

        {/* Micro-Internships Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {portfolioData.microInternships.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectInternship(item)}
              className="group p-5 rounded-3xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 hover:border-indigo-400/50 dark:hover:border-indigo-400/40 backdrop-blur-2xl shadow-lg dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Logo & Company */}
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/15 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/25 flex items-center justify-center font-bold text-xs shrink-0">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-slate-900 dark:text-white block">
                      {item.company}
                    </span>
                    <span className="text-[11px] text-slate-400 dark:text-white/40">
                      {item.date}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors leading-snug mb-2">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-white/60 line-clamp-2 mb-4 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div>
                {/* Skills Preview */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.skills.slice(0, 2).map((s, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-white/60 dark:bg-white/[0.04] text-slate-600 dark:text-white/70 border border-slate-200/60 dark:border-white/10">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
