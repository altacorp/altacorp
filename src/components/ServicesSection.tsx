import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../config/site';

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

export function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const [redes, servidores, firewall, backup, monitoramento, administracao] = siteConfig.services;

  const handleRequestService = (serviceTitle: string) => {
    onSelectService(serviceTitle);
    const el = document.getElementById('contato');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="servicos" className="bg-white border-b border-[#DCE3EC] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-[#DCE3EC]">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0868D7] mb-3">
              Serviços especializados
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-[2.4rem] font-semibold tracking-[-0.02em] leading-[1.15] text-[#0B1728]">
              Engenharia aplicada à continuidade da infraestrutura corporativa.
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-[#64748B] max-w-md">
            Atuação técnica completa desde o desenho da topologia até a administração preventiva e
            documentação do ambiente.
          </p>
        </div>

        {/* Editorial Asymmetric Grid (Non-uniform weights and dimensions) */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* 1. Infraestrutura de Redes (Large dark navy anchor block - 7 cols) */}
          <article className="lg:col-span-7 bg-[#0B1728] text-white p-8 sm:p-10 rounded-[3px] relative overflow-hidden flex flex-col justify-between border border-[#0B1728]">
            <div
              className="bg-arch-grid-dark absolute inset-0 pointer-events-none opacity-60"
              aria-hidden="true"
            />
            <div className="relative">
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="text-xs font-semibold tracking-[0.14em] text-[#0868D7]">
                  {redes.code}
                </span>
                <span className="text-[11px] uppercase tracking-[0.12em] text-white/60 border border-white/15 px-2.5 py-1">
                  Conectividade &amp; Topologia
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-[1.75rem] font-semibold tracking-[-0.015em] text-white mb-4">
                {redes.title}
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-[#DCE3EC]/85 max-w-xl">
                {redes.summary}
              </p>

              <ul className="mt-6 space-y-2.5 border-t border-white/15 pt-5">
                {redes.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[#DCE3EC]">
                    <span className="mt-2 h-1.5 w-1.5 bg-[#0868D7] shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mt-8 pt-5 border-t border-white/15 flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleRequestService(redes.title)}
                className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-[#60A5FA] transition-colors cursor-pointer"
              >
                <span>Solicitar avaliação em {redes.title}</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </article>

          {/* 2. Servidores e Virtualização (Light architectural block - 5 cols) */}
          <article className="lg:col-span-5 bg-[#F3F6FA] p-8 sm:p-10 rounded-[3px] border border-[#DCE3EC] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="text-xs font-semibold tracking-[0.14em] text-[#0868D7]">
                  {servidores.code}
                </span>
                <span className="text-[11px] uppercase tracking-[0.12em] text-[#64748B]">
                  Compute &amp; Hypervisor
                </span>
              </div>
              <h3 className="font-display text-2xl font-semibold tracking-[-0.015em] text-[#0B1728] mb-4">
                {servidores.title}
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-[#64748B]">
                {servidores.summary}
              </p>

              <ul className="mt-6 space-y-2.5 border-t border-[#DCE3EC] pt-5">
                {servidores.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[#0B1728]/85">
                    <span className="mt-2 h-1.5 w-1.5 bg-[#0868D7] shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-5 border-t border-[#DCE3EC]">
              <button
                type="button"
                onClick={() => handleRequestService(servidores.title)}
                className="inline-flex items-center gap-2 text-sm font-medium text-[#0B1728] hover:text-[#0868D7] transition-colors cursor-pointer"
              >
                <span>Avaliar ambiente de servidores</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </article>

          {/* 3, 4, 5: Firewall, Backup, Monitoramento (Asymmetric 5 / 3 / 4 column split on desktop) */}
          <article className="lg:col-span-5 bg-white p-7 sm:p-8 rounded-[3px] border border-[#DCE3EC] hover:border-[#0B1728] transition-colors flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold tracking-[0.14em] text-[#0868D7]">
                  {firewall.code}
                </span>
                <span className="h-[2px] w-10 bg-[#0868D7]" aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl font-semibold text-[#0B1728] mb-3">
                {firewall.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#64748B]">{firewall.summary}</p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#DCE3EC]">
              <button
                type="button"
                onClick={() => handleRequestService(firewall.title)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#0B1728] hover:text-[#0868D7] transition-colors cursor-pointer"
              >
                <span>Consultar escopo</span>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </article>

          <article className="lg:col-span-3 bg-white p-7 sm:p-8 rounded-[3px] border border-[#DCE3EC] hover:border-[#0B1728] transition-colors flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold tracking-[0.14em] text-[#0868D7]">
                  {backup.code}
                </span>
              </div>
              <h3 className="font-display text-xl font-semibold text-[#0B1728] mb-3">
                {backup.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#64748B]">{backup.summary}</p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#DCE3EC]">
              <button
                type="button"
                onClick={() => handleRequestService(backup.title)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#0B1728] hover:text-[#0868D7] transition-colors cursor-pointer"
              >
                <span>Consultar escopo</span>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </article>

          <article className="lg:col-span-4 bg-white p-7 sm:p-8 rounded-[3px] border border-[#DCE3EC] hover:border-[#0B1728] transition-colors flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold tracking-[0.14em] text-[#0868D7]">
                  {monitoramento.code}
                </span>
              </div>
              <h3 className="font-display text-xl font-semibold text-[#0B1728] mb-3">
                {monitoramento.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#64748B]">{monitoramento.summary}</p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#DCE3EC]">
              <button
                type="button"
                onClick={() => handleRequestService(monitoramento.title)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#0B1728] hover:text-[#0868D7] transition-colors cursor-pointer"
              >
                <span>Consultar escopo</span>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </article>

          {/* 6. Administração de TI (Full-width horizontal architectural anchor) */}
          <article className="lg:col-span-12 bg-[#F3F6FA] border border-[#DCE3EC] rounded-[3px] p-7 sm:p-9">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-semibold tracking-[0.14em] text-[#0868D7]">
                    {administracao.code}
                  </span>
                  <span className="text-xs text-[#64748B]">·</span>
                  <span className="text-xs uppercase tracking-[0.12em] text-[#64748B]">
                    Gestão Contínua
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#0B1728] mb-2">
                  {administracao.title}
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-[#64748B]">
                  {administracao.summary}
                </p>
              </div>
              <div className="lg:col-span-5 lg:border-l lg:border-[#DCE3EC] lg:pl-8 flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start sm:items-center lg:items-start xl:items-center justify-between gap-4">
                <ul className="space-y-1.5 text-sm text-[#0B1728]">
                  {administracao.highlights.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 bg-[#0868D7]" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => handleRequestService(administracao.title)}
                  className="shrink-0 inline-flex items-center gap-2 bg-[#0B1728] px-5 py-3 text-sm font-medium text-white rounded-[3px] hover:bg-[#0868D7] transition-colors cursor-pointer"
                >
                  <span>Falar sobre gestão</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
