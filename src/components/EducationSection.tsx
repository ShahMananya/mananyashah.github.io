import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { GraduationCap, MapPin, Calendar, Award, BookOpen, Sparkles } from 'lucide-react';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-20 lg:py-28 scroll-mt-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-md">
            <GraduationCap className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
            <span>Academic Background & Rigor</span>
          </div>
          <h2 className="font-display font-light text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Degrees & <span className="font-extrabold text-slate-900 dark:text-white">Formal Education</span>
          </h2>
          <p className="text-slate-600 dark:text-white/60 mt-2 text-base">
            Master's and Bachelor's coursework in Computer Science, Distributed Algorithms, Machine Learning, and Big Data.
          </p>
        </div>

        {/* Education Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolioData.education.map((edu, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-3xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 hover:border-indigo-400/50 dark:hover:border-indigo-400/40 backdrop-blur-2xl shadow-lg dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-extrabold border border-emerald-500/30 backdrop-blur-md">
                      GPA: {edu.gpa}
                    </span>
                  </div>
                </div>

                {/* Degree & School */}
                <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white leading-snug mb-1">
                  {edu.degree}
                </h3>
                <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400 mb-3">
                  {edu.school}
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-white/50 mb-6">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-indigo-500 dark:text-indigo-400" />
                    {edu.location}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-indigo-500 dark:text-indigo-400" />
                    {edu.period}
                  </span>
                </div>

                {/* Honors */}
                {edu.honors && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 dark:bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/25 text-xs font-semibold mb-6 backdrop-blur-md">
                    <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{edu.honors}</span>
                  </div>
                )}
              </div>

              {/* Coursework */}
              <div className="pt-4 border-t border-slate-200/60 dark:border-white/10">
                <span className="text-[10px] font-bold text-slate-500 dark:text-white/40 uppercase tracking-widest block mb-2">
                  Featured Coursework:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {edu.coursework.map((course, cidx) => (
                    <span
                      key={cidx}
                      className="text-xs px-2.5 py-1 rounded-lg bg-white/60 dark:bg-white/[0.04] text-slate-700 dark:text-white/75 border border-slate-200/60 dark:border-white/10 font-medium"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
