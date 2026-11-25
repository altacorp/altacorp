import { ArrowRight } from 'lucide-react';

export function CommercialCtaSection() {
  const scrollToContact = () => {
    const el = document.getElementById('contato');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative bg-[#0B1728] text-white py-16 lg:py-20 overflow-hidden border-b border-white/10">
      <div className="bg-arch-grid-dark absolute inset-0 pointer-events-none" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0868D7] mb-3">
              Avaliação técnica
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-[2.25rem] font-semibold tracking-[-0.02em] leading-[1.15] text-white max-w-3xl">
              Sua infraestrutura está preparada para acompanhar o crescimento da sua empresa?
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#DCE3EC]/85 max-w-2xl">
              Converse com a ALTACORP e descubra como podemos melhorar a segurança, a estabilidade e
              a eficiência do seu ambiente tecnológico.
            </p>
          </div>

          <div className="lg:col-span-4 lg:flex lg:justify-end">
            <button
              type="button"
              onClick={scrollToContact}
              className="inline-flex items-center justify-center gap-2.5 bg-[#0868D7] px-7 py-4 text-sm font-semibold text-white rounded-[3px] hover:bg-[#0657B6] transition-colors duration-200 cursor-pointer w-full sm:w-auto"
            >
              <span>Solicitar avaliação técnica</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
