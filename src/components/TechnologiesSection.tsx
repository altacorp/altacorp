import { siteConfig } from '../config/site';
import { TechLogo } from './TechLogo';

export function TechnologiesSection() {
  return (
    <section id="tecnologias" className="bg-white border-b border-[#DCE3EC] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-[#DCE3EC]">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0868D7] mb-3">
              Tecnologias e plataformas
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-[2.35rem] font-semibold tracking-[-0.02em] leading-[1.15] text-[#0B1728]">
              Stack técnico consolidado em ambientes corporativos.
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-[#64748B] max-w-md">
            Selecionamos plataformas maduras e reconhecidas pela estabilidade em produção, conforme
            os requisitos de cada projeto.
          </p>
        </div>

        {/* Categorized Technical Matrix */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#DCE3EC]">
          {siteConfig.technologies.map((group) => (
            <article
              key={group.code}
              className="p-7 sm:p-8 border-r border-b border-[#DCE3EC] bg-white flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 pb-4 mb-5 border-b border-[#DCE3EC]">
                  <h3 className="font-display text-base font-semibold text-[#0B1728]">
                    {group.category}
                  </h3>
                  <span className="text-[11px] font-semibold tracking-[0.14em] text-[#64748B]">
                    {group.code}
                  </span>
                </div>

                <ul className="space-y-4">
                  {group.items.map((tech) => (
                    <li
                      key={tech.id}
                      className="flex items-center gap-3.5 p-2.5 -mx-2.5 rounded-[3px] hover:bg-[#F3F6FA] transition-colors"
                    >
                      <div className="flex h-10 w-10 items-center justify-center border border-[#DCE3EC] bg-[#F3F6FA] rounded-[3px] shrink-0">
                        <TechLogo id={tech.id} name={tech.name} />
                      </div>
                      <div className="min-w-0">
                        <span className="block text-sm font-medium text-[#0B1728] leading-snug">
                          {tech.name}
                        </span>
                        {tech.note && (
                          <span className="block text-xs text-[#64748B] mt-0.5">{tech.note}</span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        {/* Clear non-affiliation disclaimer */}
        <p className="mt-6 text-xs text-[#64748B] leading-relaxed">
          As marcas e logotipos exibidos pertencem aos seus respectivos proprietários e ilustram
          tecnologias com as quais a ALTACORP opera tecnicamente na implantação e administração de
          ambientes, sem implicar vínculo comercial, representação oficial ou parceria certificada.
        </p>
      </div>
    </section>
  );
}
