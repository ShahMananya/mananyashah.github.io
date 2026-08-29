import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TargetRoles } from './components/TargetRoles';
import { ProjectShowcase } from './components/ProjectShowcase';
import { SkillsMatrix } from './components/SkillsMatrix';
import { ExperienceSection } from './components/ExperienceSection';
import { EducationSection } from './components/EducationSection';
import { CertificationsSection } from './components/CertificationsSection';
import { MicroInternshipsSection } from './components/MicroInternshipsSection';
import { AwardsSection } from './components/AwardsSection';
import { Footer } from './components/Footer';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { CertificateModal } from './components/CertificateModal';
import { ContactModal } from './components/ContactModal';
import { portfolioData } from './data/portfolioData';
import { ProjectDetail, CertificateItem, MicroInternshipItem } from './types';

export default function App() {
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<ProjectDetail | null>(null);
  const [activeCertificate, setActiveCertificate] = useState<CertificateItem | MicroInternshipItem | null>(null);
  const [contactModalOpen, setContactModalOpen] = useState<boolean>(false);

  const handleSelectProjectById = (projectId: string) => {
    const found = portfolioData.projects.find((p) => p.id === projectId);
    if (found) {
      setActiveProject(found);
    }
  };

  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen bg-slate-100/90 dark:bg-[#0A0A0B] text-slate-900 dark:text-white transition-colors duration-300 antialiased selection:bg-indigo-500/20 selection:text-indigo-600 dark:selection:text-indigo-300 relative overflow-x-hidden">
        
        {/* Frosted Glass Ambient Glowing Orbs */}
        <div className="fixed -top-32 -left-32 w-[55vw] max-w-[700px] h-[55vw] max-h-[700px] bg-indigo-600/20 dark:bg-indigo-600/30 rounded-full blur-[140px] pointer-events-none z-0 animate-orb-1" />
        <div className="fixed top-1/3 -right-32 w-[50vw] max-w-[650px] h-[50vw] max-h-[650px] bg-purple-600/15 dark:bg-purple-600/25 rounded-full blur-[140px] pointer-events-none z-0 animate-orb-2" />
        <div className="fixed -bottom-32 left-1/4 w-[45vw] max-w-[600px] h-[45vw] max-h-[600px] bg-cyan-600/15 dark:bg-cyan-500/20 rounded-full blur-[140px] pointer-events-none z-0 animate-orb-1" />

        {/* Subtle grid pattern overlay */}
        <div 
          className="fixed inset-0 opacity-[0.025] dark:opacity-[0.04] pointer-events-none z-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '36px 36px'
          }}
        />

        {/* Navigation Bar */}
        <div className="relative z-50">
          <Navbar 
            onOpenContact={() => setContactModalOpen(true)}
            selectedRoleFilter={selectedRoleFilter}
            onSelectRoleFilter={setSelectedRoleFilter}
          />
        </div>

        {/* Main Content Layout */}
        <main className="relative z-10">
          {/* Hero Section with stats & role filters */}
          <Hero 
            onOpenContact={() => setContactModalOpen(true)}
            selectedRoleFilter={selectedRoleFilter}
            onSelectRoleFilter={setSelectedRoleFilter}
          />

          {/* Target Roles & Specializations Explorer */}
          <TargetRoles 
            selectedRoleFilter={selectedRoleFilter}
            onSelectRoleFilter={setSelectedRoleFilter}
            onSelectProject={handleSelectProjectById}
          />

          {/* Projects Showcase & Architecture Deep-Dives */}
          <ProjectShowcase 
            onSelectProject={handleSelectProjectById}
            selectedRoleFilter={selectedRoleFilter}
          />

          {/* Technical Skills Matrix */}
          <SkillsMatrix />

          {/* Work Experience Timeline */}
          <ExperienceSection />

          {/* Education & Academic Rigor */}
          <EducationSection />

          {/* Certifications & Hackathon Wins */}
          <CertificationsSection 
            onSelectCertificate={(cert) => setActiveCertificate(cert)}
          />

          {/* Micro-Internships & Virtual Experiences */}
          <MicroInternshipsSection 
            onSelectInternship={(internship) => setActiveCertificate(internship)}
          />

          {/* Awards & Recognition */}
          <AwardsSection />
        </main>

        {/* Footer */}
        <div className="relative z-10">
          <Footer onOpenContact={() => setContactModalOpen(true)} />
        </div>

        {/* Global Modals */}
        <ProjectDetailModal 
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />

        <CertificateModal 
          item={activeCertificate}
          onClose={() => setActiveCertificate(null)}
        />

        <ContactModal 
          isOpen={contactModalOpen}
          onClose={() => setContactModalOpen(false)}
        />
      </div>
    </ThemeProvider>
  );
}
