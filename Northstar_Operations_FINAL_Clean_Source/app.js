(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const safeSession = {
    get(key) { try { return sessionStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { sessionStorage.setItem(key, value); } catch {} },
    remove(key) { try { sessionStorage.removeItem(key); } catch {} }
  };

  const state = {
    route: 'dashboard',
    priority: 'Normal',
    loggedIn: safeSession.get('northstar-demo-session') === '1'
  };

  const loginPage = $('#login-page');
  const workspace = $('#workspace');
  const pageTitle = $('#page-title');
  const pageEyebrow = $('#page-eyebrow');

  function showWorkspace() {
    loginPage.classList.add('hidden');
    workspace.classList.remove('hidden');
    routeTo(state.route);
  }

  function showLogin() {
    workspace.classList.add('hidden');
    loginPage.classList.remove('hidden');
  }

  function routeTo(route) {
    state.route = route;
    const titles = {
      dashboard: ['OPERATIONS OVERVIEW', 'Good afternoon.'],
      services: ['SERVICE INVENTORY', 'Connectivity services'],
      support: ['SUPPORT & INCIDENTS', 'Resolve issues clearly']
    };
    $$('.view').forEach((view) => view.classList.toggle('active', view.dataset.view === route));
    $$('.nav-item').forEach((item) => item.classList.toggle('active', item.dataset.route === route));
    pageEyebrow.textContent = titles[route][0];
    pageTitle.textContent = titles[route][1];
    try { history.replaceState(null, '', `#${route}`); } catch {}
  }

  $('#toggle-password').addEventListener('click', (event) => {
    const input = $('#password');
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    event.currentTarget.textContent = isPassword ? 'Hide' : 'Show';
    event.currentTarget.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
  });

  $('#login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = $('#email').value.trim();
    const password = $('#password').value;
    const error = $('#login-error');
    const button = $('#login-button');
    error.textContent = '';

    if (!email.includes('@') || password.length < 8) {
      error.textContent = 'Enter a valid email and a password with at least 8 characters.';
      return;
    }

    button.disabled = true;
    button.textContent = 'Checking…';
    await new Promise((resolve) => setTimeout(resolve, 420));

    if (email !== 'demo@northstar.local' || password !== 'Demo2026!') {
      error.textContent = 'Demo credentials do not match. Use the prefilled account.';
      button.disabled = false;
      button.textContent = 'Continue';
      return;
    }

    safeSession.set('northstar-demo-session', '1');
    state.loggedIn = true;
    button.textContent = 'Continue';
    button.disabled = false;
    state.route = 'dashboard';
    showWorkspace();
  });

  $('#logout-button').addEventListener('click', () => {
    safeSession.remove('northstar-demo-session');
    state.loggedIn = false;
    showLogin();
  });

  $$('[data-route]').forEach((button) => button.addEventListener('click', () => routeTo(button.dataset.route)));

  function openServiceDialog(name) {
    $('#dialog-title').textContent = name;
    const dialog = $('#service-dialog');
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
  }

  $$('.service-details, .service-row').forEach((button) => button.addEventListener('click', () => openServiceDialog(button.dataset.service)));
  $('#dialog-close').addEventListener('click', () => $('#service-dialog').close());

  $('#refresh-services').addEventListener('click', async (event) => {
    const button = event.currentTarget;
    const original = button.textContent;
    button.textContent = 'Refreshing…';
    button.disabled = true;
    await new Promise((resolve) => setTimeout(resolve, 520));
    button.textContent = original;
    button.disabled = false;
    const toast = $('#refresh-toast');
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 2200);
  });

  $$('#priority button').forEach((button) => button.addEventListener('click', () => {
    state.priority = button.dataset.priority;
    $$('#priority button').forEach((item) => item.classList.toggle('selected', item === button));
  }));

  $('#support-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const description = $('#description').value.trim();
    const error = $('#support-error');
    const success = $('#ticket-success');
    const button = $('#submit-ticket');
    error.textContent = '';
    success.classList.add('hidden');

    if (description.length < 20) {
      error.textContent = 'Please provide at least 20 characters so the issue can be triaged.';
      return;
    }

    button.disabled = true;
    button.textContent = 'Submitting…';
    await new Promise((resolve) => setTimeout(resolve, 540));
    $('#ticket-id').textContent = `NS-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`;
    success.classList.remove('hidden');
    button.textContent = 'Submit incident';
    button.disabled = false;
  });

  const initialRoute = location.hash.replace('#', '');
  if (['dashboard', 'services', 'support'].includes(initialRoute)) state.route = initialRoute;
  if (state.loggedIn) showWorkspace(); else showLogin();
})();
