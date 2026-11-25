import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { siteConfig } from '../config/site';

export function PrivacyPolicyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-white py-16 lg:py-24 border-b border-[#DCE3EC]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#0868D7] hover:text-[#0657B6] mb-8"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Voltar para a página inicial</span>
        </Link>

        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0868D7] mb-3">
          Documento institucional
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-[#0B1728] mb-8">
          Política de Privacidade — ALTACORP
        </h1>

        <div className="space-y-8 text-sm sm:text-base leading-relaxed text-[#0B1728]/85 border-t border-[#DCE3EC] pt-8">
          <section className="space-y-2.5">
            <h2 className="font-display text-lg font-semibold text-[#0B1728]">
              1. Finalidade da coleta de informações
            </h2>
            <p className="text-[#64748B]">
              As informações fornecidas voluntariamente no formulário de contato do site{' '}
              <strong className="text-[#0B1728]">{siteConfig.brand.domain}</strong> — incluindo
              nome, empresa, e-mail, telefone/WhatsApp, serviço de interesse e descrição da
              necessidade — são utilizadas exclusivamente para análise técnica preliminar e retorno
              comercial solicitado pelo próprio interessado.
            </p>
          </section>

          <section className="space-y-2.5">
            <h2 className="font-display text-lg font-semibold text-[#0B1728]">
              2. Compartilhamento e retenção de dados
            </h2>
            <p className="text-[#64748B]">
              A ALTACORP não comercializa, aluga ou cede dados pessoais a terceiros. As informações
              enviadas são acessadas apenas pelos responsáveis técnicos e comerciais pelo
              atendimento, sendo mantidas pelo tempo necessário ao relacionamento ou cumprimento de
              obrigações legais aplicáveis, em conformidade com a Lei Geral de Proteção de Dados
              (Lei nº 13.709/2018 — LGPD).
            </p>
          </section>

          <section className="space-y-2.5">
            <h2 className="font-display text-lg font-semibold text-[#0B1728]">
              3. Cookies e métricas de navegação
            </h2>
            <p className="text-[#64748B]">
              Este site institucional foi projetado com foco em desempenho, segurança e privacidade,
              não realizando rastreamento publicitário invasivo. Caso ferramentas de análise ou
              integrações de formulário sejam habilitadas no ambiente de produção, esta política
              será atualizada para refletir os respectivos operadores.
            </p>
          </section>

          <section className="space-y-2.5">
            <h2 className="font-display text-lg font-semibold text-[#0B1728]">
              4. Direitos do titular e canal de contato
            </h2>
            <p className="text-[#64748B]">
              O titular dos dados pode solicitar confirmação de tratamento, atualização, correção ou
              exclusão de suas informações a qualquer momento através dos canais oficiais de
              atendimento configurados no portal{' '}
              <strong className="text-[#0B1728]">{siteConfig.brand.domain}</strong>
              {siteConfig.contacts.email ? ` (${siteConfig.contacts.email})` : ''}.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
