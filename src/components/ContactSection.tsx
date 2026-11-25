import { useEffect, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Check, Copy, Mail, MessageSquare, Send, AlertCircle } from 'lucide-react';
import { getMailtoUrl, getWhatsAppUrl, siteConfig } from '../config/site';
import {
  formatContactSummary,
  submitContactRequest,
  type ContactFormPayload,
  type ContactSubmitResult,
} from '../services/contactService';

interface ContactSectionProps {
  preselectedService: string;
}

type FieldErrors = Partial<Record<keyof ContactFormPayload, string>>;

const INITIAL_FORM: ContactFormPayload = {
  name: '',
  company: '',
  email: '',
  phone: '',
  service: '',
  description: '',
};

export function ContactSection({ preselectedService }: ContactSectionProps) {
  const [form, setForm] = useState<ContactFormPayload>(INITIAL_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<ContactSubmitResult | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setForm((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  const validate = (data: ContactFormPayload): FieldErrors => {
    const nextErrors: FieldErrors = {};
    if (!data.name.trim() || data.name.trim().length < 2) {
      nextErrors.name = 'Informe seu nome completo.';
    }
    if (!data.company.trim()) {
      nextErrors.company = 'Informe o nome da empresa.';
    }
    if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      nextErrors.email = 'Informe um e-mail corporativo válido.';
    }
    const phoneDigits = data.phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      nextErrors.phone = 'Informe um telefone ou WhatsApp com DDD.';
    }
    if (!data.service.trim()) {
      nextErrors.service = 'Selecione o serviço de interesse.';
    }
    if (!data.description.trim() || data.description.trim().length < 12) {
      nextErrors.description =
        'Descreva brevemente o cenário atual ou a necessidade técnica (mínimo de 12 caracteres).';
    }
    return nextErrors;
  };

  const handleChange = (field: keyof ContactFormPayload, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (submitResult) {
      setSubmitResult(null);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitResult(null);

    const result = await submitContactRequest({
      name: form.name.trim(),
      company: form.company.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      service: form.service.trim(),
      description: form.description.trim(),
    });

    setSubmitResult(result);
    setIsSubmitting(false);

    if (result.status === 'sent') {
      setForm(INITIAL_FORM);
    }
  };

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(formatContactSummary(form));
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      setCopied(false);
    }
  };

  const directWhatsAppUrl = getWhatsAppUrl();
  const prefilledWhatsAppUrl = getWhatsAppUrl(formatContactSummary(form));
  const prefilledMailtoUrl = getMailtoUrl(
    `Solicitação de avaliação técnica — ${form.company || 'ALTACORP'}`,
    formatContactSummary(form)
  );

  return (
    <section id="contato" className="bg-[#F3F6FA] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Context & Direct Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0868D7] mb-3">
                Contato comercial
              </p>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-[2.25rem] font-semibold tracking-[-0.02em] leading-[1.15] text-[#0B1728]">
                Solicite uma avaliação técnica do seu ambiente.
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#64748B]">
                Compartilhe informações iniciais sobre a sua infraestrutura para direcionarmos o
                atendimento com objetividade técnica.
              </p>
            </div>

            {/* Direct Channels Box */}
            <div className="bg-white border border-[#DCE3EC] rounded-[3px] divide-y divide-[#DCE3EC]">
              <div className="p-6">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#64748B] mb-2">
                  Atendimento via WhatsApp
                </span>
                {directWhatsAppUrl ? (
                  <a
                    href={directWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2.5 bg-[#0B1728] px-5 py-3 text-sm font-medium text-white rounded-[3px] hover:bg-[#0868D7] transition-colors"
                  >
                    <MessageSquare className="h-4 w-4" aria-hidden="true" />
                    <span>
                      Conversar pelo WhatsApp
                      {siteConfig.contacts.whatsappDisplay
                        ? ` (${siteConfig.contacts.whatsappDisplay})`
                        : ''}
                    </span>
                  </a>
                ) : (
                  <div className="border border-dashed border-[#DCE3EC] bg-[#F3F6FA] px-4 py-3 text-xs text-[#64748B] rounded-[3px] flex items-center gap-2.5">
                    <MessageSquare className="h-4 w-4 text-[#0868D7] shrink-0" aria-hidden="true" />
                    <span>
                      Canal WhatsApp comercial configurável em{' '}
                      <code className="text-[#0B1728] font-medium">src/config/site.ts</code>.
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#64748B] mb-2">
                  E-mail comercial
                </span>
                {siteConfig.contacts.email ? (
                  <a
                    href={`mailto:${siteConfig.contacts.email}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#0B1728] hover:text-[#0868D7] transition-colors"
                  >
                    <Mail className="h-4 w-4 text-[#0868D7]" aria-hidden="true" />
                    <span>{siteConfig.contacts.email}</span>
                  </a>
                ) : (
                  <p className="text-xs text-[#64748B] flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[#0868D7] shrink-0" aria-hidden="true" />
                    <span>
                      E-mail comercial configurável em{' '}
                      <code className="text-[#0B1728] font-medium">src/config/site.ts</code>.
                    </span>
                  </p>
                )}
              </div>

              <div className="p-6 bg-[#F3F6FA]/60">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#64748B] mb-1.5">
                  Domínio oficial
                </span>
                <p className="text-sm font-medium text-[#0B1728]">{siteConfig.brand.domain}</p>
              </div>
            </div>
          </div>

          {/* Right Commercial Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="bg-white border border-[#DCE3EC] rounded-[3px] p-6 sm:p-8 lg:p-10 space-y-5"
            >
              <div className="border-b border-[#DCE3EC] pb-4 mb-2 flex items-center justify-between gap-4">
                <h3 className="font-display text-lg font-semibold text-[#0B1728]">
                  Formulário de solicitação
                </h3>
                <span className="text-xs text-[#64748B]">* Campos obrigatórios</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#0B1728] mb-1.5"
                  >
                    Nome *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'error-name' : undefined}
                    placeholder="Seu nome completo"
                    className={`w-full border px-3.5 py-2.5 text-sm text-[#0B1728] bg-white rounded-[3px] placeholder:text-[#64748B]/70 focus:border-[#0868D7] focus:outline-none ${
                      errors.name ? 'border-red-600' : 'border-[#DCE3EC]'
                    }`}
                  />
                  {errors.name && (
                    <p id="error-name" className="mt-1.5 text-xs text-red-700">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-company"
                    className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#0B1728] mb-1.5"
                  >
                    Empresa *
                  </label>
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    required
                    value={form.company}
                    onChange={(e) => handleChange('company', e.target.value)}
                    aria-invalid={Boolean(errors.company)}
                    aria-describedby={errors.company ? 'error-company' : undefined}
                    placeholder="Razão social ou nome fantasia"
                    className={`w-full border px-3.5 py-2.5 text-sm text-[#0B1728] bg-white rounded-[3px] placeholder:text-[#64748B]/70 focus:border-[#0868D7] focus:outline-none ${
                      errors.company ? 'border-red-600' : 'border-[#DCE3EC]'
                    }`}
                  />
                  {errors.company && (
                    <p id="error-company" className="mt-1.5 text-xs text-red-700">
                      {errors.company}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#0B1728] mb-1.5"
                  >
                    E-mail *
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'error-email' : undefined}
                    placeholder="nome@empresa.com.br"
                    className={`w-full border px-3.5 py-2.5 text-sm text-[#0B1728] bg-white rounded-[3px] placeholder:text-[#64748B]/70 focus:border-[#0868D7] focus:outline-none ${
                      errors.email ? 'border-red-600' : 'border-[#DCE3EC]'
                    }`}
                  />
                  {errors.email && (
                    <p id="error-email" className="mt-1.5 text-xs text-red-700">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#0B1728] mb-1.5"
                  >
                    Telefone / WhatsApp *
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    value={form.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? 'error-phone' : undefined}
                    placeholder="(DDD) 00000-0000"
                    className={`w-full border px-3.5 py-2.5 text-sm text-[#0B1728] bg-white rounded-[3px] placeholder:text-[#64748B]/70 focus:border-[#0868D7] focus:outline-none ${
                      errors.phone ? 'border-red-600' : 'border-[#DCE3EC]'
                    }`}
                  />
                  {errors.phone && (
                    <p id="error-phone" className="mt-1.5 text-xs text-red-700">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-service"
                  className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#0B1728] mb-1.5"
                >
                  Serviço de interesse *
                </label>
                <select
                  id="contact-service"
                  name="service"
                  required
                  value={form.service}
                  onChange={(e) => handleChange('service', e.target.value)}
                  aria-invalid={Boolean(errors.service)}
                  aria-describedby={errors.service ? 'error-service' : undefined}
                  className={`w-full border px-3.5 py-2.5 text-sm text-[#0B1728] bg-white rounded-[3px] focus:border-[#0868D7] focus:outline-none ${
                    errors.service ? 'border-red-600' : 'border-[#DCE3EC]'
                  }`}
                >
                  <option value="">Selecione uma frente de atuação</option>
                  {siteConfig.services.map((srv) => (
                    <option key={srv.id} value={srv.title}>
                      {srv.title}
                    </option>
                  ))}
                  <option value="Avaliação geral de infraestrutura">
                    Avaliação geral de infraestrutura
                  </option>
                </select>
                {errors.service && (
                  <p id="error-service" className="mt-1.5 text-xs text-red-700">
                    {errors.service}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-description"
                  className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#0B1728] mb-1.5"
                >
                  Descrição da necessidade *
                </label>
                <textarea
                  id="contact-description"
                  name="description"
                  rows={4}
                  required
                  value={form.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  aria-invalid={Boolean(errors.description)}
                  aria-describedby={errors.description ? 'error-description' : undefined}
                  placeholder="Descreva o cenário atual (quantidade aproximada de usuários, servidores, filiais ou demandas prioritárias)."
                  className={`w-full border px-3.5 py-2.5 text-sm text-[#0B1728] bg-white rounded-[3px] placeholder:text-[#64748B]/70 focus:border-[#0868D7] focus:outline-none resize-y ${
                    errors.description ? 'border-red-600' : 'border-[#DCE3EC]'
                  }`}
                />
                {errors.description && (
                  <p id="error-description" className="mt-1.5 text-xs text-red-700">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Submission Feedback */}
              {submitResult && (
                <div
                  role="status"
                  aria-live="polite"
                  className={`border p-4 rounded-[3px] text-sm ${
                    submitResult.status === 'sent'
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-950'
                      : submitResult.status === 'not_configured'
                        ? 'border-[#0868D7]/35 bg-[#F3F6FA] text-[#0B1728]'
                        : 'border-red-300 bg-red-50 text-red-950'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {submitResult.status === 'sent' ? (
                      <Check className="h-4 w-4 text-emerald-700 mt-0.5 shrink-0" aria-hidden="true" />
                    ) : (
                      <AlertCircle
                        className="h-4 w-4 text-[#0868D7] mt-0.5 shrink-0"
                        aria-hidden="true"
                      />
                    )}
                    <div className="space-y-3 flex-1">
                      <p className="leading-relaxed">{submitResult.message}</p>

                      {submitResult.status !== 'sent' && (
                        <div className="flex flex-wrap gap-2.5 pt-1">
                          {prefilledMailtoUrl && (
                            <a
                              href={prefilledMailtoUrl}
                              className="inline-flex items-center gap-1.5 bg-[#0B1728] px-3.5 py-2 text-xs font-medium text-white rounded-[3px] hover:bg-[#0868D7] transition-colors"
                            >
                              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                              <span>Abrir no aplicativo de e-mail</span>
                            </a>
                          )}
                          {prefilledWhatsAppUrl && (
                            <a
                              href={prefilledWhatsAppUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 bg-[#0868D7] px-3.5 py-2 text-xs font-medium text-white rounded-[3px] hover:bg-[#0657B6] transition-colors"
                            >
                              <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
                              <span>Enviar resumo pelo WhatsApp</span>
                            </a>
                          )}
                          <button
                            type="button"
                            onClick={handleCopySummary}
                            className="inline-flex items-center gap-1.5 border border-[#DCE3EC] bg-white px-3.5 py-2 text-xs font-medium text-[#0B1728] rounded-[3px] hover:border-[#0B1728] transition-colors cursor-pointer"
                          >
                            {copied ? (
                              <>
                                <Check className="h-3.5 w-3.5 text-emerald-700" aria-hidden="true" />
                                <span>Resumo copiado</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                                <span>Copiar resumo da solicitação</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Ao enviar, você concorda com o tratamento das informações conforme nossa{' '}
                  <Link
                    to="/privacidade"
                    className="text-[#0B1728] underline underline-offset-2 hover:text-[#0868D7]"
                  >
                    Política de Privacidade
                  </Link>
                  .
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 bg-[#0868D7] px-6 py-3.5 text-sm font-semibold text-white rounded-[3px] hover:bg-[#0657B6] disabled:opacity-60 transition-colors cursor-pointer shrink-0"
                >
                  <span>{isSubmitting ? 'Enviando...' : 'Enviar solicitação'}</span>
                  <Send className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
