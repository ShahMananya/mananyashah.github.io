import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Github, Linkedin, Mail, ArrowUp, Heart, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-white/40 dark:bg-black/40 backdrop-blur-2xl text-slate-600 dark:text-slate-400 py-16 border-t border-slate-200/80 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 pb-12 border-b border-slate-200/60 dark:border-white/10">
          <div className="max-w-md">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-display font-bold text-base shadow-lg shadow-indigo-600/30">
                M
              </div>
              <span className="font-display font-extrabold text-lg text-slate-900 dark:text-white">
                {portfolioData.personal.fullName}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-white/60 leading-relaxed mb-4">
              Building robust data pipelines, scalable ML architectures, and executive BI dashboards. M.S. in Computer Science from Pace University.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-[11px] font-semibold backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for Full-time Roles in 2026</span>
            </div>
          </div>

          {/* Quick Nav Anchor Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs">
            <div>
              <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider block mb-3">
                Exploration
              </span>
              <ul className="space-y-2">
                <li><a href="#roles" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Target Roles</a></li>
                <li><a href="#projects" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Featured Projects</a></li>
                <li><a href="#skills" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Technical Skills</a></li>
              </ul>
            </div>

            <div>
              <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider block mb-3">
                Background
              </span>
              <ul className="space-y-2">
                <li><a href="#experience" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Work Experience</a></li>
                <li><a href="#education" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Education & GPA</a></li>
                <li><a href="#certifications" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Certifications</a></li>
              </ul>
            </div>

            <div>
              <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider block mb-3">
                Connect
              </span>
              <ul className="space-y-2">
                <li>
                  <a href={portfolioData.personal.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 dark:hover:text-white transition-colors flex items-center gap-1.5">
                    <Linkedin className="w-3.5 h-3.5 text-indigo-500" />
                    <span>LinkedIn</span>
                  </a>
                </li>
                <li>
                  <a href={portfolioData.personal.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 dark:hover:text-white transition-colors flex items-center gap-1.5">
                    <Github className="w-3.5 h-3.5 text-indigo-500" />
                    <span>GitHub</span>
                  </a>
                </li>
                <li>
                  <button onClick={onOpenContact} className="hover:text-indigo-600 dark:hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer">
                    <Mail className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Send Message</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-slate-500 dark:text-white/40">
          <div>
            © {new Date().getFullYear()} {portfolioData.personal.fullName}. Frosted Glass UI with dark/light mode & smooth motion.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-600 dark:text-white/60 hover:text-indigo-600 dark:hover:text-white transition-colors p-2 rounded-xl hover:bg-white/60 dark:hover:bg-white/10 backdrop-blur-md cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
