import React, { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';
import { 
  ArrowRight, 
  Mail, 
  Github, 
  Linkedin, 
  FileText, 
  Check, 
  Copy, 
  Sparkles, 
  MapPin, 
  TrendingUp, 
  Database, 
  ShieldCheck, 
  Cpu, 
  Layers,
  ChevronDown
} from 'lucide-react';

interface HeroProps {
  onOpenContact: () => void;
  selectedRoleFilter: string;
  onSelectRoleFilter: (roleId: string) => void;
}

function AnimatedStatNumber({ end, prefix = "", suffix = "" }: { end: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1800;
    const stepTime = 20;
    const totalSteps = duration / stepTime;
    const increment = end / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [end]);

  return <span>{prefix}{count}{suffix}</span>;
}

export const Hero: React.FC<HeroProps> = ({ 
  onOpenContact,
  selectedRoleFilter,
  onSelectRoleFilter
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 lg:gap-16">
          {/* Left Column: Headline, Bio, and CTAs */}
          <div className="flex-1 max-w-3xl">
            {/* Live Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-md shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{portfolioData.personal.availability}</span>
              <span className="text-slate-300 dark:text-white/20">•</span>
              <span className="flex items-center gap-1 text-slate-600 dark:text-white/60">
                <MapPin className="w-3 h-3 text-indigo-500 dark:text-indigo-400" />
                {portfolioData.personal.location}
              </span>
            </div>

            {/* Name & Primary Headline */}
            <h1 className="font-display font-light text-4xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-4">
              Hi, I'm <span className="font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 dark:from-indigo-400 dark:via-purple-300 dark:to-cyan-300 bg-clip-text text-transparent">{portfolioData.personal.fullName}</span>
            </h1>

            {/* Subtitle & Role Badges */}
            <div className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white/90 mb-6 flex flex-wrap items-center gap-2 tracking-tight">
              <span>{portfolioData.personal.title}</span>
              <span className="text-indigo-500 dark:text-indigo-400 font-mono text-lg">&</span>
              <span className="text-indigo-600 dark:text-indigo-300">{portfolioData.personal.secondaryTitle}</span>
            </div>

            {/* Detailed Value Proposition Bio */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-white/60 leading-relaxed mb-8 max-w-2xl">
              Pace University Computer Science graduate student specializing in <strong className="text-slate-900 dark:text-white font-semibold">high-throughput distributed pipelines</strong>, <strong className="text-slate-900 dark:text-white font-semibold">91% accurate ensemble ML architectures</strong>, and <strong className="text-slate-900 dark:text-white font-semibold">executive Power BI analytics</strong> processing millions of records.
            </p>

            {/* Quick Specialization Filter Chips */}
            <div className="mb-8">
              <div className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-white/40 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                <span>Explore Specific Disciplines:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {portfolioData.targetRoles.map((role) => {
                  const isSelected = selectedRoleFilter === role.id;
                  return (
                    <button
                      key={role.id}
                      onClick={() => onSelectRoleFilter(isSelected ? 'all' : role.id)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 backdrop-blur-md cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-500 scale-105'
                          : 'bg-white/60 dark:bg-white/5 text-slate-700 dark:text-white/70 border border-slate-200/80 dark:border-white/10 hover:border-indigo-400/40 hover:bg-white/90 dark:hover:bg-white/10 hover:text-indigo-600 dark:hover:text-white'
                      }`}
                    >
                      <span>{role.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hero CTAs and Quick Actions */}
            <div className="flex flex-wrap items-center gap-3.5 mb-8">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-white text-slate-950 dark:text-black font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/25 hover:bg-indigo-50 dark:hover:bg-white/90 hover:scale-102 border border-slate-200 dark:border-transparent transition-all duration-200"
              >
                <span>View Portfolio Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenContact}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/60 dark:bg-white/5 text-slate-800 dark:text-white font-bold text-xs uppercase tracking-wider border border-slate-200/80 dark:border-white/15 backdrop-blur-md hover:bg-white/90 dark:hover:bg-white/10 hover:border-indigo-400/40 transition-all duration-200 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Let's Talk</span>
              </button>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-white/40 dark:bg-white/[0.04] text-slate-700 dark:text-white/70 text-xs font-medium hover:bg-white/80 dark:hover:bg-white/10 border border-slate-200/60 dark:border-white/10 backdrop-blur-md transition-all duration-200 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Email Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-400" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>

            {/* Social Links & Resume Link */}
            <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-white/50">
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-white/40">Connect:</span>
              <a
                href={portfolioData.personal.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-slate-700 dark:text-white/70 hover:text-indigo-600 dark:hover:text-white text-xs uppercase tracking-wider font-semibold transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                <span>LinkedIn</span>
              </a>
              <span className="text-slate-300 dark:text-white/20">•</span>
              <a
                href={portfolioData.personal.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-slate-700 dark:text-white/70 hover:text-indigo-600 dark:hover:text-white text-xs uppercase tracking-wider font-semibold transition-colors"
              >
                <Github className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400" />
                <span>GitHub</span>
              </a>
              <span className="text-slate-300 dark:text-white/20">•</span>
              <a
                href={`mailto:${portfolioData.personal.email}`}
                className="flex items-center gap-1.5 text-slate-700 dark:text-white/70 hover:text-indigo-600 dark:hover:text-white text-xs uppercase tracking-wider font-semibold transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
                <span>Direct Mail</span>
              </a>
            </div>
          </div>

          {/* Right Column: Key Impact Metrics Bento Cards */}
          <div className="w-full lg:w-auto lg:min-w-[360px] xl:min-w-[420px]">
            <div className="grid grid-cols-2 gap-3.5 sm:gap-4 p-5 sm:p-6 rounded-3xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 backdrop-blur-2xl shadow-2xl dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
              
              {/* Stat 1: 5M+ Data */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/60 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 backdrop-blur-xl group hover:border-indigo-500/40 hover:bg-white/90 dark:hover:bg-white/[0.07] transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/15 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                    <Database className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
                    ETL Scale
                  </span>
                </div>
                <div className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white mb-1 tracking-tight">
                  <AnimatedStatNumber end={5} suffix="M+" />
                </div>
                <p className="text-xs text-slate-500 dark:text-white/50 font-medium">
                  Transactions & records processed via Spark & Flink
                </p>
              </div>

              {/* Stat 2: 91% Accuracy */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/60 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 backdrop-blur-xl group hover:border-purple-500/40 hover:bg-white/90 dark:hover:bg-white/[0.07] transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/15 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center border border-purple-500/20">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/10 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30">
                    0.93 AUC
                  </span>
                </div>
                <div className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white mb-1 tracking-tight">
                  <AnimatedStatNumber end={91} suffix="%" />
                </div>
                <p className="text-xs text-slate-500 dark:text-white/50 font-medium">
                  Real-time fraud classification accuracy on AWS EMR
                </p>
              </div>

              {/* Stat 3: $250M AUM Risk */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/60 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 backdrop-blur-xl group hover:border-cyan-500/40 hover:bg-white/90 dark:hover:bg-white/[0.07] transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/15 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center border border-cyan-500/20">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30">
                    Quant Risk
                  </span>
                </div>
                <div className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white mb-1 tracking-tight">
                  <AnimatedStatNumber end={250} prefix="$" suffix="M" />
                </div>
                <p className="text-xs text-slate-500 dark:text-white/50 font-medium">
                  Simulated fixed income portfolio duration & DV01 metrics
                </p>
              </div>

              {/* Stat 4: 40% Reporting Boost */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/60 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 backdrop-blur-xl group hover:border-indigo-500/40 hover:bg-white/90 dark:hover:bg-white/[0.07] transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/15 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
                    Velocity
                  </span>
                </div>
                <div className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white mb-1 tracking-tight">
                  <AnimatedStatNumber end={40} suffix="%" />
                </div>
                <p className="text-xs text-slate-500 dark:text-white/50 font-medium">
                  Reduction in leadership report generation time via Power BI
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
