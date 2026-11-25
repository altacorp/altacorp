# ALTACORP — Site Institucional

Site institucional oficial da **ALTACORP** ([altacorp.com.br](https://altacorp.com.br)), desenvolvido exclusivamente com **HTML5, CSS3 e JavaScript puro (Vanilla JS)**, sem dependências, sem frameworks e sem etapa de build — pronto para publicação direta no **GitHub Pages**.

## Estrutura do projeto

```text
altacorp/
├── index.html          # Página institucional principal
├── privacidade.html    # Política de Privacidade
├── robots.txt          # Diretrizes para mecanismos de busca
├── sitemap.xml         # Mapa do site para indexação
├── CNAME               # Domínio personalizado (altacorp.com.br)
├── README.md
├── assets/
│   ├── images/         # Logotipo oficial (Logo.png) e fotografias de infraestrutura
│   ├── logos/          # Logotipos vetoriais (SVG) das tecnologias utilizadas
│   └── icons/          # Favicon e ícones de interface
├── css/
│   ├── style.css       # Identidade visual, paleta, tipografia e layout
│   ├── responsive.css  # Adaptação para desktop, notebook, tablet e mobile
│   └── animations.css  # Animações discretas com suporte a prefers-reduced-motion
└── js/
    ├── config.js       # Configuração centralizada de contatos e formulário
    └── main.js         # Menu mobile, pré-seleção de serviços, validação e envio
```

---

## 1. Como publicar pelo GitHub Pages

Como o site utiliza apenas arquivos estáticos na raiz do repositório, não é necessária nenhuma ferramenta de compilação:

1. Envie todos os arquivos deste repositório para a branch `main` no GitHub (`https://github.com/altacorp/altacorp`).
2. No repositório no GitHub, acesse **Settings → Pages**.
3. Em **Build and deployment**, selecione **Deploy from a branch**.
4. Escolha a branch `main` e a pasta `/ (root)`, e clique em **Save**.
5. Após alguns segundos, o GitHub Pages publicará o site automaticamente.

---

## 2. Como configurar o domínio personalizado

O arquivo `CNAME` na raiz já está preenchido com `altacorp.com.br`.

1. No painel do seu provedor de DNS, aponte os registros do domínio `altacorp.com.br` para o GitHub Pages conforme a documentação oficial do GitHub (registros `A` para o domínio raiz e `CNAME` para `www`, se utilizado).
2. No GitHub, em **Settings → Pages → Custom domain**, confirme `altacorp.com.br`.
3. Após a propagação do DNS, marque a opção **Enforce HTTPS** para garantir navegação segura.

---

## 3. Como alterar textos e informações comerciais

- **Contatos comerciais (e-mail e WhatsApp):** edite o arquivo `js/config.js`:
  ```js
  contacts: {
    email: 'contato@altacorp.com.br',
    whatsappNumber: '5511999999999', // DDI + DDD + número (somente dígitos)
    whatsappDisplay: '+55 (11) 99999-9999',
    whatsappDefaultMessage: 'Olá, equipe ALTACORP...',
  }
  ```
  Assim que preenchidos, os links do rodapé, o botão direto de WhatsApp e as opções de contato na seção `#contato` são ativados automaticamente.
- **Textos institucionais, serviços e metodologia:** edite diretamente as seções semânticas em `index.html` (e `privacidade.html` para termos de privacidade).
- **Cores e tipografia:** todas as variáveis ficam centralizadas no topo de `css/style.css` em `:root`.

---

## 4. Como substituir imagens e logotipos

- **Logotipo oficial da ALTACORP:** o arquivo utilizado no cabeçalho e no rodapé está em `assets/images/Logo.png`. Caso deseje substituir mantendo o mesmo nome, basta sobrescrever o arquivo preservando proporções e fundo transparente. Caso forneça uma versão branca específica para fundos escuros (por exemplo `assets/images/Logo-white.png`), atualize a tag `<img>` do `<footer>` em `index.html` e `privacidade.html` e remova o fundo branco da classe `.footer-brand-plate` em `css/style.css`.
- **Fotografias de infraestrutura:** ficam em `assets/images/` (`hero-datacenter.jpg`, `network-rack.jpg` e `infra-operations.jpg`). Ao substituir, dê preferência a formatos otimizados (`.webp`, `.avif` ou `.jpg` comprimido).
- **Logotipos de tecnologias:** estão organizados em formato SVG em `assets/logos/`.

---

## 5. Como configurar o formulário de contato

O GitHub Pages hospeda apenas arquivos estáticos (sem execução de backend). Por padrão, quando nenhum endpoint está configurado em `js/config.js`, o formulário valida todos os campos e exibe opções reais para abrir o resumo no aplicativo de e-mail, enviar via WhatsApp (quando configurado) ou copiar o resumo técnico para a área de transferência — **sem simular envio fictício**.

Para habilitar o envio automático via serviço externo (como **Formspree**):

1. Crie um formulário no serviço escolhido (por exemplo, [Formspree](https://formspree.io/)) e copie a URL do endpoint gerado (ex.: `https://formspree.io/f/seu-codigo`).
2. Abra `js/config.js` e preencha `form.endpoint`:
   ```js
   form: {
     endpoint: 'https://formspree.io/f/seu-codigo',
     method: 'POST',
   }
   ```
3. Salve e publique o arquivo atualizado no repositório. O `js/main.js` passará a enviar os dados em JSON diretamente para o endpoint configurado, exibindo confirmação real ou fallback em caso de erro de rede.
