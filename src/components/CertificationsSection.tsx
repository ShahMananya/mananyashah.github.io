import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { CertificateItem } from '../types';
import { Award, Calendar, ExternalLink, Trophy, CheckCircle2, Eye } from 'lucide-react';

interface CertificationsSectionProps {
  onSelectCertificate: (cert: CertificateItem) => void;
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({ onSelectCertificate }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'winner' | 'cert'>('all');

  const filteredCerts = portfolioData.certificates.filter(c => {
    if (activeTab === 'all') return true;
    return c.badgeType === activeTab;
  });

  return (
    <section id="certifications" className="py-20 lg:py-28 scroll-mt-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-md">
              <Award className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
              <span>Competitions & Accreditations</span>
            </div>
            <h2 className="font-display font-light text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
              Certifications & <span className="font-extrabold text-slate-900 dark:text-white">Hackathon Accolades</span>
            </h2>
            <p className="text-slate-600 dark:text-white/60 mt-2 text-base">
              Verified competitive programming victories, IEEE hackathon finishes, and technical domain certifications.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all backdrop-blur-md cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-500'
                  : 'bg-white/60 dark:bg-white/5 text-slate-600 dark:text-white/70 hover:bg-white/80 dark:hover:bg-white/10 border border-slate-200/80 dark:border-white/10'
              }`}
            >
              All Accreditations ({portfolioData.certificates.length})
            </button>
            <button
              onClick={() => setActiveTab('winner')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all backdrop-blur-md cursor-pointer ${
                activeTab === 'winner'
                  ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20'
                  : 'bg-white/60 dark:bg-white/5 text-slate-600 dark:text-white/70 hover:bg-white/80 dark:hover:bg-white/10 border border-slate-200/80 dark:border-white/10'
              }`}
            >
              🏆 Hackathon Wins
            </button>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              onClick={() => onSelectCertificate(cert)}
              className="group p-6 sm:p-7 rounded-3xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 hover:border-indigo-400/50 dark:hover:border-indigo-400/40 backdrop-blur-2xl shadow-lg dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                    cert.badgeType === 'winner'
                      ? 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30'
                      : 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30'
                  }`}>
                    {cert.badgeType === 'winner' ? '🏆 Winner / Finalist' : 'Verified Cert'}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-white/40 font-medium">
                    {cert.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors leading-snug mb-1">
                  {cert.title}
                </h3>
                <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
                  {cert.issuer}
                </p>

                {/* Description */}
                {cert.description && (
                  <p className="text-xs text-slate-600 dark:text-white/60 line-clamp-2 mb-4 leading-relaxed">
                    {cert.description}
                  </p>
                )}

                {/* Image preview thumbnail if available */}
                {cert.image && (
                  <div className="mb-4 rounded-2xl overflow-hidden bg-slate-950 h-28 relative border border-slate-200/80 dark:border-white/10">
                    <img 
                      src={cert.image} 
                      alt={cert.title}
                      className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs">
                      <span className="px-3.5 py-1.5 rounded-xl bg-black/70 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5 border border-white/15">
                        <Eye className="w-3.5 h-3.5 text-indigo-400" />
                        Preview Credential
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Skills and View Action */}
              <div className="pt-3 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {cert.skills?.slice(0, 2).map((s, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-white/60 dark:bg-white/[0.04] text-slate-700 dark:text-white/70 border border-slate-200/60 dark:border-white/10">
                      {s}
                    </span>
                  ))}
                </div>

                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Inspect
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
