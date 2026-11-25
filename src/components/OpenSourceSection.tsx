import { siteConfig } from '../config/site';

export function OpenSourceSection() {
  return (
    <section
      id="solucoes"
      className="relative bg-[#0B1728] text-white border-b border-white/10 py-16 lg:py-24 overflow-hidden"
    >
      <div className="bg-arch-grid-dark absolute inset-0 pointer-events-none" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Narrative Column */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0868D7]">
              Open Source e independência tecnológica
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-[2.35rem] font-semibold tracking-[-0.02em] leading-[1.15] text-white">
              Mais liberdade tecnológica. Mais controle sobre sua infraestrutura.
            </h2>

            <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#DCE3EC]/85 pt-2">
              <p>
                Acreditamos que empresas devem ter liberdade para escolher as tecnologias que melhor
                atendem às suas necessidades.
              </p>
              <p>
                Trabalhamos com soluções open-source e plataformas consolidadas para desenvolver
                ambientes tecnológicos eficientes, flexíveis e economicamente sustentáveis.
              </p>
              <p className="text-white font-medium">
                Nossa abordagem prioriza autonomia, transparência e independência tecnológica.
              </p>
            </div>
          </div>

          {/* Right 2x2 Architectural Benefits Matrix */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-l border-white/15 bg-[#07101D]/70">
              {siteConfig.openSourceBenefits.map((benefit) => (
                <article
                  key={benefit.code}
                  className="p-7 sm:p-8 border-r border-b border-white/15 hover:bg-white/[0.03] transition-colors"
                >
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs font-semibold tracking-[0.14em] text-[#0868D7]">
                      {benefit.code}
                    </span>
                    <span className="h-1.5 w-1.5 bg-[#0868D7]" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white mb-2.5 leading-snug">
                    {benefit.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#DCE3EC]/75">{benefit.detail}</p>
                </article>
              ))}
            </div>

            <p className="mt-4 text-xs text-[#DCE3EC]/65 leading-relaxed">
              Nota técnica: a adoção de software open-source não implica ausência total de custos de
              implantação, suporte especializado, hardware ou eventuais licenças complementares
              quando soluções proprietárias são necessárias ao negócio.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
