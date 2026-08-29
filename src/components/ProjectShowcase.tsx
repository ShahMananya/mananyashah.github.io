import React, { useState, useMemo } from 'react';
import { portfolioData } from '../data/portfolioData';
import { ProjectDetail } from '../types';
import { 
  FolderGit2, 
  Search, 
  ArrowRight, 
  ExternalLink, 
  Github, 
  Sparkles, 
  SlidersHorizontal,
  Layers,
  Cpu,
  BarChart3,
  TrendingUp,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface ProjectShowcaseProps {
  onSelectProject: (projectId: string) => void;
  selectedRoleFilter: string;
}

const categories = [
  'All',
  'Machine Learning',
  'Business Intelligence',
  'System Design',
  'Financial Analytics',
  'Data Analytics',
] as const;

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ 
  onSelectProject,
  selectedRoleFilter
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProjects = useMemo(() => {
    return portfolioData.projects.filter((project) => {
      // Category filter
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;

      // Role filter (if active from hero/recruiter lens)
      let matchesRole = true;
      if (selectedRoleFilter !== 'all') {
        const activeRole = portfolioData.targetRoles.find(r => r.id === selectedRoleFilter);
        if (activeRole) {
          matchesRole = activeRole.relevantProjectIds.includes(project.id);
        }
      }

      // Search query filter
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !query || 
        project.title.toLowerCase().includes(query) ||
        project.shortDescription.toLowerCase().includes(query) ||
        project.technologies.some(t => t.toLowerCase().includes(query)) ||
        project.category.toLowerCase().includes(query);

      return matchesCategory && matchesRole && matchesSearch;
    });
  }, [selectedCategory, selectedRoleFilter, searchQuery]);

  return (
    <section id="projects" className="py-20 lg:py-28 scroll-mt-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-md">
              <FolderGit2 className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
              <span>Production Systems & Analytical Workflows</span>
            </div>
            <h2 className="font-display font-light text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
              Featured <span className="font-extrabold text-slate-900 dark:text-white">Case Studies & Architectures</span>
            </h2>
            <p className="text-slate-600 dark:text-white/60 mt-2 text-base">
              Click any project to inspect full problem statements, distributed architectures, and measurable benchmarks.
            </p>
          </div>

          {/* Live Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tech, e.g. Kafka, Power BI..."
              className="w-full pl-10 pr-8 py-2.5 text-xs rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/40 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:text-white/40 dark:hover:text-white cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <SlidersHorizontal className="w-4 h-4 text-slate-400 dark:text-white/40 shrink-0 mr-1 hidden sm:block" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 backdrop-blur-md cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-500 scale-105'
                  : 'bg-white/60 dark:bg-white/5 text-slate-700 dark:text-white/70 hover:bg-white/90 dark:hover:bg-white/10 hover:text-indigo-600 dark:hover:text-white border border-slate-200/80 dark:border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white/40 dark:bg-white/[0.02] border border-dashed border-slate-300 dark:border-white/10 backdrop-blur-xl">
            <FolderGit2 className="w-12 h-12 text-slate-400 dark:text-white/30 mx-auto mb-3" />
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-1">
              No projects found
            </h3>
            <p className="text-sm text-slate-500 dark:text-white/50 mb-4">
              Try adjusting your search query or switching the category filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project.id)}
                className="group relative rounded-3xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 hover:border-indigo-400/50 dark:hover:border-indigo-400/40 backdrop-blur-xl shadow-lg dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden"
              >
                {/* Top Image Preview Banner with Glass Gradient */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  {/* Category Pill on Image */}
                  <div className="absolute top-4 left-4 flex items-center gap-1.5">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-black/60 text-indigo-300 border border-indigo-500/30 backdrop-blur-md">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-400 text-slate-950 shadow-xs">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Primary Highlight Stat Overlay */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white text-xs font-semibold">
                      {Object.entries(project.metrics).slice(0, 2).map(([k, v]) => (
                        <span key={k} className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/15 text-[11px]">
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Role Mappings */}
                    <div className="flex flex-wrap gap-1.5 mb-2.5">
                      {project.roles.map((r, idx) => (
                        <span key={idx} className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-500/10 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20">
                          {r}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors leading-snug mb-2.5">
                      {project.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-white/60 leading-relaxed line-clamp-3 mb-4">
                      {project.shortDescription}
                    </p>

                    {/* Highlights bullets preview */}
                    <div className="space-y-1.5 mb-5">
                      {project.highlights.slice(0, 2).map((h, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-500 dark:text-white/60 line-clamp-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400 mt-0.5 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech stack & Deep dive action */}
                  <div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.slice(0, 4).map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white/60 dark:bg-white/[0.04] text-slate-700 dark:text-white/70 border border-slate-200/60 dark:border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="text-[11px] font-medium px-1.5 py-0.5 rounded-md bg-white/40 dark:bg-white/[0.03] text-slate-500 dark:text-white/40 border border-slate-200/40 dark:border-white/5">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-200/60 dark:border-white/10 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300">
                      <span className="flex items-center gap-1.5">
                        Deep Dive Case Study
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <div className="flex items-center gap-2 text-slate-400 dark:text-white/40">
                        {project.links.github && <Github className="w-3.5 h-3.5 hover:text-slate-800 dark:hover:text-white" />}
                        {project.links.demo && <ExternalLink className="w-3.5 h-3.5 hover:text-indigo-500 dark:hover:text-indigo-300" />}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
