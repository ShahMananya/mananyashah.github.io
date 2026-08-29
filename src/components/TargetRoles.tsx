import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { TargetRole } from '../types';
import { 
  Brain, 
  Zap, 
  BarChart3, 
  TrendingUp, 
  Code2, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Layers,
  Award
} from 'lucide-react';

interface TargetRolesProps {
  selectedRoleFilter: string;
  onSelectRoleFilter: (roleId: string) => void;
  onSelectProject: (projectId: string) => void;
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Brain: Brain,
  Zap: Zap,
  BarChart3: BarChart3,
  TrendingUp: TrendingUp,
  Code2: Code2,
};

export const TargetRoles: React.FC<TargetRolesProps> = ({
  selectedRoleFilter,
  onSelectRoleFilter,
  onSelectProject,
}) => {
  const [activeRoleModal, setActiveRoleModal] = useState<TargetRole | null>(null);

  return (
    <section id="roles" className="py-20 lg:py-28 scroll-mt-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
              <span>Core Specializations & Career Focus</span>
            </div>
            <h2 className="font-display font-light text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
              Tailored <span className="font-extrabold text-slate-900 dark:text-white">Engineering & Analytics</span> Profiles
            </h2>
            <p className="text-slate-600 dark:text-white/60 mt-2 text-base">
              Explore key competencies, proven achievements, and mapped project implementations by discipline.
            </p>
          </div>

          {/* Filter Status Badge */}
          {selectedRoleFilter !== 'all' && (
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500 dark:text-white/40">Filtered view active:</span>
              <button
                onClick={() => onSelectRoleFilter('all')}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Reset to All Specializations</span>
                <span>×</span>
              </button>
            </div>
          )}
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioData.targetRoles.map((role) => {
            const IconComponent = iconMap[role.iconName] || Layers;
            const isSelected = selectedRoleFilter === role.id;

            return (
              <div
                key={role.id}
                className={`group relative rounded-3xl p-6 sm:p-7 transition-all duration-300 backdrop-blur-xl flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white/90 dark:bg-white/10 border border-indigo-500/50 shadow-2xl shadow-indigo-500/20 ring-1 ring-indigo-500/40'
                    : 'bg-white/70 dark:bg-white/5 hover:bg-white/90 dark:hover:bg-white/[0.08] border border-slate-200/80 dark:border-white/10 hover:border-indigo-400/40 shadow-lg dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]'
                }`}
              >
                <div>
                  {/* Top Bar: Icon, Badge, and Quick Toggle */}
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 dark:bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-105 transition-transform duration-300">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white/60 dark:bg-white/10 text-slate-700 dark:text-white/80 border border-slate-200/60 dark:border-white/10">
                          {role.shortLabel}
                        </span>
                        <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white leading-snug mt-1">
                          {role.title}
                        </h3>
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectRoleFilter(isSelected ? 'all' : role.id)}
                      title={isSelected ? "Deselect filter" : "Filter portfolio by this role"}
                      className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-xl transition-all cursor-pointer backdrop-blur-md ${
                        isSelected 
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' 
                          : 'bg-white/60 dark:bg-white/5 text-slate-600 dark:text-white/60 hover:text-indigo-600 dark:hover:text-white hover:bg-white dark:hover:bg-white/10 border border-slate-200/80 dark:border-white/10'
                      }`}
                    >
                      {isSelected ? 'Active' : 'Filter'}
                    </button>
                  </div>

                  {/* Role Tagline & Description */}
                  <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                    {role.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-white/60 leading-relaxed mb-5">
                    {role.description}
                  </p>

                  {/* Key Skills Tags */}
                  <div className="mb-5">
                    <span className="text-[10px] font-bold text-slate-500 dark:text-white/40 uppercase tracking-widest block mb-2">
                      Core Tooling & Focus:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {role.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2.5 py-1 rounded-lg bg-white/60 dark:bg-white/[0.04] text-slate-700 dark:text-white/75 border border-slate-200/60 dark:border-white/10 font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Highlights / Key Accomplishments */}
                  <div className="space-y-2 mb-6">
                    <span className="text-[10px] font-bold text-slate-500 dark:text-white/40 uppercase tracking-widest block mb-1">
                      Key Quantifiable Outcomes:
                    </span>
                    {role.achievements.map((ach, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-white/70">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400 mt-0.5 shrink-0" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Mapped Project Links */}
                <div className="pt-4 border-t border-slate-200/60 dark:border-white/10">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-white/40 block mb-2">
                    Key Mapped Case Studies:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {role.relevantProjectIds.map((projId) => {
                      const proj = portfolioData.projects.find(p => p.id === projId);
                      if (!proj) return null;
                      return (
                        <button
                          key={projId}
                          onClick={() => onSelectProject(projId)}
                          className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 hover:text-indigo-800 dark:hover:text-white bg-indigo-500/10 dark:bg-indigo-500/15 hover:bg-indigo-500/25 border border-indigo-500/25 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 group/btn cursor-pointer"
                        >
                          <span>{proj.title.split(' ')[0]} {proj.title.split(' ')[1] || ''}</span>
                          <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
