import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoAltacorp from '../assets/images/logo-altacorp.png';
import { getWhatsAppUrl, siteConfig } from '../config/site';

export function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const whatsappUrl = getWhatsAppUrl();
  const currentYear = new Date().getFullYear();

  const handleNavClick = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="bg-[#0B1728] text-white border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column — Official logo preserved on crisp white brand plate */}
          <div className="lg:col-span-4 space-y-5">
            <a
              href="#inicio"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('inicio');
              }}
              className="inline-flex items-center bg-white px-4 py-2.5 rounded-[3px]"
              aria-label="ALTACORP — Voltar ao início"
            >
              <img
                src={logoAltacorp}
                alt="ALTACORP"
                width={156}
                height={52}
                className="h-8 w-auto object-contain"
              />
            </a>

            <p className="text-sm leading-relaxed text-[#DCE3EC]/75 max-w-sm">
              {siteConfig.brand.tagline}
            </p>

            <p className="text-xs font-medium tracking-wide text-[#DCE3EC]/60">
              {siteConfig.brand.domain}
            </p>
          </div>

          {/* Navigation Column */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-white mb-4">
              Navegação
            </h3>
            <ul className="space-y-2.5 text-sm text-[#DCE3EC]/75">
              {siteConfig.navigation.map((item) => (
                <li key={item.sectionId}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.sectionId);
                    }}
                    className="hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-white mb-4">
              Principais serviços
            </h3>
            <ul className="space-y-2.5 text-sm text-[#DCE3EC]/75">
              {siteConfig.services.map((srv) => (
                <li key={srv.id}>
                  <a
                    href="#servicos"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('servicos');
                    }}
                    className="hover:text-white transition-colors"
                  >
                    {srv.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Legal Column */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-white mb-4">
              Canais comerciais
            </h3>
            <ul className="space-y-3 text-sm text-[#DCE3EC]/75">
              <li>
                <span className="block text-[11px] uppercase tracking-[0.12em] text-[#DCE3EC]/50 mb-0.5">
                  E-mail comercial
                </span>
                {siteConfig.contacts.email ? (
                  <a
                    href={`mailto:${siteConfig.contacts.email}`}
                    className="text-white hover:text-[#60A5FA] transition-colors"
                  >
                    {siteConfig.contacts.email}
                  </a>
                ) : (
                  <span className="text-xs text-[#DCE3EC]/60">
                    Configurável em src/config/site.ts
                  </span>
                )}
              </li>

              <li>
                <span className="block text-[11px] uppercase tracking-[0.12em] text-[#DCE3EC]/50 mb-0.5">
                  WhatsApp
                </span>
                {whatsappUrl ? (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-[#60A5FA] transition-colors"
                  >
                    {siteConfig.contacts.whatsappDisplay || 'Iniciar atendimento via WhatsApp'}
                  </a>
                ) : (
                  <span className="text-xs text-[#DCE3EC]/60">
                    Configurável em src/config/site.ts
                  </span>
                )}
              </li>

              <li className="pt-2">
                <Link
                  to="/privacidade"
                  className="text-sm text-[#DCE3EC]/85 underline underline-offset-4 hover:text-white transition-colors"
                >
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#DCE3EC]/60">
          <p>
            © {currentYear} {siteConfig.brand.name}. Todos os direitos reservados.
          </p>
          <p>Infraestrutura de TI, Redes, Servidores e Segurança da Informação</p>
        </div>
      </div>
    </footer>
  );
}
