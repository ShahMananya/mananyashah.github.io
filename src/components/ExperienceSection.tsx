import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { 
  Briefcase, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  Building, 
  ChevronRight,
  TrendingUp
} from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const [activeExpId, setActiveExpId] = useState<string>(portfolioData.experience[0]?.id || '');

  return (
    <section id="experience" className="py-20 lg:py-28 scroll-mt-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-md">
            <Briefcase className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
            <span>Career Journey & Engineering Impact</span>
          </div>
          <h2 className="font-display font-light text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Professional <span className="font-extrabold text-slate-900 dark:text-white">Work Experience</span>
          </h2>
          <p className="text-slate-600 dark:text-white/60 mt-2 text-base">
            Track record of architecting distributed pipelines, deploying ML models, and optimizing business intelligence workflows.
          </p>
        </div>

        {/* Timeline Cards Container */}
        <div className="space-y-8 relative">
          {/* Vertical Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute left-8 top-6 bottom-6 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-cyan-500/40" />

          {portfolioData.experience.map((exp, index) => (
            <div
              key={exp.id}
              className="relative lg:pl-20 group"
            >
              {/* Timeline Indicator Dot (Desktop) */}
              <div className="hidden lg:flex absolute left-5 top-8 -translate-x-1/2 w-7 h-7 rounded-full bg-white dark:bg-[#0A0A0B] border-4 border-indigo-500 group-hover:scale-125 transition-transform duration-300 items-center justify-center shadow-lg shadow-indigo-500/30" />

              {/* Card Container */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 hover:border-indigo-400/50 dark:hover:border-indigo-400/40 backdrop-blur-2xl shadow-lg dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300">
                
                {/* Header: Title, Company, Location, Date */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-200/60 dark:border-white/10">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/25">
                        {exp.type}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-white/50 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-indigo-500 dark:text-indigo-400" />
                        {exp.location}
                      </span>
                    </div>

                    <h3 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white">
                      {exp.title}
                    </h3>
                    <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400 mt-0.5">
                      {exp.company}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/80 dark:bg-white/10 border border-slate-200/80 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-white/80 shrink-0 self-start sm:self-center shadow-xs backdrop-blur-md">
                    <Calendar className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Key Metrics Highlight Banner */}
                {exp.metricsHighlight && (
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/30 text-xs font-bold text-indigo-800 dark:text-indigo-300 mb-5 backdrop-blur-md">
                    <TrendingUp className="w-4 h-4 text-indigo-500 dark:text-indigo-400 shrink-0" />
                    <span>Key Metrics: {exp.metricsHighlight}</span>
                  </div>
                )}

                {/* Bullet Points of Accomplishments */}
                <div className="space-y-3 mb-6">
                  {exp.achievements.map((ach, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-600 dark:text-white/70 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-indigo-500 dark:text-indigo-400 mt-0.5 shrink-0" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Tools Tags */}
                <div>
                  <span className="text-[10px] font-bold text-slate-500 dark:text-white/40 uppercase tracking-widest block mb-2">
                    Technologies Deployed:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.skills.map((skill, sidx) => (
                      <span
                        key={sidx}
                        className="text-xs px-2.5 py-1 rounded-lg bg-white/60 dark:bg-white/[0.04] text-slate-700 dark:text-white/75 border border-slate-200/60 dark:border-white/10 font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
