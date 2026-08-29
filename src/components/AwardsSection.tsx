import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Trophy, Star, Award, Sparkles } from 'lucide-react';

export const AwardsSection: React.FC = () => {
  return (
    <section className="py-20 scroll-mt-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-md">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>Honors & Recognitions</span>
          </div>
          <h2 className="font-display font-light text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Academic & <span className="font-extrabold text-slate-900 dark:text-white">Industry Awards</span>
          </h2>
        </div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portfolioData.awards.map((award) => (
            <div
              key={award.id}
              className="p-6 sm:p-7 rounded-3xl bg-white/70 dark:bg-white/5 border border-amber-500/20 dark:border-amber-500/30 backdrop-blur-2xl shadow-lg dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:shadow-2xl hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/25 flex items-center justify-center">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30 backdrop-blur-md">
                    {award.badge || award.year}
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-lg text-slate-900 dark:text-white mb-1">
                  {award.title}
                </h3>
                <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-3">
                  {award.organization}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-white/70 leading-relaxed">
                  {award.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between text-xs text-slate-400 dark:text-white/40">
                <span>Award Year: {award.year}</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
