import { siteConfig } from '../config/site';

export function MethodologySection() {
  return (
    <section className="bg-[#F3F6FA] border-b border-[#DCE3EC] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12 lg:mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0868D7] mb-3">
            Metodologia de trabalho
          </p>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-[2.35rem] font-semibold tracking-[-0.02em] leading-[1.15] text-[#0B1728]">
            Um processo estruturado da análise inicial à administração contínua.
          </h2>
        </div>

        {/* Connected Architectural Process Grid */}
        <div className="relative">
          {/* Desktop horizontal connector line */}
          <div
            className="hidden lg:block absolute top-6 left-0 right-0 h-px bg-[#DCE3EC]"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {siteConfig.methodology.map((phase) => (
              <article key={phase.step} className="relative flex flex-col">
                <div className="flex items-center gap-3 mb-5">
                  <span className="relative z-10 inline-flex h-12 w-12 items-center justify-center bg-[#0B1728] text-white font-display text-sm font-semibold tracking-wider rounded-[3px] border border-[#0B1728]">
                    {phase.step}
                  </span>
                  <div className="h-px flex-1 bg-[#DCE3EC] lg:hidden" aria-hidden="true" />
                </div>

                <div className="bg-white border border-[#DCE3EC] p-6 rounded-[3px] flex-1">
                  <h3 className="font-display text-lg font-semibold text-[#0B1728] mb-2.5">
                    {phase.step} — {phase.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#64748B]">{phase.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
