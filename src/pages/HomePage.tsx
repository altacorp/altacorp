import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { InstitutionalIntro } from '../components/InstitutionalIntro';
import { ServicesSection } from '../components/ServicesSection';
import { TechnologiesSection } from '../components/TechnologiesSection';
import { OpenSourceSection } from '../components/OpenSourceSection';
import { MethodologySection } from '../components/MethodologySection';
import { AboutSection } from '../components/AboutSection';
import { CommercialCtaSection } from '../components/CommercialCtaSection';
import { ContactSection } from '../components/ContactSection';

export function HomePage() {
  const [selectedService, setSelectedService] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 60);
      }
    }
  }, [location.hash]);

  return (
    <main>
      <Hero />
      <InstitutionalIntro />
      <ServicesSection onSelectService={setSelectedService} />
      <TechnologiesSection />
      <OpenSourceSection />
      <MethodologySection />
      <AboutSection />
      <CommercialCtaSection />
      <ContactSection preselectedService={selectedService} />
    </main>
  );
}
