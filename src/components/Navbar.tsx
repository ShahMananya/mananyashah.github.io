import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { portfolioData } from '../data/portfolioData';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Sparkles, 
  ArrowUpRight, 
  Briefcase, 
  FolderGit2, 
  Wrench, 
  GraduationCap, 
  Award, 
  Mail,
  Check,
  Copy
} from 'lucide-react';

interface NavbarProps {
  onOpenContact: () => void;
  selectedRoleFilter: string;
  onSelectRoleFilter: (roleId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenContact,
  selectedRoleFilter,
  onSelectRoleFilter
}) => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const navLinks = [
    { name: 'Roles', href: '#roles', icon: Briefcase },
    { name: 'Projects', href: '#projects', icon: FolderGit2 },
    { name: 'Skills', href: '#skills', icon: Wrench },
    { name: 'Experience', href: '#experience', icon: Briefcase },
    { name: 'Education', href: '#education', icon: GraduationCap },
    { name: 'Certifications', href: '#certifications', icon: Award },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/60 dark:bg-[#0A0A0B]/60 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/10 shadow-sm dark:shadow-[0_4px_30px_rgba(0,0,0,0.3)] py-3' 
          : 'bg-white/30 dark:bg-transparent backdrop-blur-sm dark:backdrop-blur-none border-b border-slate-200/40 dark:border-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a 
          href="#" 
          className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-xl p-1"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-indigo-500 flex items-center justify-center text-white font-display font-bold text-lg shadow-lg shadow-indigo-500/20 border border-white/20 group-hover:scale-105 transition-transform duration-300">
            M
          </div>
          <div>
            <div className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white flex items-center gap-2 tracking-tight">
              <span>{portfolioData.personal.fullName}</span>
              <span className="hidden xl:inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30 backdrop-blur-md">
                M.S. CS
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-white/50 hidden sm:block">
              {portfolioData.personal.title}
            </p>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/50 dark:bg-white/5 p-1.5 rounded-full border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-xs">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-700 dark:text-white/70 hover:text-indigo-600 dark:hover:text-white hover:bg-white dark:hover:bg-white/10 rounded-full transition-all duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Controls (Theme Toggle & Contact CTA) */}
        <div className="flex items-center gap-2.5">
          {/* Quick Copy Email Button (Desktop) */}
          <button
            onClick={handleCopyEmail}
            title="Click to copy email address"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-600 dark:text-white/70 hover:bg-white/80 dark:hover:bg-white/10 border border-slate-200/60 dark:border-white/10 backdrop-blur-md transition-all duration-200"
          >
            {copiedEmail ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied Email!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy Email</span>
              </>
            )}
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            className="relative p-2.5 rounded-xl text-slate-700 dark:text-white/80 bg-white/60 dark:bg-white/5 hover:bg-white/90 dark:hover:bg-white/15 border border-slate-200/80 dark:border-white/15 backdrop-blur-md shadow-xs transition-all duration-200 hover:scale-105"
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4 text-slate-800 transition-transform duration-300 rotate-0 hover:-rotate-12" />
            ) : (
              <Sun className="w-4 h-4 text-amber-300 transition-transform duration-300 rotate-0 hover:rotate-45" />
            )}
          </button>

          {/* Get In Touch Button */}
          <button
            onClick={onOpenContact}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-white text-slate-900 dark:text-black hover:bg-indigo-50 dark:hover:bg-white/90 text-xs font-bold uppercase tracking-wider shadow-md shadow-indigo-500/10 hover:shadow-indigo-500/20 hover:scale-102 border border-slate-200 dark:border-transparent transition-all duration-200 cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="lg:hidden p-2.5 rounded-xl text-slate-700 dark:text-white/80 bg-white/60 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 border border-slate-200/80 dark:border-white/10 backdrop-blur-md transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-white/90 dark:bg-[#0A0A0B]/90 backdrop-blur-2xl border-b border-slate-200 dark:border-white/10 shadow-2xl px-4 py-6 transition-all animate-fadeInUp">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-white/80 hover:bg-white dark:hover:bg-white/10 hover:text-indigo-600 dark:hover:text-white border border-slate-200/60 dark:border-white/10 backdrop-blur-md transition-colors"
                >
                  <Icon className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                  <span>{link.name}</span>
                </a>
              );
            })}
          </div>

          <div className="flex flex-col gap-2.5 pt-4 border-t border-slate-200 dark:border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-white dark:bg-white text-slate-900 dark:text-black font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-500/20"
            >
              <Mail className="w-4 h-4" />
              <span>Contact & Schedule Call</span>
            </button>
            <button
              onClick={handleCopyEmail}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-white/60 dark:bg-white/5 text-slate-700 dark:text-white/80 font-medium text-xs border border-slate-200 dark:border-white/10 backdrop-blur-md"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">Email Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy {portfolioData.personal.email}</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
