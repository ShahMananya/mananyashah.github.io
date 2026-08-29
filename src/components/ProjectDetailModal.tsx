import React, { useEffect } from 'react';
import { ProjectDetail } from '../types';
import { 
  X, 
  ExternalLink, 
  Github, 
  CheckCircle2, 
  Cpu, 
  Layers, 
  TrendingUp, 
  AlertCircle, 
  Award,
  Sparkles
} from 'lucide-react';

interface ProjectDetailModalProps {
  project: ProjectDetail | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl transition-opacity duration-300 animate-fadeInUp"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white/90 dark:bg-[#121216]/90 border border-slate-200/80 dark:border-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl z-10 p-6 sm:p-8 animate-fadeInUp">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-6 right-6 p-2.5 rounded-full bg-white/80 dark:bg-white/10 text-slate-500 hover:text-slate-900 dark:text-white/60 dark:hover:text-white border border-slate-200/60 dark:border-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30 backdrop-blur-md">
            {project.category}
          </span>
          {project.roles.map((r, idx) => (
            <span key={idx} className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/60 dark:bg-white/[0.05] text-slate-700 dark:text-white/70 border border-slate-200/60 dark:border-white/10">
              {r}
            </span>
          ))}
        </div>

        {/* Project Title */}
        <h2 className="font-display font-light text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-white tracking-tight mb-4">
          <span className="font-extrabold">{project.title}</span>
        </h2>

        {/* Summary */}
        <p className="text-base text-slate-600 dark:text-white/70 leading-relaxed mb-6">
          {project.fullDescription}
        </p>

        {/* Metric Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-white/60 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/10 mb-8 backdrop-blur-md">
          {Object.entries(project.metrics).map(([key, val]) => (
            <div key={key} className="text-center p-2">
              <div className="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-white/40 mb-1 capitalize">
                {key.replace(/([A-Z])/g, ' $1')}
              </div>
              <div className="font-display font-extrabold text-xl text-indigo-600 dark:text-indigo-400">
                {val}
              </div>
            </div>
          ))}
        </div>

        {/* Problem, Solution, Impact 3-Column Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/25 backdrop-blur-md">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm mb-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Problem Context</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-white/70 leading-relaxed">
              {project.details.problem}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/25 backdrop-blur-md">
            <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-bold text-sm mb-2">
              <Cpu className="w-4 h-4 shrink-0" />
              <span>Engineering Solution</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-white/70 leading-relaxed">
              {project.details.solution}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/25 backdrop-blur-md">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm mb-2">
              <TrendingUp className="w-4 h-4 shrink-0" />
              <span>Measurable Impact</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-white/70 leading-relaxed">
              {project.details.impact}
            </p>
          </div>
        </div>

        {/* Architecture Pipeline Stages (if available) */}
        {project.details.architecture && (
          <div className="mb-8 p-5 rounded-2xl bg-white/60 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/10 backdrop-blur-md">
            <div className="flex items-center gap-2 font-display font-bold text-base text-slate-900 dark:text-white mb-3">
              <Layers className="w-4 h-4 text-indigo-500" />
              <span>Pipeline & Architecture Workflow</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.details.architecture.map((step, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white/80 dark:bg-white/[0.05] border border-slate-200/70 dark:border-white/10 text-xs font-mono text-slate-700 dark:text-white/80">
                  {step}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Highlights List */}
        <div className="mb-8">
          <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-3">
            Core Implementation Highlights
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {project.highlights.map((h, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-white/70">
                <CheckCircle2 className="w-4 h-4 text-indigo-500 dark:text-indigo-400 mt-0.5 shrink-0" />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Chips */}
        <div className="mb-8">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-white/40 mb-2">
            Technologies & Libraries:
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, idx) => (
              <span 
                key={idx}
                className="px-3 py-1 rounded-lg text-xs font-semibold bg-white/60 dark:bg-white/[0.05] text-slate-800 dark:text-white/80 border border-slate-200/70 dark:border-white/10 backdrop-blur-md"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Actions & Links */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-200/70 dark:border-white/10">
          <div className="text-xs text-slate-500 dark:text-white/40">
            Timeline: <strong className="text-slate-700 dark:text-white/80 font-semibold">{project.details.timeline}</strong> • Team: <strong className="text-slate-700 dark:text-white/80 font-semibold">{project.details.team}</strong>
          </div>

          <div className="flex items-center gap-3">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-md transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            )}

            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Showcase</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
