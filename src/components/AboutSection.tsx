import infraOperations from '../assets/images/infra-operations.jpg';
import { siteConfig } from '../config/site';

export function AboutSection() {
  return (
    <section id="sobre" className="bg-white border-b border-[#DCE3EC] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Editorial Image Frame */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="border border-[#DCE3EC] bg-[#F3F6FA] p-3 rounded-[3px]">
              <div className="overflow-hidden aspect-[4/3] bg-[#0B1728]">
                <img
                  src={infraOperations}
                  alt="Estação de engenharia e monitoramento técnico com vista para sala de servidores corporativa"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="pt-3 px-1 flex items-center justify-between text-[11px] uppercase tracking-[0.12em] text-[#64748B]">
                <span>Operação &amp; Engenharia</span>
                <span>Pequenas e Médias Empresas</span>
              </div>
            </div>
          </div>

          {/* Right Narrative Column */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0868D7] mb-3">
              Sobre a ALTACORP
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-[2.25rem] font-semibold tracking-[-0.02em] leading-[1.16] text-[#0B1728]">
              Infraestrutura bem administrada começa com decisões técnicas bem fundamentadas.
            </h2>

            <div className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-[#64748B]">
              <p>
                A ALTACORP é especializada em infraestrutura de TI para pequenas e médias empresas
                que precisam de ambientes organizados, previsíveis e seguros para sustentar suas
                operações diárias.
              </p>
              <p>
                Atuamos com critério técnico na escolha de arquiteturas, clareza na documentação e
                acompanhamento responsável, assumindo a engenharia e a manutenção contínua do
                ambiente sem soluções improvisadas.
              </p>
            </div>

            {/* Five Core Principles */}
            <div className="mt-8 pt-6 border-t border-[#DCE3EC]">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0B1728] mb-4">
                Diretrizes de atuação
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {siteConfig.aboutPrinciples.map((principle) => (
                  <li
                    key={principle}
                    className="flex items-start gap-2.5 text-sm font-medium text-[#0B1728]"
                  >
                    <span className="mt-2 h-1.5 w-1.5 bg-[#0868D7] shrink-0" aria-hidden="true" />
                    <span>{principle}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
