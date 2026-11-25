import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import logoAltacorp from '../assets/images/logo-altacorp.png';
import { siteConfig } from '../config/site';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileOpen(false);
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white transition-colors duration-200 border-b border-[#DCE3EC] ${
        scrolled ? 'shadow-[0_1px_0_0_rgba(11,23,40,0.04)]' : ''
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('inicio');
          }}
          className="flex items-center py-1 shrink-0"
          aria-label="ALTACORP — Página inicial"
        >
          <img
            src={logoAltacorp}
            alt="ALTACORP"
            width={168}
            height={56}
            className="h-9 sm:h-10 w-auto object-contain"
          />
        </a>

        {/* Navegação Desktop */}
        <nav aria-label="Navegação principal" className="hidden lg:flex items-center gap-7">
          {siteConfig.navigation.map((item) => (
            <a
              key={item.sectionId}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.sectionId);
              }}
              className="text-sm font-medium text-[#0B1728]/85 hover:text-[#0868D7] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#0868D7] after:transition-all after:duration-200 hover:after:w-full"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contato"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('contato');
            }}
            className="hidden sm:inline-flex items-center gap-2 bg-[#0B1728] px-4 py-2.5 text-sm font-medium text-white rounded-[3px] hover:bg-[#0868D7] transition-colors duration-200"
          >
            <span>Solicitar avaliação</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex lg:hidden items-center justify-center p-2 text-[#0B1728] border border-[#DCE3EC] rounded-[3px] hover:bg-[#F3F6FA] transition-colors"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {mobileOpen && (
        <div
          id="mobile-navigation"
          className="lg:hidden border-t border-[#DCE3EC] bg-white"
        >
          <nav
            aria-label="Navegação mobile"
            className="mx-auto max-w-7xl px-4 py-4 flex flex-col divide-y divide-[#DCE3EC]"
          >
            {siteConfig.navigation.map((item) => (
              <a
                key={item.sectionId}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.sectionId);
                }}
                className="py-3.5 text-base font-medium text-[#0B1728] hover:text-[#0868D7] transition-colors flex items-center justify-between"
              >
                <span>{item.label}</span>
                <span className="text-xs text-[#64748B] font-mono">→</span>
              </a>
            ))}
            <div className="pt-4 pb-2">
              <a
                href="#contato"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('contato');
                }}
                className="flex w-full items-center justify-center gap-2 bg-[#0868D7] px-5 py-3 text-sm font-semibold text-white rounded-[3px] hover:bg-[#0657B6] transition-colors"
              >
                <span>Solicitar avaliação</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
