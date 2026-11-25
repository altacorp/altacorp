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

  function initActiveNavObserver() {
    var navLinks = document.querySelectorAll('.primary-nav a[href^="#"]');
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

  document.addEventListener('DOMContentLoaded', function () {
    initFooterYear();
    initConfiguredContacts();
    initHeaderAndMobileMenu();
    initHeroWorkbenchTabs();
    initTechCategoryFilters();
    initActiveNavObserver();
    initRevealAnimations();
    initServicePreselection();
    initContactForm();
    initSmoothScroll();
  });
})();
