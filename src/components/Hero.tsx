import { ArrowRight, ArrowDownRight } from 'lucide-react';
import heroDatacenter from '../assets/images/hero-datacenter.jpg';
import networkRack from '../assets/images/network-rack.jpg';

export function Hero() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-white border-b border-[#DCE3EC]"
    >
      {/* Subtle architectural background grid */}
      <div className="bg-arch-grid-light absolute inset-0 pointer-events-none opacity-65" aria-hidden="true" />

      {/* Top technical coordinate bar */}
      <div className="relative border-b border-[#DCE3EC] bg-[#F3F6FA]/85">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-2 text-[11px] uppercase tracking-[0.14em] text-[#64748B] font-medium">
          <div className="flex items-center gap-3">
            <span className="inline-block h-2 w-2 bg-[#0868D7]" aria-hidden="true" />
            <span>Engenharia e Administração de Infraestrutura de TI</span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <span>Redes</span>
            <span aria-hidden="true">·</span>
            <span>Servidores</span>
            <span aria-hidden="true">·</span>
            <span>Virtualização</span>
            <span aria-hidden="true">·</span>
            <span>Segurança</span>
          </div>
        </div>
      </div>

      {/* Editorial Asymmetric Hero Grid */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-14 lg:pt-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-stretch">
          {/* Left Editorial Column */}
          <div className="lg:col-span-7 lg:pr-12 flex flex-col justify-between animate-reveal">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0868D7] mb-5">
                Infraestrutura corporativa para PMEs
              </p>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-[3.25rem] font-semibold tracking-[-0.025em] leading-[1.08] text-[#0B1728] max-w-2xl">
                Infraestrutura de TI sob controle. Sua empresa preparada para crescer.
              </h1>

              <p className="mt-6 text-base sm:text-lg leading-relaxed text-[#64748B] max-w-xl">
                Projetamos, implementamos e administramos ambientes de TI para empresas que precisam
                de estabilidade, segurança e continuidade operacional.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <a
                  href="#contato"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('contato');
                  }}
                  className="inline-flex items-center justify-center gap-2.5 bg-[#0868D7] px-6 py-3.5 text-sm font-semibold text-white rounded-[3px] hover:bg-[#0657B6] transition-colors duration-200"
                >
                  <span>Solicitar uma avaliação</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>

                <a
                  href="#servicos"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('servicos');
                  }}
                  className="inline-flex items-center justify-center gap-2 border border-[#DCE3EC] bg-white px-6 py-3.5 text-sm font-medium text-[#0B1728] rounded-[3px] hover:border-[#0B1728] hover:bg-[#F3F6FA] transition-colors duration-200"
                >
                  <span>Conhecer nossos serviços</span>
                  <ArrowDownRight className="h-4 w-4 text-[#0868D7]" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Bottom Architectural Domain Strip */}
            <div className="mt-12 pt-6 border-t border-[#DCE3EC] grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { code: '01', label: 'Redes & Conectividade' },
                { code: '02', label: 'Servidores & Virtualização' },
                { code: '03', label: 'Firewall & Segurança' },
                { code: '04', label: 'Backup & Monitoramento' },
              ].map((axis) => (
                <div key={axis.code} className="space-y-1">
                  <span className="block text-[11px] font-semibold tracking-wider text-[#0868D7]">
                    {axis.code}
                  </span>
                  <span className="block text-xs font-medium text-[#0B1728] leading-snug">
                    {axis.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Architectural Visual Frame */}
          <div className="lg:col-span-5 relative flex flex-col">
            <div className="relative flex-1 bg-[#0B1728] p-3 sm:p-4 border border-[#0B1728] rounded-[3px]">
              {/* Subtle network vector topology corner accent */}
              <svg
                className="absolute top-0 right-0 w-36 h-36 text-[#0868D7]/30 pointer-events-none"
                viewBox="0 0 144 144"
                fill="none"
                aria-hidden="true"
              >
                <path d="M144 24H96L72 48V96" stroke="currentColor" strokeWidth="1" />
                <circle cx="96" cy="24" r="2.5" fill="currentColor" />
                <circle cx="72" cy="48" r="2.5" fill="currentColor" />
                <circle cx="72" cy="96" r="2.5" fill="currentColor" />
              </svg>

              <div className="relative overflow-hidden aspect-[16/10] lg:aspect-auto lg:h-[360px] bg-[#07101D]">
                <img
                  src={heroDatacenter}
                  alt="Corredor de servidores corporativos em ambiente de data center estruturado"
                  className="h-full w-full object-cover object-center opacity-92"
                  fetchPriority="high"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#0B1728]/80 via-[#0B1728]/15 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2 text-white">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-white/70">
                      Arquitetura Corporativa
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-white">
                      Ambientes planejados, documentados e monitorados
                    </p>
                  </div>
                </div>
              </div>

              {/* Lower inset detail bar with secondary cabling photograph */}
              <div className="mt-3 grid grid-cols-12 gap-3 items-stretch">
                <div className="col-span-5 overflow-hidden bg-[#07101D] border border-white/10">
                  <img
                    src={networkRack}
                    alt="Cabeamento estruturado e switches gerenciáveis em rack de rede corporativa"
                    className="h-24 w-full object-cover"
                    loading="eager"
                  />
                </div>
                <div className="col-span-7 border border-white/15 bg-white/[0.03] p-3 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.14em] text-[#DCE3EC]/70">
                    <span>Foco Operacional</span>
                    <span className="text-[#0868D7] font-semibold">PMEs</span>
                  </div>
                  <p className="text-xs text-[#DCE3EC] leading-relaxed mt-1.5">
                    Independência tecnológica com plataformas consolidadas e open-source.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
