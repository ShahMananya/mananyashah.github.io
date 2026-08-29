import React, { useEffect } from 'react';
import { CertificateItem, MicroInternshipItem } from '../types';
import { 
  X, 
  ExternalLink, 
  Download, 
  Award, 
  Calendar, 
  Building, 
  CheckCircle2,
  FileCheck
} from 'lucide-react';

interface CertificateModalProps {
  item: CertificateItem | MicroInternshipItem | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ item, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  const isCert = 'issuer' in item;
  const title = item.title;
  const organization = isCert ? (item as CertificateItem).issuer : (item as MicroInternshipItem).company;
  const date = item.date;
  const image = isCert ? (item as CertificateItem).image : undefined;
  const verificationUrl = isCert ? (item as CertificateItem).verificationUrl : (item as MicroInternshipItem).verificationUrl;
  const downloadUrl = isCert ? (item as CertificateItem).downloadUrl : (item as MicroInternshipItem).certificateUrl;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl transition-opacity duration-300 animate-fadeInUp"
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white/90 dark:bg-[#121216]/90 border border-slate-200/80 dark:border-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl z-10 p-6 sm:p-8 animate-fadeInUp">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-6 right-6 p-2 rounded-full bg-white/80 dark:bg-white/10 text-slate-500 hover:text-slate-900 dark:text-white/60 dark:hover:text-white border border-slate-200/60 dark:border-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-3 border border-indigo-500/30 backdrop-blur-md">
          <Award className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
          <span>{isCert ? 'Verified Credential' : 'Virtual Experience Program'}</span>
        </div>

        {/* Title */}
        <h3 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white leading-tight mb-2">
          {title}
        </h3>

        <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-white/50 mb-6">
          <span className="text-indigo-600 dark:text-indigo-400 font-bold">{organization}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
            {date}
          </span>
        </div>

        {/* Certificate Image (if available) */}
        {image && (
          <div className="mb-6 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-white/10 bg-slate-950">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-auto max-h-80 object-contain mx-auto"
            />
          </div>
        )}

        {/* Description or details */}
        {item.description && (
          <p className="text-xs sm:text-sm text-slate-600 dark:text-white/70 leading-relaxed mb-4">
            {item.description}
          </p>
        )}

        {/* Learnings (if micro-internship) */}
        {!isCert && (item as MicroInternshipItem).learnings && (
          <div className="mb-6 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-white/40 block mb-2">
              Key Competencies Mastered:
            </span>
            {(item as MicroInternshipItem).learnings.map((learn, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-white/70">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400 mt-0.5 shrink-0" />
                <span>{learn}</span>
              </div>
            ))}
          </div>
        )}

        {/* Skills Tags */}
        {item.skills && item.skills.length > 0 && (
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-white/40 block mb-2">
              Validated Skills:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {item.skills.map((s, idx) => (
                <span 
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-white/60 dark:bg-white/[0.05] text-slate-700 dark:text-white/75 border border-slate-200/60 dark:border-white/10 text-xs font-medium"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-6 border-t border-slate-200/60 dark:border-white/10">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/80 dark:bg-white/10 text-slate-700 dark:text-white/80 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-white/20 border border-slate-200/80 dark:border-white/10 transition-colors cursor-pointer"
          >
            Close
          </button>

          {downloadUrl && (
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold hover:opacity-90 transition-opacity shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF Certificate</span>
            </a>
          )}

          {verificationUrl && (
            <a
              href={verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Verify Online</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
