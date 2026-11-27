/**
 * Configuração centralizada do site institucional ALTACORP.
 * Altere os valores abaixo para publicar os canais comerciais reais
 * e habilitar o envio do formulário via serviço externo (ex.: Formspree).
 */
window.ALTACORP_CONFIG = {
  brand: {
    name: 'ALTACORP',
    domain: 'altacorp.com.br',
    url: 'https://altacorp.com.br',
  },
  contacts: {
    // Ex.: 'contato@altacorp.com.br' — mantenha vazio até definir o e-mail oficial
    email: '',
    // Somente dígitos com DDI + DDD (ex.: '5511999999999')
    whatsappNumber: '5511983641085',
    // Texto de exibição opcional (ex.: '+55 (11) 99999-9999')
    whatsappDisplay: '(11) 98364-1085',
    whatsappDefaultMessage:
      'Olá, equipe ALTACORP. Gostaria de solicitar uma avaliação técnica para a infraestrutura de TI da nossa empresa.',
  },
  form: {
    // Ex.: 'https://formspree.io/f/seu-codigo' ou URL de endpoint compatível com JSON POST
    endpoint: '',
    method: 'POST',
  },
};
