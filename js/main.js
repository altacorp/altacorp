/**
 * ALTACORP — Comportamento Interativo em JavaScript Puro (Vanilla JS)
 * - Menu mobile acessível
 * - Abas interativas no showcase do Hero (estilo Grafana)
 * - Filtro de categorias de tecnologia
 * - Destaque de seção ativa na navegação
 * - Pré-seleção de serviço e validação/envio do formulário
 */
(function () {
  'use strict';

  var config = window.ALTACORP_CONFIG || {
    brand: { name: 'ALTACORP', domain: 'altacorp.com.br', url: 'https://altacorp.com.br' },
    contacts: { email: '', whatsappNumber: '', whatsappDisplay: '', whatsappDefaultMessage: '' },
    form: { endpoint: '', method: 'POST' },
  };

  function buildWhatsAppUrl(customText) {
    var digits = String((config.contacts && config.contacts.whatsappNumber) || '').replace(/\D/g, '');
    if (!digits) return '';
    var text = encodeURIComponent(
      customText || (config.contacts && config.contacts.whatsappDefaultMessage) || ''
    );
    return 'https://wa.me/' + digits + '?text=' + text;
  }

  function buildMailtoUrl(subject, body) {
    var email = String((config.contacts && config.contacts.email) || '').trim();
    if (!email) return '';
    var query = [];
    if (subject) query.push('subject=' + encodeURIComponent(subject));
    if (body) query.push('body=' + encodeURIComponent(body));
    return 'mailto:' + email + (query.length ? '?' + query.join('&') : '');
  }

  function initFooterYear() {
    var yearEl = document.getElementById('current-year');
    if (yearEl) {
      yearEl.textContent = String(new Date().getFullYear());
    }
  }

  function initConfiguredContacts() {
    var email = String((config.contacts && config.contacts.email) || '').trim();
    var waUrl = buildWhatsAppUrl();
    var waDisplay = String((config.contacts && config.contacts.whatsappDisplay) || '').trim();

    document.querySelectorAll('[data-contact-email]').forEach(function (container) {
      if (email) {
        container.innerHTML =
          '<a href="mailto:' + email + '" class="contact-channel-link">' + email + '</a>';
      }
    });

    document.querySelectorAll('[data-footer-email]').forEach(function (container) {
      if (email) {
        container.innerHTML = '<a href="mailto:' + email + '">' + email + '</a>';
      }
    });

    var contactWaBtn = document.getElementById('contact-whatsapp-btn');
    var contactWaPlaceholder = document.getElementById('contact-whatsapp-placeholder');
    if (contactWaBtn && contactWaPlaceholder && waUrl) {
      contactWaBtn.href = waUrl;
      contactWaBtn.target = '_blank';
      contactWaBtn.rel = 'noopener noreferrer';
      contactWaBtn.classList.remove('is-hidden');
      contactWaPlaceholder.classList.add('is-hidden');
      var labelSpan = contactWaBtn.querySelector('[data-wa-label]');
      if (labelSpan) {
        labelSpan.textContent = waDisplay
          ? 'Conversar pelo WhatsApp (' + waDisplay + ')'
          : 'Conversar pelo WhatsApp';
      }
    }

    document.querySelectorAll('[data-footer-whatsapp]').forEach(function (container) {
      if (waUrl) {
        container.innerHTML =
          '<a href="' +
          waUrl +
          '" target="_blank" rel="noopener noreferrer">' +
          (waDisplay || 'Iniciar atendimento via WhatsApp') +
          '</a>';
      }
    });
  }

  function initHeaderAndMobileMenu() {
    var header = document.getElementById('site-header');
    var toggleBtn = document.getElementById('nav-toggle');
    var drawer = document.getElementById('mobile-drawer');

    if (header) {
      var updateScrollState = function () {
        if (window.scrollY > 12) {
          header.classList.add('is-scrolled');
        } else {
          header.classList.remove('is-scrolled');
        }
      };
      window.addEventListener('scroll', updateScrollState, { passive: true });
      updateScrollState();
    }

    if (toggleBtn && drawer) {
      var closeDrawer = function () {
        drawer.classList.remove('is-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.setAttribute('aria-label', 'Abrir menu de navegação');
        var openIcon = toggleBtn.querySelector('[data-icon-open]');
        var closeIcon = toggleBtn.querySelector('[data-icon-close]');
        if (openIcon) openIcon.classList.remove('is-hidden');
        if (closeIcon) closeIcon.classList.add('is-hidden');
      };

      var openDrawer = function () {
        drawer.classList.add('is-open');
        toggleBtn.setAttribute('aria-expanded', 'true');
        toggleBtn.setAttribute('aria-label', 'Fechar menu de navegação');
        var openIcon = toggleBtn.querySelector('[data-icon-open]');
        var closeIcon = toggleBtn.querySelector('[data-icon-close]');
        if (openIcon) openIcon.classList.add('is-hidden');
        if (closeIcon) closeIcon.classList.remove('is-hidden');
      };

      toggleBtn.addEventListener('click', function () {
        if (drawer.classList.contains('is-open')) {
          closeDrawer();
        } else {
          openDrawer();
        }
      });

      drawer.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', closeDrawer);
      });

      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && drawer.classList.contains('is-open')) {
          closeDrawer();
          toggleBtn.focus();
        }
      });
    }
  }

  function initHeroWorkbenchTabs() {
    var tabs = document.querySelectorAll('[data-workbench-tab]');
    var panels = document.querySelectorAll('[data-workbench-panel]');
    if (!tabs.length || !panels.length) return;

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var target = tab.getAttribute('data-workbench-tab');

        tabs.forEach(function (t) {
          var isSelected = t === tab;
          t.classList.toggle('is-active', isSelected);
          t.setAttribute('aria-selected', isSelected ? 'true' : 'false');
        });

        panels.forEach(function (panel) {
          var match = panel.getAttribute('data-workbench-panel') === target;
          panel.classList.toggle('is-hidden', !match);
        });
      });
    });
  }

  function initTechCategoryFilters() {
    var buttons = document.querySelectorAll('[data-tech-filter]');
    var cards = document.querySelectorAll('[data-tech-category]');
    if (!buttons.length || !cards.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-tech-filter');

        buttons.forEach(function (b) {
          b.classList.toggle('is-active', b === btn);
          b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
        });

        cards.forEach(function (card) {
          var cat = card.getAttribute('data-tech-category');
          var show = filter === 'all' || cat === filter;
          card.classList.toggle('is-hidden', !show);
        });
      });
    });
  }

  function initMegaMenu() {
    var dropdownItems = document.querySelectorAll('.nav-item--has-dropdown');
    if (!dropdownItems.length) return;

    dropdownItems.forEach(function (item) {
      var trigger = item.querySelector('.primary-nav__link');
      var links = item.querySelectorAll('.mega-menu a');

      item.addEventListener('mouseenter', function () {
        item.classList.remove('is-closed');
        if (trigger) trigger.setAttribute('aria-expanded', 'true');
      });

      item.addEventListener('mouseleave', function () {
        item.classList.remove('is-closed');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      });

      links.forEach(function (link) {
        link.addEventListener('click', function () {
          item.classList.add('is-closed');
          if (trigger) trigger.setAttribute('aria-expanded', 'false');
          if (document.activeElement && typeof document.activeElement.blur === 'function') {
            document.activeElement.blur();
          }

          var techFilter = link.getAttribute('data-mega-tech');
          if (techFilter) {
            var filterBtn = document.querySelector('[data-tech-filter="' + techFilter + '"]');
            if (filterBtn) filterBtn.click();
          }
        });
      });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        dropdownItems.forEach(function (item) {
          item.classList.add('is-closed');
          var trigger = item.querySelector('.primary-nav__link');
          if (trigger) trigger.setAttribute('aria-expanded', 'false');
        });
      }
    });
  }

  function initActiveNavObserver() {
    var navLinks = document.querySelectorAll('.primary-nav__link[href^="#"]');
    if (!navLinks.length || !('IntersectionObserver' in window)) return;

    var linkById = {};
    navLinks.forEach(function (link) {
      var id = link.getAttribute('href').slice(1);
      if (id) linkById[id] = link;
    });

    var sections = Object.keys(linkById)
      .map(function (id) {
        return document.getElementById(id);
      })
      .filter(Boolean);

    if (!sections.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            navLinks.forEach(function (item) {
              item.classList.remove('is-active');
            });
            var activeLink = linkById[entry.target.id];
            if (activeLink) activeLink.classList.add('is-active');
          }
        });
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: 0 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  function initRevealAnimations() {
    var elements = document.querySelectorAll('[data-reveal]');
    if (!elements.length) return;

    var prefersReduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced || !('IntersectionObserver' in window)) {
      elements.forEach(function (el) {
        el.classList.add('is-revealed');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  function initServicePreselection() {
    var serviceSelect = document.getElementById('contact-service');
    var contactSection = document.getElementById('contato');
    if (!serviceSelect) return;

    document.querySelectorAll('[data-select-service]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var value = btn.getAttribute('data-select-service') || '';
        if (value) {
          serviceSelect.value = value;
          serviceSelect.classList.remove('is-invalid');
          var errorEl = document.getElementById('error-service');
          if (errorEl) errorEl.textContent = '';
        }
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  function formatSummary(data) {
    return [
      'Solicitação de Avaliação Técnica — ALTACORP',
      'Nome: ' + data.name,
      'Empresa: ' + data.company,
      'E-mail: ' + data.email,
      'Telefone/WhatsApp: ' + data.phone,
      'Serviço de interesse: ' + data.service,
      '',
      'Descrição da necessidade:',
      data.description,
    ].join('\n');
  }

  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;

    var statusBox = document.getElementById('form-status');
    var submitBtn = document.getElementById('form-submit-btn');

    var fields = {
      name: document.getElementById('contact-name'),
      company: document.getElementById('contact-company'),
      email: document.getElementById('contact-email'),
      phone: document.getElementById('contact-phone'),
      service: document.getElementById('contact-service'),
      description: document.getElementById('contact-description'),
    };

    function setFieldError(key, message) {
      var input = fields[key];
      var errorEl = document.getElementById('error-' + key);
      if (input) {
        input.classList.toggle('is-invalid', Boolean(message));
        input.setAttribute('aria-invalid', message ? 'true' : 'false');
      }
      if (errorEl) {
        errorEl.textContent = message || '';
      }
    }

    function clearStatus() {
      if (!statusBox) return;
      statusBox.className = 'form-status';
      statusBox.innerHTML = '';
    }

    Object.keys(fields).forEach(function (key) {
      var input = fields[key];
      if (!input) return;
      input.addEventListener('input', function () {
        setFieldError(key, '');
        clearStatus();
      });
      input.addEventListener('change', function () {
        setFieldError(key, '');
        clearStatus();
      });
    });

    function validateAll() {
      var values = {
        name: (fields.name.value || '').trim(),
        company: (fields.company.value || '').trim(),
        email: (fields.email.value || '').trim(),
        phone: (fields.phone.value || '').trim(),
        service: (fields.service.value || '').trim(),
        description: (fields.description.value || '').trim(),
      };

      var valid = true;

      if (values.name.length < 2) {
        setFieldError('name', 'Informe seu nome completo.');
        valid = false;
      } else {
        setFieldError('name', '');
      }

      if (!values.company) {
        setFieldError('company', 'Informe o nome da empresa.');
        valid = false;
      } else {
        setFieldError('company', '');
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        setFieldError('email', 'Informe um e-mail corporativo válido.');
        valid = false;
      } else {
        setFieldError('email', '');
      }

      if (values.phone.replace(/\D/g, '').length < 10) {
        setFieldError('phone', 'Informe um telefone ou WhatsApp com DDD.');
        valid = false;
      } else {
        setFieldError('phone', '');
      }

      if (!values.service) {
        setFieldError('service', 'Selecione o serviço de interesse.');
        valid = false;
      } else {
        setFieldError('service', '');
      }

      if (values.description.length < 12) {
        setFieldError(
          'description',
          'Descreva brevemente o cenário atual ou a necessidade (mínimo de 12 caracteres).'
        );
        valid = false;
      } else {
        setFieldError('description', '');
      }

      return valid ? values : null;
    }

    function renderFallbackActions(values, statusType, message) {
      if (!statusBox) return;
      statusBox.className = 'form-status is-visible form-status--' + statusType;
      statusBox.innerHTML = '';

      var p = document.createElement('p');
      p.textContent = message;
      statusBox.appendChild(p);

      var actions = document.createElement('div');
      actions.className = 'form-status__actions';

      var summary = formatSummary(values);
      var mailUrl = buildMailtoUrl(
        'Solicitação de avaliação técnica — ' + values.company,
        summary
      );
      var waUrl = buildWhatsAppUrl(summary);

      if (mailUrl) {
        var mailLink = document.createElement('a');
        mailLink.href = mailUrl;
        mailLink.className = 'btn btn--navy btn--sm';
        mailLink.textContent = 'Abrir no aplicativo de e-mail';
        actions.appendChild(mailLink);
      }

      if (waUrl) {
        var waLink = document.createElement('a');
        waLink.href = waUrl;
        waLink.target = '_blank';
        waLink.rel = 'noopener noreferrer';
        waLink.className = 'btn btn--primary btn--sm';
        waLink.textContent = 'Enviar resumo pelo WhatsApp';
        actions.appendChild(waLink);
      }

      var copyBtn = document.createElement('button');
      copyBtn.type = 'button';
      copyBtn.className = 'btn btn--outline btn--sm';
      copyBtn.textContent = 'Copiar resumo técnico';
      copyBtn.addEventListener('click', function () {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(summary).then(function () {
            copyBtn.textContent = 'Resumo copiado';
            setTimeout(function () {
              copyBtn.textContent = 'Copiar resumo técnico';
            }, 3000);
          });
        }
      });
      actions.appendChild(copyBtn);

      statusBox.appendChild(actions);
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      clearStatus();

      var values = validateAll();
      if (!values) return;

      var endpoint = String((config.form && config.form.endpoint) || '').trim();
      var method = String((config.form && config.form.method) || 'POST').toUpperCase();

      if (!endpoint) {
        renderFallbackActions(
          values,
          'info',
          'O envio automático do formulário ainda não possui um endpoint externo configurado em js/config.js (como Formspree). Utilize uma das opções abaixo para encaminhar os dados preenchidos sem perdê-los.'
        );
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
      }

      fetch(endpoint, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          nome: values.name,
          empresa: values.company,
          email: values.email,
          telefone: values.phone,
          servico: values.service,
          descricao: values.description,
          origem: config.brand ? config.brand.domain : 'altacorp.com.br',
        }),
      })
        .then(function (response) {
          if (!response.ok) {
            throw new Error('HTTP ' + response.status);
          }
          statusBox.className = 'form-status is-visible form-status--success';
          statusBox.textContent =
            'Solicitação enviada com sucesso. Nossa equipe analisará os dados para retorno técnico.';
          form.reset();
        })
        .catch(function () {
          renderFallbackActions(
            values,
            'error',
            'Não foi possível concluir o envio pelo serviço configurado neste momento. Utilize um dos canais diretos abaixo ou copie o resumo técnico.'
          );
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Enviar solicitação';
          }
        });
    });
  }

  /**
   * Rolagem suave com inércia (roda do mouse / touchpad) em JavaScript puro.
   * Desativada em telas touch e quando o usuário prefere movimento reduzido.
   */
  function initSmoothScroll() {
    var reduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    if (reduced || coarse) return;

    var current = window.scrollY;
    var target = window.scrollY;
    var rafId = null;
    var EASE = 0.1;

    function maxScroll() {
      return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    }

    function tick() {
      current += (target - current) * EASE;
      if (Math.abs(target - current) < 0.5) {
        current = target;
      }
      window.scrollTo({ top: current, left: 0, behavior: 'instant' });
      if (current !== target) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = null;
      }
    }

    window.addEventListener(
      'wheel',
      function (event) {
        if (event.ctrlKey || event.defaultPrevented) return;
        if (event.target.closest && event.target.closest('textarea, select, [data-no-smooth]')) return;

        event.preventDefault();

        var delta = event.deltaY;
        if (event.deltaMode === 1) delta *= 32;
        else if (event.deltaMode === 2) delta *= window.innerHeight;

        if (rafId === null) {
          current = window.scrollY;
          target = window.scrollY;
        }
        target = Math.min(maxScroll(), Math.max(0, target + delta));
        if (rafId === null) rafId = requestAnimationFrame(tick);
      },
      { passive: false }
    );

    // Sincroniza quando a rolagem muda por teclado, barra de rolagem ou âncoras
    window.addEventListener(
      'scroll',
      function () {
        if (rafId === null) {
          current = window.scrollY;
          target = window.scrollY;
        }
      },
      { passive: true }
    );
  }

  function initChatWidget() {
    var fab = document.getElementById('chat-fab');
    var chatWindow = document.getElementById('chat-window');
    var closeBtn = document.getElementById('chat-close');
    var resetBtn = document.getElementById('chat-reset');
    var messagesEl = document.getElementById('chat-messages');
    var chatForm = document.getElementById('chat-form');
    var chatInput = document.getElementById('chat-input');
    var tooltip = document.getElementById('chat-tooltip');

    if (!fab || !chatWindow || !messagesEl || !chatForm || !chatInput) return;

    var isOpen = false;
    var hasInitialized = false;

    function nowTime() {
      var d = new Date();
      return (
        String(d.getHours()).padStart(2, '0') +
        ':' +
        String(d.getMinutes()).padStart(2, '0')
      );
    }

    function scrollToBottom() {
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function appendMessage(sender, text, extraNode) {
      var wrapper = document.createElement('div');
      wrapper.className = 'chat-msg chat-msg--' + sender;

      var bubble = document.createElement('div');
      bubble.className = 'chat-bubble';

      if (text) {
        text.split('\n').forEach(function (line) {
          var p = document.createElement('p');
          p.textContent = line;
          bubble.appendChild(p);
        });
      }

      if (extraNode) {
        bubble.appendChild(extraNode);
      }

      var time = document.createElement('span');
      time.className = 'chat-msg__time';
      time.textContent = nowTime();

      wrapper.appendChild(bubble);
      wrapper.appendChild(time);
      messagesEl.appendChild(wrapper);
      scrollToBottom();
    }

    function appendChips(items) {
      var chipsWrap = document.createElement('div');
      chipsWrap.className = 'chat-chips';

      items.forEach(function (item) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'chat-chip' + (item.variant ? ' chat-chip--' + item.variant : '');

        if (item.variant === 'whatsapp') {
          btn.innerHTML =
            '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">' +
            '<path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.77 14.07c-.24.68-1.41 1.3-1.95 1.38-.5.08-1.13.11-1.82-.11-.42-.13-.96-.31-1.66-.61-2.92-1.26-4.82-4.2-4.96-4.4-.14-.2-1.18-1.57-1.18-3s.75-2.13 1.02-2.42c.27-.29.59-.36.79-.36h.57c.18 0 .42-.07.66.5.24.58.83 2.02.9 2.17.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.26 1.63 2.04 1.12 1 2.07 1.31 2.36 1.46.29.15.46.12.63-.07.17-.19.73-.85.92-1.14.2-.29.39-.24.66-.14.27.1 1.71.81 2 .95.29.15.49.22.56.34.07.12.07.7-.17 1.38z"/>' +
            '</svg>' +
            '<span>' +
            item.label +
            '</span>';
        } else {
          btn.textContent = item.label;
        }

        btn.addEventListener('click', function () {
          if (item.intent === 'whatsapp') {
            var directUrl = buildWhatsAppUrl(
              'Olá, equipe ALTACORP! Gostaria de tirar dúvidas sobre infraestrutura de TI.'
            );
            if (directUrl) {
              window.open(directUrl, '_blank', 'noopener,noreferrer');
            }
          }
          chipsWrap.remove();
          handleUserMessage(item.label, item.intent);
        });
        chipsWrap.appendChild(btn);
      });

      messagesEl.appendChild(chipsWrap);
      scrollToBottom();
    }

    function showTyping(callback) {
      var typing = document.createElement('div');
      typing.className = 'chat-typing';
      typing.innerHTML = '<span></span><span></span><span></span>';
      messagesEl.appendChild(typing);
      scrollToBottom();

      setTimeout(function () {
        if (typing.parentNode) typing.remove();
        callback();
      }, 480);
    }

    function buildContactCard() {
      var card = document.createElement('form');
      card.className = 'chat-contact-card';

      var nameInput = document.createElement('input');
      nameInput.type = 'text';
      nameInput.placeholder = 'Seu nome *';
      nameInput.required = true;

      var contactInput = document.createElement('input');
      contactInput.type = 'text';
      contactInput.placeholder = 'E-mail ou WhatsApp *';
      contactInput.required = true;

      var msgInput = document.createElement('textarea');
      msgInput.placeholder = 'Como podemos ajudar sua empresa? *';
      msgInput.required = true;

      var submitBtn = document.createElement('button');
      submitBtn.type = 'submit';
      submitBtn.className = 'chat-contact-card__submit';
      submitBtn.textContent = 'Enviar mensagem';

      card.appendChild(nameInput);
      card.appendChild(contactInput);
      card.appendChild(msgInput);
      card.appendChild(submitBtn);

      card.addEventListener('submit', function (e) {
        e.preventDefault();
        var name = nameInput.value.trim();
        var contact = contactInput.value.trim();
        var msg = msgInput.value.trim();
        if (!name || !contact || !msg) return;

        var endpoint = String((config.form && config.form.endpoint) || '').trim();
        var method = String((config.form && config.form.method) || 'POST').toUpperCase();

        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';

        if (endpoint) {
          fetch(endpoint, {
            method: method,
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              nome: name,
              contato: contact,
              mensagem: msg,
              origem: 'Chat Flutuante ALTACORP',
            }),
          })
            .then(function (res) {
              if (!res.ok) throw new Error('HTTP ' + res.status);
              card.remove();
              appendMessage(
                'bot',
                'Mensagem recebida, ' +
                name +
                '! Nossa equipe técnica analisará seu contato e responderá em breve.'
              );
            })
            .catch(function () {
              submitBtn.disabled = false;
              submitBtn.textContent = 'Enviar mensagem';
              showDirectChannelOptions(name, contact, msg);
            });
        } else {
          card.remove();
          showDirectChannelOptions(name, contact, msg);
        }
      });

      return card;
    }

    function showDirectChannelOptions(name, contact, msg) {
      var summary =
        'Contato via Chat ALTACORP\nNome: ' +
        name +
        '\nContato: ' +
        contact +
        '\nMensagem: ' +
        msg;

      var actions = document.createElement('div');
      actions.className = 'chat-inline-actions';

      var waUrl = buildWhatsAppUrl(summary);
      var mailUrl = buildMailtoUrl('Contato via site — ' + name, summary);

      if (waUrl) {
        var waBtn = document.createElement('a');
        waBtn.href = waUrl;
        waBtn.target = '_blank';
        waBtn.rel = 'noopener noreferrer';
        waBtn.className = 'chat-inline-btn chat-inline-btn--primary';
        waBtn.textContent = 'Enviar no WhatsApp';
        actions.appendChild(waBtn);
      }

      if (mailUrl) {
        var mailBtn = document.createElement('a');
        mailBtn.href = mailUrl;
        mailBtn.className = 'chat-inline-btn';
        mailBtn.textContent = 'Enviar por E-mail';
        actions.appendChild(mailBtn);
      }

      var formBtn = document.createElement('button');
      formBtn.type = 'button';
      formBtn.className = 'chat-inline-btn';
      formBtn.textContent = 'Ir para formulário completo';
      formBtn.addEventListener('click', function () {
        var descField = document.getElementById('field-description');
        var nameField = document.getElementById('field-name');
        if (nameField && !nameField.value) nameField.value = name;
        if (descField && !descField.value) descField.value = msg + ' (Contato: ' + contact + ')';
        closeChat();
        var contatoEl = document.getElementById('contato');
        if (contatoEl) contatoEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      actions.appendChild(formBtn);

      appendMessage(
        'bot',
        'Obrigado, ' +
        name +
        '! Sua mensagem foi preparada. Escolha abaixo como deseja encaminhar para nossa equipe:',
        actions
      );
    }

    function getBotReply(text, forcedIntent) {
      var q = String(text || '').toLowerCase();

      if (forcedIntent === 'whatsapp' || /whatsapp/.test(q)) {
        var waDirectUrl = buildWhatsAppUrl(
          'Olá, equipe ALTACORP! Gostaria de tirar dúvidas sobre infraestrutura de TI.'
        );
        var waActions = document.createElement('div');
        waActions.className = 'chat-inline-actions';
        var waLink = document.createElement('a');
        waLink.href = waDirectUrl || 'https://wa.me/5511983641085';
        waLink.target = '_blank';
        waLink.rel = 'noopener noreferrer';
        waLink.className = 'chat-inline-btn chat-inline-btn--whatsapp';
        waLink.textContent = 'Abrir WhatsApp (11) 98364-1085';
        waActions.appendChild(waLink);

        appendMessage(
          'bot',
          'Redirecionando para o nosso WhatsApp. Caso a janela não tenha aberto automaticamente, clique abaixo:',
          waActions
        );
        return;
      }

      if (forcedIntent === 'pricing' || /(preço|preco|preços|precos|valor|valores|quanto custa|investimento|plano|planos)/.test(q)) {
        appendMessage(
          'bot',
          'Nossos valores são personalizados conforme o porte do ambiente (quantidade de servidores, estações, firewall, política de backup e nível de suporte/SLA).\nQuer receber uma estimativa ou proposta para sua empresa?'
        );
        appendChips([
          { label: 'Solicitar orçamento', intent: 'contact' },
          { label: 'Falar no WhatsApp', intent: 'whatsapp', variant: 'whatsapp' },
          { label: 'Ver serviços', intent: 'services' },
        ]);
        return;
      }

      if (forcedIntent === 'support' || /(suporte|chamado|incidente|atendimento)/.test(q)) {
        appendMessage(
          'bot',
          'Oferecemos suporte técnico especializado e administração contínua para empresas (monitoramento, servidores, redes, firewall e backup).\nComo prefere prosseguir com seu atendimento?'
        );
        appendChips([
          { label: 'Solicitar uma cotação', intent: 'contact' },
          { label: 'Falar no WhatsApp', intent: 'whatsapp', variant: 'whatsapp' },
          { label: 'Serviços e Infraestrutura', intent: 'services' },
        ]);
        return;
      }

      if (forcedIntent === 'contact' || /(contato|mensagem|orçamento|orcamento|cotação|cotacao|avaliacao|avaliação|falar|email|proposta)/.test(q)) {
        appendMessage(
          'bot',
          'Claro! Preencha os campos abaixo para solicitar uma cotação ou enviar sua mensagem para nossa equipe:',
          buildContactCard()
        );
        return;
      }

      if (forcedIntent === 'services' || /(serviço|servico|rede|servidor|administração|administracao|infraestrutura)/.test(q)) {
        var svcActions = document.createElement('div');
        svcActions.className = 'chat-inline-actions';
        var svcLink = document.createElement('a');
        svcLink.href = '#servicos';
        svcLink.className = 'chat-inline-btn chat-inline-btn--primary';
        svcLink.textContent = 'Ver seção de Serviços';
        svcLink.addEventListener('click', closeChat);
        svcActions.appendChild(svcLink);

        appendMessage(
          'bot',
          'Atuamos com Infraestrutura de Redes, Servidores e Virtualização, Firewall e Segurança, Backup e Recuperação, Monitoramento e Administração contínua de TI para PMEs.',
          svcActions
        );
        appendChips([
          { label: 'Solicitar uma cotação', intent: 'contact' },
          { label: 'Quais tecnologias vocês usam?', intent: 'tech' },
        ]);
        return;
      }

      if (forcedIntent === 'tech' || /(tecnologia|proxmox|opnsense|unifi|tailscale|zabbix|qnap|truenas|linux|windows|backup|firewall)/.test(q)) {
        var techActions = document.createElement('div');
        techActions.className = 'chat-inline-actions';
        var techLink = document.createElement('a');
        techLink.href = '#tecnologias';
        techLink.className = 'chat-inline-btn chat-inline-btn--primary';
        techLink.textContent = 'Explorar Tecnologias';
        techLink.addEventListener('click', closeChat);
        techActions.appendChild(techLink);

        appendMessage(
          'bot',
          'Trabalhamos com plataformas consolidadas: Proxmox VE, Firewall OPNsense, Redes UniFi & TailScale, Linux, Windows Server, Monitoramento Zabbix e Backup QNAP & TrueNAS.',
          techActions
        );
        appendChips([
          { label: 'Solicitar uma cotação', intent: 'contact' },
          { label: 'Ver serviços', intent: 'services' },
        ]);
        return;
      }

      appendMessage(
        'bot',
        'Posso ajudar com dúvidas sobre nossos serviços de infraestrutura, suporte técnico, tecnologias ou cotações para sua empresa.'
      );
      appendChips([
        { label: 'Serviços e Infraestrutura', intent: 'services' },
        { label: 'Tecnologias utilizadas', intent: 'tech' },
        { label: 'Suporte Técnico', intent: 'support' },
        { label: 'Preços de serviços', intent: 'pricing' },
        { label: 'Solicitar uma cotação', intent: 'contact' },
        { label: 'Falar no WhatsApp', intent: 'whatsapp', variant: 'whatsapp' },
      ]);
    }

    function handleUserMessage(text, forcedIntent) {
      var trimmed = String(text || '').trim();
      if (!trimmed) return;
      appendMessage('user', trimmed);
      showTyping(function () {
        getBotReply(trimmed, forcedIntent);
      });
    }

    function startConversation() {
      messagesEl.innerHTML = '';
      appendMessage(
        'bot',
        'Olá! Sou o assistente virtual da ALTACORP.\nComo posso ajudar com a infraestrutura de TI da sua empresa hoje?'
      );
      appendChips([
        { label: 'Serviços e Infraestrutura', intent: 'services' },
        { label: 'Tecnologias utilizadas', intent: 'tech' },
        { label: 'Suporte Técnico', intent: 'support' },
        { label: 'Preços de serviços', intent: 'pricing' },
        { label: 'Solicitar uma cotação', intent: 'contact' },
        { label: 'Falar no WhatsApp', intent: 'whatsapp', variant: 'whatsapp' },
      ]);
      hasInitialized = true;
    }

    function openChat() {
      isOpen = true;
      fab.classList.add('is-open');
      fab.setAttribute('aria-expanded', 'true');
      chatWindow.classList.add('is-open');
      chatWindow.setAttribute('aria-hidden', 'false');
      if (tooltip) tooltip.classList.remove('is-visible');
      if (!hasInitialized) startConversation();
      setTimeout(function () {
        chatInput.focus();
      }, 220);
    }

    function closeChat() {
      isOpen = false;
      fab.classList.remove('is-open');
      fab.setAttribute('aria-expanded', 'false');
      chatWindow.classList.remove('is-open');
      chatWindow.setAttribute('aria-hidden', 'true');
    }

    fab.addEventListener('click', function () {
      if (isOpen) closeChat();
      else openChat();
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeChat);
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', startConversation);
    }

    chatForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var val = chatInput.value.trim();
      if (!val) return;
      chatInput.value = '';
      handleUserMessage(val);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && isOpen) {
        closeChat();
      }
    });

    if (tooltip) {
      fab.addEventListener('mouseenter', function () {
        if (!isOpen) tooltip.classList.add('is-visible');
      });

      fab.addEventListener('mouseleave', function () {
        tooltip.classList.remove('is-visible');
      });

      fab.addEventListener('focus', function () {
        if (!isOpen) tooltip.classList.add('is-visible');
      });

      fab.addEventListener('blur', function () {
        tooltip.classList.remove('is-visible');
      });
    }
  }

  function initOpenSourceOrbit() {
    var container = document.getElementById('opensource-orbit');
    if (!container) return;

    var ringEls = Array.prototype.slice.call(container.querySelectorAll('.orbit-ring'));
    var nodeEls = Array.prototype.slice.call(container.querySelectorAll('.orbit-node'));
    if (!ringEls.length || !nodeEls.length) return;

    var prefersReduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function getRadii() {
      return ringEls.map(function (ring) {
        return ring.offsetWidth / 2;
      });
    }

    var radii = getRadii();
    var center = container.offsetWidth / 2;

    // Velocidade angular leve no sentido horário (rad/s) por órbita
    var orbitSpeeds = [0.2, 0.13, 0.085];

    var nodes = nodeEls.map(function (el) {
      var orbitIdx = parseInt(el.getAttribute('data-orbit') || '0', 10);
      var angleDeg = parseFloat(el.getAttribute('data-angle') || '0');
      return {
        el: el,
        orbit: orbitIdx,
        radius: radii[orbitIdx] || 100,
        startRadius: radii[orbitIdx] || 100,
        targetRadius: radii[orbitIdx] || 100,
        hopProgress: 1,
        angle: (angleDeg * Math.PI) / 180,
        isDragging: false,
        dragX: 0,
        dragY: 0,
      };
    });

    function positionNode(node, x, y) {
      var w = node.el.offsetWidth;
      var h = node.el.offsetHeight;
      node.el.style.transform =
        'translate3d(' + (x - w / 2).toFixed(2) + 'px, ' + (y - h / 2).toFixed(2) + 'px, 0)';
    }

    function updateMetrics() {
      radii = getRadii();
      center = container.offsetWidth / 2;
      nodes.forEach(function (n) {
        n.targetRadius = radii[n.orbit];
        if (n.hopProgress >= 1 && !n.isDragging) {
          n.radius = n.targetRadius;
        }
      });
    }

    window.addEventListener('resize', updateMetrics, { passive: true });

    // Salto autônomo ocasional de apenas UMA bolinha por vez
    var activeHopper = null;
    var lastHopTime = performance.now();
    var nextHopDelay = 3400;

    function countNodesInOrbit(orbitIdx) {
      var count = 0;
      nodes.forEach(function (n) {
        if (n.orbit === orbitIdx) count++;
      });
      return count;
    }

    function normalizeAngle(a) {
      var twoPi = Math.PI * 2;
      return ((a % twoPi) + twoPi) % twoPi;
    }

    function shortestAngleDiff(a, b) {
      return Math.atan2(Math.sin(a - b), Math.cos(a - b));
    }

    function getMinArcAngle(orbitIdx) {
      var r = Math.max(radii[orbitIdx] || 80, 56);
      var nodeSize = orbitIdx === 0 ? 52 : orbitIdx === 1 ? 44 : 38;
      // Garante folga mínima entre bordas de bolinhas na mesma linha
      return Math.min(Math.PI * 0.85, (nodeSize + 18) / r);
    }

    function findClearAngleForOrbit(orbitIdx, preferredAngle, excludeNode) {
      var minArc = getMinArcAngle(orbitIdx);
      var peers = nodes
        .filter(function (n) {
          return n !== excludeNode && n.orbit === orbitIdx && !n.isDragging;
        })
        .map(function (n) {
          return normalizeAngle(n.angle);
        })
        .sort(function (a, b) {
          return a - b;
        });

      if (!peers.length) return preferredAngle;

      var prefNorm = normalizeAngle(preferredAngle);
      var hasConflict = peers.some(function (p) {
        return Math.abs(shortestAngleDiff(prefNorm, p)) < minArc;
      });
      if (!hasConflict) return preferredAngle;

      // Encontra o maior espaço livre na órbita destino
      var bestMid = prefNorm;
      var bestGap = -1;
      for (var i = 0; i < peers.length; i++) {
        var current = peers[i];
        var next = i + 1 < peers.length ? peers[i + 1] : peers[0] + Math.PI * 2;
        var gap = next - current;
        if (gap > bestGap) {
          bestGap = gap;
          bestMid = current + gap / 2;
        }
      }
      return preferredAngle + shortestAngleDiff(bestMid, preferredAngle);
    }

    function triggerSingleAutonomousHop(now) {
      if (activeHopper || nodes.some(function (n) { return n.isDragging; })) return;

      // Garante que uma linha nunca fique com menos de 1 bolinha
      var eligibleCandidates = nodes.filter(function (n) {
        return countNodesInOrbit(n.orbit) > 1;
      });
      if (!eligibleCandidates.length) return;

      var candidate = eligibleCandidates[Math.floor(Math.random() * eligibleCandidates.length)];

      var possibleOrbits = [0, 1, 2].filter(function (idx) {
        return idx !== candidate.orbit && Math.abs(idx - candidate.orbit) === 1;
      });
      if (!possibleOrbits.length) return;

      // Prefere órbitas com menos bolinhas para manter o visual equilibrado
      possibleOrbits.sort(function (a, b) {
        return countNodesInOrbit(a) - countNodesInOrbit(b);
      });
      var minCount = countNodesInOrbit(possibleOrbits[0]);
      var balancedOrbits = possibleOrbits.filter(function (idx) {
        return countNodesInOrbit(idx) === minCount;
      });
      var nextOrbit = balancedOrbits[Math.floor(Math.random() * balancedOrbits.length)];

      candidate.orbit = nextOrbit;
      candidate.el.setAttribute('data-orbit', String(nextOrbit));
      candidate.startRadius = candidate.radius;
      candidate.targetRadius = radii[nextOrbit];
      candidate.startAngle = candidate.angle;
      candidate.targetAngle = findClearAngleForOrbit(nextOrbit, candidate.angle, candidate);
      candidate.hopProgress = 0;
      activeHopper = candidate;
      lastHopTime = now;
      nextHopDelay = 3600 + Math.random() * 2400;
    }

    // Arrastar e soltar entre órbitas (Pointer Events)
    var draggedNode = null;

    function findNearestOrbit(dist) {
      var bestIdx = 0;
      var bestDiff = Infinity;
      radii.forEach(function (r, idx) {
        var diff = Math.abs(dist - r);
        if (diff < bestDiff) {
          bestDiff = diff;
          bestIdx = idx;
        }
      });
      return bestIdx;
    }

    function highlightRing(activeIdx) {
      ringEls.forEach(function (ring, idx) {
        ring.classList.toggle('is-target', idx === activeIdx);
      });
    }

    nodes.forEach(function (node) {
      node.el.addEventListener('pointerdown', function (e) {
        e.preventDefault();
        draggedNode = node;
        node.isDragging = true;
        node.hopProgress = 1;
        if (activeHopper === node) activeHopper = null;
        node.el.classList.add('is-dragging');
        if (node.el.setPointerCapture) {
          node.el.setPointerCapture(e.pointerId);
        }

        var rect = container.getBoundingClientRect();
        node.dragX = e.clientX - rect.left;
        node.dragY = e.clientY - rect.top;
        positionNode(node, node.dragX, node.dragY);
      });

      node.el.addEventListener('pointermove', function (e) {
        if (draggedNode !== node) return;
        var rect = container.getBoundingClientRect();
        var x = Math.max(20, Math.min(rect.width - 20, e.clientX - rect.left));
        var y = Math.max(20, Math.min(rect.height - 20, e.clientY - rect.top));
        node.dragX = x;
        node.dragY = y;
        positionNode(node, x, y);

        var dx = x - center;
        var dy = y - center;
        var dist = Math.sqrt(dx * dx + dy * dy);
        highlightRing(findNearestOrbit(dist));
      });

      function endDrag() {
        if (draggedNode !== node) return;
        var dx = node.dragX - center;
        var dy = node.dragY - center;
        var dist = Math.sqrt(dx * dx + dy * dy);
        var nearest = findNearestOrbit(dist);
        var previousOrbit = node.orbit;

        // Se a órbita anterior ficaria vazia (< 1 bolinha), troca com uma bolinha da órbita destino
        if (nearest !== previousOrbit && countNodesInOrbit(previousOrbit) <= 1) {
          var swapPartner = null;
          for (var i = 0; i < nodes.length; i++) {
            if (nodes[i] !== node && nodes[i].orbit === nearest) {
              swapPartner = nodes[i];
              break;
            }
          }
          if (swapPartner) {
            swapPartner.orbit = previousOrbit;
            swapPartner.el.setAttribute('data-orbit', String(previousOrbit));
            swapPartner.startRadius = swapPartner.radius;
            swapPartner.targetRadius = radii[previousOrbit];
            swapPartner.startAngle = swapPartner.angle;
            swapPartner.targetAngle = findClearAngleForOrbit(
              previousOrbit,
              swapPartner.angle,
              swapPartner
            );
            swapPartner.hopProgress = 0;
          } else {
            nearest = previousOrbit;
          }
        }

        var dropAngle = Math.atan2(dy, dx);
        node.orbit = nearest;
        node.el.setAttribute('data-orbit', String(nearest));
        node.angle = dropAngle;
        node.startAngle = dropAngle;
        node.targetAngle = findClearAngleForOrbit(nearest, dropAngle, node);
        node.startRadius = dist;
        node.targetRadius = radii[nearest];
        node.hopProgress = 0;
        node.isDragging = false;
        node.el.classList.remove('is-dragging');
        highlightRing(-1);
        draggedNode = null;
        lastHopTime = performance.now();
      }

      node.el.addEventListener('pointerup', endDrag);
      node.el.addEventListener('pointercancel', endDrag);
    });

    var lastFrame = performance.now();

    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function tick(now) {
      var dt = Math.min((now - lastFrame) / 1000, 0.05);
      lastFrame = now;

      if (!prefersReduced && now - lastHopTime >= nextHopDelay) {
        triggerSingleAutonomousHop(now);
      }

      nodes.forEach(function (node) {
        if (node.isDragging) return;

        var speed = !prefersReduced ? orbitSpeeds[node.orbit] || 0.12 : 0;
        node.angle += speed * dt;

        if (node.hopProgress < 1) {
          node.hopProgress = Math.min(1, node.hopProgress + dt / 0.75);
          var eased = easeInOutCubic(node.hopProgress);
          node.radius = node.startRadius + (node.targetRadius - node.startRadius) * eased;
          if (typeof node.startAngle === 'number' && typeof node.targetAngle === 'number') {
            node.startAngle += speed * dt;
            node.targetAngle += speed * dt;
            node.angle =
              node.startAngle + shortestAngleDiff(node.targetAngle, node.startAngle) * eased;
          }
          if (node.hopProgress >= 1 && activeHopper === node) {
            activeHopper = null;
          }
        } else {
          node.radius = radii[node.orbit];
        }
      });

      // Repulsão suave entre bolinhas na mesma órbita para nunca se sobreporem
      [0, 1, 2].forEach(function (orbitIdx) {
        var orbitNodes = nodes.filter(function (n) {
          return !n.isDragging && n.orbit === orbitIdx;
        });
        if (orbitNodes.length < 2) return;
        var minArc = getMinArcAngle(orbitIdx);

        for (var i = 0; i < orbitNodes.length; i++) {
          for (var j = i + 1; j < orbitNodes.length; j++) {
            var a = orbitNodes[i];
            var b = orbitNodes[j];
            var diff = shortestAngleDiff(a.angle, b.angle);
            var absDiff = Math.abs(diff);
            if (absDiff < minArc) {
              var push = (minArc - absDiff) * Math.min(1, dt * 8) * 0.5;
              var dir = diff >= 0 ? 1 : -1;
              a.angle += dir * push;
              b.angle -= dir * push;
            }
          }
        }
      });

      nodes.forEach(function (node) {
        if (node.isDragging) return;
        var x = center + node.radius * Math.cos(node.angle);
        var y = center + node.radius * Math.sin(node.angle);
        positionNode(node, x, y);
      });

      requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  function initShowcaseImageParallax() {
    var frames = Array.prototype.slice.call(document.querySelectorAll('.feature-frame'));
    if (!frames.length) return;

    var items = frames
      .map(function (frame) {
        var img = frame.querySelector('.feature-frame__inner img');
        if (!img) return null;
        return {
          frame: frame,
          img: img,
          curX: 0,
          curY: 0,
          curScale: 1.1,
          hoverX: 0,
          hoverY: 0,
          hoverScale: 0,
        };
      })
      .filter(Boolean);

    if (!items.length) return;

    items.forEach(function (item) {
      item.frame.addEventListener('mousemove', function (e) {
        var rect = item.frame.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        var nx = (e.clientX - rect.left) / rect.width - 0.5;
        var ny = (e.clientY - rect.top) / rect.height - 0.5;
        item.hoverX = -nx * 18;
        item.hoverY = -ny * 18;
        item.hoverScale = 0.05;
        ensureLoop();
      });

      item.frame.addEventListener('mouseleave', function () {
        item.hoverX = 0;
        item.hoverY = 0;
        item.hoverScale = 0;
        ensureLoop();
      });
    });

    var rafId = null;

    function tick() {
      var vh = window.innerHeight || document.documentElement.clientHeight || 800;
      var needsMore = false;

      items.forEach(function (item) {
        var rect = item.frame.getBoundingClientRect();
        var center = rect.top + rect.height / 2;
        var progress = Math.max(-1, Math.min(1, (vh / 2 - center) / (vh / 2 + rect.height / 2)));

        var targetY = progress * 26 + item.hoverY;
        var targetX = item.hoverX;
        var targetScale = 1.12 - Math.abs(progress) * 0.03 + item.hoverScale;

        item.curX += (targetX - item.curX) * 0.14;
        item.curY += (targetY - item.curY) * 0.14;
        item.curScale += (targetScale - item.curScale) * 0.14;

        if (
          Math.abs(targetX - item.curX) > 0.05 ||
          Math.abs(targetY - item.curY) > 0.05 ||
          Math.abs(targetScale - item.curScale) > 0.0005
        ) {
          needsMore = true;
        }

        item.img.style.transform =
          'translate3d(' +
          item.curX.toFixed(2) +
          'px, ' +
          item.curY.toFixed(2) +
          'px, 0) scale(' +
          item.curScale.toFixed(4) +
          ')';
      });

      if (needsMore) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = null;
      }
    }

    function ensureLoop() {
      if (rafId === null) {
        rafId = requestAnimationFrame(tick);
      }
    }

    window.addEventListener('scroll', ensureLoop, { passive: true });
    window.addEventListener('wheel', ensureLoop, { passive: true });
    window.addEventListener('resize', ensureLoop, { passive: true });
    ensureLoop();
  }

  document.addEventListener('DOMContentLoaded', function () {
    initFooterYear();
    initConfiguredContacts();
    initHeaderAndMobileMenu();
    initMegaMenu();
    initHeroWorkbenchTabs();
    initShowcaseImageParallax();
    initOpenSourceOrbit();
    initTechCategoryFilters();
    initActiveNavObserver();
    initRevealAnimations();
    initServicePreselection();
    initContactForm();
    initSmoothScroll();
    initChatWidget();
  });
})();
