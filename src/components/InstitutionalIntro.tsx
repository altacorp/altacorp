import { siteConfig } from '../config/site';

export function InstitutionalIntro() {
  return (
    <section className="bg-[#F3F6FA] border-b border-[#DCE3EC] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0868D7] mb-3">
              Posicionamento institucional
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-[2.25rem] font-semibold tracking-[-0.02em] leading-[1.15] text-[#0B1728]">
              Tecnologia que sustenta a operação do seu negócio.
            </h2>
          </div>

          <div className="lg:col-span-7 lg:pl-6 space-y-4 text-base leading-relaxed text-[#0B1728]/85">
            <p>
              A ALTACORP atua na administração e evolução de ambientes tecnológicos corporativos,
              oferecendo soluções de infraestrutura, redes, servidores e segurança da informação.
            </p>
            <p className="text-[#64748B]">
              Nosso trabalho é garantir que a tecnologia funcione de maneira eficiente, segura e
              alinhada às necessidades de cada empresa.
            </p>
          </div>
        </div>

        {/* Three Editorial Pillars */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 border-t border-l border-[#DCE3EC] bg-white">
          {siteConfig.institutionalPillars.map((pillar) => (
            <article
              key={pillar.code}
              className="p-7 sm:p-8 border-r border-b border-[#DCE3EC] flex flex-col justify-between group hover:bg-[#F3F6FA]/50 transition-colors duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-semibold tracking-[0.14em] text-[#0868D7]">
                    PILAR {pillar.code}
                  </span>
                  <span className="h-[2px] w-8 bg-[#DCE3EC] group-hover:bg-[#0868D7] transition-colors" />
                </div>
                <h3 className="font-display text-xl font-semibold text-[#0B1728] mb-3">
                  {pillar.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#64748B]">{pillar.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
