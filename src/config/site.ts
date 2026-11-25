/**
 * Configuração centralizada da marca, contatos, navegação e catálogo institucional da ALTACORP.
 * Preencha `contactEmail`, `whatsappNumber` e `contactEndpoint` quando os canais definitivos
 * estiverem ativos (ou via variáveis de ambiente VITE_* no momento do build).
 */

export interface NavItem {
  label: string;
  href: string;
  sectionId: string;
}

export interface ServiceItem {
  id: string;
  code: string;
  title: string;
  summary: string;
  highlights: string[];
  featured?: boolean;
}

export interface TechItem {
  name: string;
  id: string;
  note?: string;
}

export interface TechCategory {
  category: string;
  code: string;
  items: TechItem[];
}

export const siteConfig = {
  brand: {
    name: 'ALTACORP',
    domain: 'altacorp.com.br',
    url: 'https://altacorp.com.br',
    tagline:
      'Infraestrutura de TI, redes, servidores, virtualização, segurança da informação e administração de ambientes tecnológicos corporativos.',
  },
  contacts: {
    /** Ex.: 'contato@altacorp.com.br' — deixe vazio até definir o canal oficial */
    email: (import.meta.env.VITE_CONTACT_EMAIL as string | undefined)?.trim() || '',
    /** Ex.: '5511999999999' (somente dígitos, com DDI e DDD) */
    whatsappNumber: (import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined)?.trim() || '',
    /** Exibição formatada opcional, ex.: '+55 (11) 99999-9999' */
    whatsappDisplay: (import.meta.env.VITE_WHATSAPP_DISPLAY as string | undefined)?.trim() || '',
    whatsappDefaultMessage:
      'Olá, equipe ALTACORP. Gostaria de solicitar uma avaliação técnica para a infraestrutura de TI da nossa empresa.',
    /** Endpoint HTTPS para envio real (Supabase Edge Function, API REST, Formspree, etc.) */
    contactEndpoint: (import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined)?.trim() || '',
    supabaseUrl: (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.trim() || '',
    supabaseAnonKey: (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined)?.trim() || '',
  },
  navigation: [
    { label: 'Início', href: '#inicio', sectionId: 'inicio' },
    { label: 'Serviços', href: '#servicos', sectionId: 'servicos' },
    { label: 'Soluções', href: '#solucoes', sectionId: 'solucoes' },
    { label: 'Tecnologias', href: '#tecnologias', sectionId: 'tecnologias' },
    { label: 'Sobre nós', href: '#sobre', sectionId: 'sobre' },
    { label: 'Contato', href: '#contato', sectionId: 'contato' },
  ] satisfies NavItem[],
  institutionalPillars: [
    {
      code: '01',
      title: 'Confiabilidade operacional.',
      description:
        'Ambientes planejados para manter sistemas, conectividade e rotinas críticas em operação contínua, com previsibilidade e menor exposição a falhas.',
    },
    {
      code: '02',
      title: 'Segurança e proteção.',
      description:
        'Controle rigoroso de perímetro, segmentação de rede, políticas de acesso e rotinas estruturadas de backup para proteger os ativos da empresa.',
    },
    {
      code: '03',
      title: 'Eficiência tecnológica.',
      description:
        'Arquitetura dimensionada à realidade do negócio, combinando plataformas consolidadas e open-source sem excessos ou dependências desnecessárias.',
    },
  ],
  services: [
    {
      id: 'redes',
      code: 'SRV-01',
      title: 'Infraestrutura de Redes',
      summary:
        'Planejamento, implantação e administração de redes corporativas, conectividade, segmentação, VLANs, Wi-Fi empresarial e VPN.',
      highlights: [
        'Arquitetura de switching e roteamento corporativo',
        'Segmentação por VLANs e isolamento de tráfego',
        'Redes sem fio empresariais e interligação via VPN',
      ],
      featured: true,
    },
    {
      id: 'servidores',
      code: 'SRV-02',
      title: 'Servidores e Virtualização',
      summary:
        'Implantação e administração de ambientes Windows Server, Linux, Proxmox VE, máquinas virtuais e serviços corporativos.',
      highlights: [
        'Consolidação de cargas em hipervisores Proxmox VE',
        'Administração de servidores Linux e Windows Server',
        'Organização de serviços de diretório, arquivos e aplicações',
      ],
      featured: true,
    },
    {
      id: 'firewall',
      code: 'SRV-03',
      title: 'Firewall e Segurança',
      summary:
        'Implementação e administração de firewalls, políticas de acesso, VPNs, segmentação de redes, controle de tráfego e proteção da infraestrutura.',
      highlights: [
        'Políticas de acesso e controle granular de tráfego',
        'Túneis VPN seguros para equipes e filiais',
      ],
    },
    {
      id: 'backup',
      code: 'SRV-04',
      title: 'Backup e Recuperação',
      summary:
        'Estratégias de backup, armazenamento, retenção, monitoramento e recuperação de dados.',
      highlights: [
        'Políticas de retenção e cópias externas',
        'Verificação periódica e testes de restauração',
      ],
    },
    {
      id: 'monitoramento',
      code: 'SRV-05',
      title: 'Monitoramento e Disponibilidade',
      summary:
        'Monitoramento de servidores, redes, serviços e recursos de infraestrutura, identificando problemas antes que afetem a operação.',
      highlights: [
        'Coleta contínua de métricas e disponibilidade',
        'Alertas antecipados para atuação preventiva',
      ],
    },
    {
      id: 'administracao',
      code: 'SRV-06',
      title: 'Administração de TI',
      summary:
        'Gestão técnica da infraestrutura, manutenção preventiva, documentação, atualização e acompanhamento dos ambientes tecnológicos.',
      highlights: [
        'Documentação técnica atualizada do ambiente',
        'Rotinas preventivas, atualizações e evolução planejada',
      ],
      featured: true,
    },
  ] satisfies ServiceItem[],
  technologies: [
    {
      category: 'Virtualização',
      code: 'CAT-01',
      items: [{ id: 'proxmox', name: 'Proxmox VE' }],
    },
    {
      category: 'Firewall e Segurança',
      code: 'CAT-02',
      items: [
        { id: 'opnsense', name: 'OPNsense' },
        { id: 'pfsense', name: 'pfSense' },
        { id: 'fortinet', name: 'Fortinet' },
      ],
    },
    {
      category: 'Sistemas operacionais',
      code: 'CAT-03',
      items: [
        { id: 'linux', name: 'Linux' },
        { id: 'windows-server', name: 'Windows Server' },
      ],
    },
    {
      category: 'Redes e conectividade',
      code: 'CAT-04',
      items: [
        { id: 'unifi', name: 'UniFi' },
        { id: 'wireguard', name: 'WireGuard' },
        { id: 'tailscale', name: 'Tailscale' },
      ],
    },
    {
      category: 'Monitoramento',
      code: 'CAT-05',
      items: [{ id: 'zabbix', name: 'Zabbix' }],
    },
    {
      category: 'Backup e armazenamento',
      code: 'CAT-06',
      items: [
        { id: 'qnap', name: 'QNAP' },
        {
          id: 'backup-corp',
          name: 'Soluções de backup e armazenamento corporativo',
          note: 'Arquiteturas dedicadas de retenção e recuperação',
        },
      ],
    },
  ] satisfies TechCategory[],
  openSourceBenefits: [
    {
      code: '01',
      title: 'Menor dependência de licenciamento proprietário.',
      detail:
        'Avaliação racional entre plataformas abertas e proprietárias, reduzindo amarras contratuais onde soluções open-source entregam robustez técnica.',
    },
    {
      code: '02',
      title: 'Flexibilidade na arquitetura tecnológica.',
      detail:
        'Liberdade para compor, integrar e evoluir servidores, firewalls e ferramentas de monitoramento conforme as exigências reais da operação.',
    },
    {
      code: '03',
      title: 'Maior controle sobre os ambientes.',
      detail:
        'Visibilidade transparente sobre configurações, topologia, acessos e dados, sem caixas-pretas operacionais.',
    },
    {
      code: '04',
      title: 'Soluções adaptadas à realidade de cada empresa.',
      detail:
        'Dimensionamento técnico sob medida para pequenas e médias empresas, respeitando orçamento, equipe e criticidade de cada serviço.',
    },
  ],
  methodology: [
    {
      step: '01',
      title: 'Diagnóstico',
      description:
        'Entendimento da infraestrutura atual e identificação de necessidades e oportunidades de melhoria.',
    },
    {
      step: '02',
      title: 'Planejamento',
      description:
        'Definição da arquitetura, tecnologias, prioridades e estratégias de implementação.',
    },
    {
      step: '03',
      title: 'Implementação',
      description:
        'Implantação das soluções, configuração dos serviços e documentação técnica.',
    },
    {
      step: '04',
      title: 'Administração contínua',
      description:
        'Acompanhamento, manutenção, monitoramento e evolução da infraestrutura.',
    },
  ],
  aboutPrinciples: [
    'Conhecimento técnico',
    'Planejamento',
    'Transparência',
    'Segurança',
    'Soluções adequadas à realidade de cada negócio',
  ],
};

export function getWhatsAppUrl(customText?: string): string | null {
  const digits = siteConfig.contacts.whatsappNumber.replace(/\D/g, '');
  if (!digits) return null;
  const text = encodeURIComponent(customText || siteConfig.contacts.whatsappDefaultMessage);
  return `https://wa.me/${digits}?text=${text}`;
}

export function getMailtoUrl(subject?: string, body?: string): string | null {
  if (!siteConfig.contacts.email) return null;
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const query = params.toString();
  return `mailto:${siteConfig.contacts.email}${query ? `?${query}` : ''}`;
}
