# ALTACORP — Site Institucional

Site institucional oficial da **ALTACORP** ([altacorp.com.br](https://altacorp.com.br)), empresa especializada em infraestrutura de TI, redes corporativas, servidores, virtualização, segurança da informação e administração de ambientes tecnológicos para pequenas e médias empresas.

## Stack

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS v4**
- **React Router DOM** (`/` e `/privacidade`)
- **Lucide React**
- Tipografia: **Spline Sans** (títulos e chamadas) e **IBM Plex Sans** (textos e interface)

## Configuração centralizada

Todas as informações institucionais, serviços, tecnologias e canais de contato ficam centralizadas em [`src/config/site.ts`](src/config/site.ts):

- `siteConfig.contacts.email`: e-mail comercial exibido no rodapé e na seção de contato (ou via `VITE_CONTACT_EMAIL`).
- `siteConfig.contacts.whatsappNumber`: número WhatsApp comercial apenas dígitos com DDI + DDD (ou via `VITE_WHATSAPP_NUMBER`).
- `siteConfig.contacts.contactEndpoint` / `supabaseUrl` + `supabaseAnonKey`: endpoint real para envio do formulário comercial (Supabase Edge Function, API própria ou serviço de e-mail). Enquanto nenhum endpoint for configurado, o formulário realiza validação completa e oferece abertura direta por e-mail/WhatsApp ou cópia do resumo técnico sem simular envio fictício.

## Desenvolvimento local

```bash
npm install
npm run dev
```

## Build e validação

```bash
npm run build
npm run preview
```

## Deploy no GitHub Pages

O repositório está preparado para publicação direta no **GitHub Pages** via workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

1. No repositório do GitHub (`altacorp/altacorp`), acesse **Settings → Pages → Build and deployment** e selecione **GitHub Actions**.
2. Para domínio customizado (`altacorp.com.br`), configure o domínio em **Custom domain** nas configurações de Pages e aponte os registros DNS para o GitHub Pages.
3. O arquivo [`public/404.html`](public/404.html) e o script de restauração em [`index.html`](index.html) garantem que rotas diretas como `/privacidade` funcionem corretamente no GitHub Pages.
