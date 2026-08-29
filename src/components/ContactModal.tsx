import React, { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';
import { 
  X, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Send, 
  Check, 
  Copy, 
  Sparkles,
  Calendar,
  Clock,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    roleInterest: 'Data Scientist',
    message: '',
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(portfolioData.personal.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Safe fallback
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl transition-opacity animate-fadeInUp"
      />

      {/* Dialog Window */}
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white/90 dark:bg-[#121216]/90 border border-slate-200/80 dark:border-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl z-10 p-6 sm:p-8 animate-fadeInUp">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-6 right-6 p-2.5 rounded-full bg-white/80 dark:bg-white/10 text-slate-500 hover:text-slate-900 dark:text-white/60 dark:hover:text-white border border-slate-200/60 dark:border-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2 border border-indigo-500/30 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
            <span>Open for Immediate Opportunities</span>
          </div>
          <h2 className="font-display font-light text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
            Let's Discuss <span className="font-extrabold text-slate-900 dark:text-white">New Opportunities</span>
          </h2>
          <p className="text-sm text-slate-600 dark:text-white/60 mt-1">
            Looking for a Data Scientist, AI/ML Engineer, or Business Intelligence specialist? Reach out below.
          </p>
        </div>

        {/* Quick Contact Chips Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {/* Email Chip */}
          <div className="p-4 rounded-2xl bg-white/60 dark:bg-white/[0.04] border border-slate-200/70 dark:border-white/10 flex items-center justify-between backdrop-blur-md">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/25 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-white/40 block">Direct Email</span>
                <span className="text-xs font-semibold text-slate-900 dark:text-white truncate block">
                  {portfolioData.personal.email}
                </span>
              </div>
            </div>
            <button
              onClick={handleCopyEmail}
              className="p-2 rounded-xl bg-white/80 dark:bg-white/10 text-slate-600 dark:text-white/80 hover:text-indigo-600 border border-slate-200/80 dark:border-white/10 shrink-0 ml-2 cursor-pointer transition-colors"
              title="Copy email"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Phone Chip */}
          <div className="p-4 rounded-2xl bg-white/60 dark:bg-white/[0.04] border border-slate-200/70 dark:border-white/10 flex items-center justify-between backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/25 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-white/40 block">Phone</span>
                <span className="text-xs font-semibold text-slate-900 dark:text-white block">
                  {portfolioData.personal.phone}
                </span>
              </div>
            </div>
            <button
              onClick={handleCopyPhone}
              className="p-2 rounded-xl bg-white/80 dark:bg-white/10 text-slate-600 dark:text-white/80 hover:text-indigo-600 border border-slate-200/80 dark:border-white/10 shrink-0 ml-2 cursor-pointer transition-colors"
              title="Copy phone"
            >
              {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Interactive Direct Message Form */}
        {formSubmitted ? (
          <div className="p-8 rounded-3xl bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/30 text-center backdrop-blur-md">
            <div className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-600/30">
              <Check className="w-7 h-7" />
            </div>
            <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white mb-2">
              Message Dispatched Successfully!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-white/70 max-w-md mx-auto mb-6">
              Thank you for reaching out, <strong>{formData.name}</strong>. I will review your message and reply to <strong>{formData.email}</strong> shortly.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => {
                  setFormSubmitted(false);
                  setFormData({ name: '', email: '', roleInterest: 'Data Scientist', message: '' });
                }}
                className="px-4 py-2 rounded-xl bg-white/80 dark:bg-white/10 text-slate-700 dark:text-white/80 text-xs font-semibold border border-slate-200/80 dark:border-white/10 cursor-pointer"
              >
                Send Another Note
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-white/80 block mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/60 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/40 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 backdrop-blur-md"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-white/80 block mb-1.5">
                  Your Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. sarah@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/60 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/40 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 backdrop-blur-md"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-white/80 block mb-1.5">
                Target Role / Opportunity Focus
              </label>
              <select
                value={formData.roleInterest}
                onChange={(e) => setFormData({ ...formData, roleInterest: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/80 dark:bg-zinc-900 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Data Scientist">Data Scientist Role</option>
                <option value="AI / ML Engineer">AI / ML Engineer Role</option>
                <option value="Business Intelligence Analyst">Business Intelligence Analyst Role</option>
                <option value="Data Analyst">Data Analyst Role</option>
                <option value="Software Engineer">Software Engineer Role</option>
                <option value="Co-Op / Internship">Co-Op / Internship Opportunity</option>
                <option value="General Inquiry">General Networking & Tech Discussion</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-white/80 block mb-1.5">
                Message / Role Details *
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Let me know about your team, tech stack, or schedule a quick screening call..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/60 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/40 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 backdrop-blur-md resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3 text-slate-500 dark:text-white/50 text-xs">
                <a
                  href={portfolioData.personal.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-600 dark:hover:text-white transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={portfolioData.personal.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-600 dark:hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 disabled:opacity-50 transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Sending Note...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
