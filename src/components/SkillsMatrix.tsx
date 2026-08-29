import React, { useState, useMemo } from 'react';
import { portfolioData } from '../data/portfolioData';
import { 
  Wrench, 
  Search, 
  Code2, 
  Brain, 
  Database, 
  Server, 
  BarChart3, 
  Cloud, 
  Sparkles, 
  Check,
  Zap
} from 'lucide-react';

const categoryIconMap: Record<string, React.FC<{ className?: string }>> = {
  Code2: Code2,
  Brain: Brain,
  Database: Database,
  Server: Server,
  BarChart3: BarChart3,
  Cloud: Cloud,
};

export const SkillsMatrix: React.FC = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('languages');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const currentCategory = useMemo(() => {
    return portfolioData.skillsCategories.find(c => c.id === selectedCategoryId) || portfolioData.skillsCategories[0];
  }, [selectedCategoryId]);

  // When searching, search across all categories
  const allFilteredSkills = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return null;

    const results: Array<{
      categoryTitle: string;
      skill: { name: string; level: string; tags: string[] };
    }> = [];

    portfolioData.skillsCategories.forEach((cat) => {
      cat.skills.forEach((skill) => {
        if (
          skill.name.toLowerCase().includes(query) ||
          skill.level.toLowerCase().includes(query) ||
          skill.tags.some(t => t.toLowerCase().includes(query))
        ) {
          results.push({ categoryTitle: cat.title, skill });
        }
      });
    });

    return results;
  }, [searchQuery]);

  return (
    <section id="skills" className="py-20 lg:py-28 scroll-mt-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-md">
              <Wrench className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
              <span>Technical Competencies & Tooling</span>
            </div>
            <h2 className="font-display font-light text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
              Technical Stack & <span className="font-extrabold text-slate-900 dark:text-white">Domain Proficiency</span>
            </h2>
            <p className="text-slate-600 dark:text-white/60 mt-2 text-base">
              Systematically organized by domain with production libraries and ecosystem frameworks.
            </p>
          </div>

          {/* Quick Skill Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search any skill, e.g. PyTorch, DAX, Kafka..."
              className="w-full pl-10 pr-8 py-2.5 text-xs rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500 backdrop-blur-md shadow-xs transition-all"
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

        {/* Global Search Results View (if user is searching) */}
        {allFilteredSkills !== null ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-slate-600 dark:text-white/70">
                Found <strong className="text-indigo-600 dark:text-indigo-400">{allFilteredSkills.length}</strong> matching skill(s) for "{searchQuery}":
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-slate-500 dark:text-white/50 hover:text-indigo-600 dark:hover:text-white underline cursor-pointer"
              >
                Clear Search
              </button>
            </div>

            {allFilteredSkills.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-white/40 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/10 backdrop-blur-xl">
                <Search className="w-8 h-8 text-slate-400 dark:text-white/30 mx-auto mb-2" />
                <p className="text-sm text-slate-600 dark:text-white/60">
                  No technical skills matched "{searchQuery}".
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {allFilteredSkills.map(({ categoryTitle, skill }, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                        {categoryTitle}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        skill.level === 'Expert'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                          : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20'
                      }`}>
                        {skill.level}
                      </span>
                    </div>
                    <h4 className="font-display font-bold text-base text-slate-900 dark:text-white mb-2">
                      {skill.name}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {skill.tags.map((tag, tidx) => (
                        <span
                          key={tidx}
                          className="text-[11px] px-2 py-0.5 rounded-md bg-white/60 dark:bg-white/[0.04] text-slate-600 dark:text-white/70 border border-slate-200/60 dark:border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Standard Category Explorer */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Category Navigation Pills (Left side on desktop) */}
            <div className="lg:col-span-4 flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {portfolioData.skillsCategories.map((cat) => {
                const IconComponent = categoryIconMap[cat.icon] || Wrench;
                const isSelected = selectedCategoryId === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategoryId(cat.id)}
                    className={`w-full text-left p-4 rounded-2xl transition-all duration-200 flex items-center justify-between shrink-0 lg:shrink backdrop-blur-xl cursor-pointer ${
                      isSelected
                        ? 'bg-white/90 dark:bg-white/15 border border-indigo-500/60 shadow-xl shadow-indigo-500/10'
                        : 'bg-white/60 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-white/70'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-200 ${
                        isSelected 
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' 
                          : 'bg-white/80 dark:bg-white/10 text-slate-500 dark:text-white/60 border border-slate-200/60 dark:border-white/10'
                      }`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                          {cat.title}
                        </h4>
                        <span className="text-xs text-slate-500 dark:text-white/40">
                          {cat.skills.length} core tools
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Category Skill Details Card (Right side) */}
            <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 backdrop-blur-2xl shadow-xl dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
              <div className="mb-6 pb-6 border-b border-slate-200/60 dark:border-white/10">
                <h3 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white mb-1.5">
                  {currentCategory.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-white/60">
                  {currentCategory.description}
                </p>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentCategory.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white/60 dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/10 hover:border-indigo-400/40 backdrop-blur-md transition-all duration-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                        {skill.name}
                      </h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        skill.level === 'Expert'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                          : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20'
                      }`}>
                        {skill.level}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {skill.tags.map((tag, tidx) => (
                        <span
                          key={tidx}
                          className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white/80 dark:bg-white/[0.05] text-slate-600 dark:text-white/70 border border-slate-200/60 dark:border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
