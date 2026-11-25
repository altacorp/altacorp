import { siteConfig } from '../config/site';

export interface ContactFormPayload {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  description: string;
}

export interface ContactSubmitResult {
  status: 'sent' | 'not_configured' | 'error';
  message: string;
}

export function formatContactSummary(payload: ContactFormPayload): string {
  return [
    'Solicitação de Avaliação Técnica — ALTACORP',
    `Nome: ${payload.name}`,
    `Empresa: ${payload.company}`,
    `E-mail: ${payload.email}`,
    `Telefone/WhatsApp: ${payload.phone}`,
    `Serviço de interesse: ${payload.service}`,
    '',
    'Descrição da necessidade:',
    payload.description,
  ].join('\n');
}

/**
 * Envia o formulário comercial apenas quando um endpoint real está configurado
 * (VITE_CONTACT_ENDPOINT ou Supabase Edge Function). Caso contrário, retorna
 * `not_configured` para manter transparência total com o usuário.
 */
export async function submitContactRequest(
  payload: ContactFormPayload
): Promise<ContactSubmitResult> {
  const { contactEndpoint, supabaseUrl, supabaseAnonKey } = siteConfig.contacts;

  const targetUrl =
    contactEndpoint ||
    (supabaseUrl ? `${supabaseUrl.replace(/\/$/, '')}/functions/v1/contact` : '');

  if (!targetUrl) {
    return {
      status: 'not_configured',
      message:
        'O envio automático do formulário ainda não possui um endpoint de integração configurado neste ambiente. Utilize um dos canais diretos abaixo ou copie o resumo técnico preenchido.',
    };
  }

  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    if (!contactEndpoint && supabaseAnonKey) {
      headers.apikey = supabaseAnonKey;
      headers.Authorization = `Bearer ${supabaseAnonKey}`;
    }

    const response = await fetch(targetUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        ...payload,
        source: siteConfig.brand.domain,
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      return {
        status: 'error',
        message:
          'Não foi possível concluir o envio automático neste momento. Tente novamente ou utilize o atendimento direto.',
      };
    }

    return {
      status: 'sent',
      message:
        'Solicitação registrada com sucesso. Nossa equipe analisará as informações enviadas para retorno técnico.',
    };
  } catch {
    return {
      status: 'error',
      message:
        'Falha de comunicação ao enviar os dados. Verifique sua conexão ou utilize o canal direto abaixo.',
    };
  }
}
