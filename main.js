/* ═══════════════════════════════════════════
   TONY STYLES · GROWTHENGINE
   Main JS — Auth + Dashboard + Interactions
═══════════════════════════════════════════ */

// ── SIMPLE CLIENT AUTH (localStorage) ──────────────────────────────
// In production this would be a real backend. For now it's a
// fully working demo using localStorage — enough to impress clients
// and show how the portal works.

const AUTH = {
  // Demo clients pre-seeded (real clients get added via admin)
  clients: {
    'client@demo.com': {
      password: 'demo1234',
      name: 'Sarah Mitchell',
      brand: 'Happy Paws Supplements',
      tier: 'Performance Copy (Tier 2)',
      avatar: 'S',
      joinDate: 'Feb 2025',
      projects: [
        { id:1, name:'Email Welcome Sequence (5 emails)', status:'active', progress:80, due:'Mar 20 2025', deliverable:'Email copy doc', notes:'Drafts 1-4 complete. Draft 5 in review.' },
        { id:2, name:'Product Page Rewrites (8 pages)',   status:'active', progress:50, due:'Apr 1 2025',  deliverable:'Product copy doc',notes:'Homepage + 3 PDPs done. 4 remaining.' },
        { id:3, name:'Q1 Ad Copy Refresh (6 variants)',   status:'pending',progress:0,  due:'Apr 10 2025', deliverable:'Ad copy doc',    notes:'Starting after product pages complete.' },
      ],
      invoices: [
        { id:'INV-001', date:'Feb 1 2025',  amount:'$1,500', status:'paid' },
        { id:'INV-002', date:'Mar 1 2025',  amount:'$1,500', status:'paid' },
        { id:'INV-003', date:'Apr 1 2025',  amount:'$1,500', status:'pending' },
      ],
      messages: [
        { from:'Tony', date:'Mar 12', text:'Hi Sarah — Draft 4 of the welcome sequence is in your Drive folder. The subject lines are aggressive on purpose, let me know what you think.' },
        { from:'Tony', date:'Mar 8',  text:'Open rates on the first 3 emails are looking great — 42%, 38%, 36%. Well above industry average. Will report full numbers at our call Friday.' },
        { from:'You',  date:'Mar 6',  text:'Just saw the product page drafts — love the direction. Can we make the CTA on the cat food page a bit more urgent?' },
      ],
      openRate: '41%',
      revenueUp: '+$4,200',
      emailsSent: '3 of 5',
    }
  },

  getSession() {
    try { return JSON.parse(localStorage.getItem('ts_session')); } catch { return null; }
  },
  setSession(client) {
    localStorage.setItem('ts_session', JSON.stringify(client));
  },
  clearSession() {
    localStorage.removeItem('ts_session');
  },
  login(email, password) {
    const c = this.clients[email.toLowerCase()];
    if (c && c.password === password) {
      const session = { email, ...c };
      delete session.password;
      this.setSession(session);
      return session;
    }
    return null;
  }
};

// ── BOOT ───────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  // Navbar scroll
  const nav = document.querySelector('.nav');
  if (nav) window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 40));

  // Active nav link
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mob-menu a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  // Mobile menu
  const ham = document.querySelector('.hamburger');
  const mob = document.querySelector('.mob-menu');
  const mcl = document.querySelector('.mob-close');
  if (ham && mob) {
    ham.addEventListener('click', () => mob.classList.add('open'));
    mcl?.addEventListener('click', () => mob.classList.remove('open'));
    mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mob.classList.remove('open')));
  }

  // Accordion
  document.querySelectorAll('.acc-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const isOpen = btn.classList.contains('open');
      document.querySelectorAll('.acc-btn').forEach(b => { b.classList.remove('open'); b.nextElementSibling?.classList.remove('open'); });
      if (!isOpen) { btn.classList.add('open'); btn.nextElementSibling?.classList.add('open'); }
    });
  });

  // Tabs
  document.querySelectorAll('[data-tabs]').forEach(group => {
    group.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        group.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        group.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        group.querySelector(`[data-panel="${btn.dataset.tab}"]`)?.classList.add('active');
      });
    });
  });

  // Public forms (simulate)
  document.querySelectorAll('form[data-form]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('[type=submit]');
      const sid = form.dataset.success;
      btn.textContent = 'Sending…'; btn.disabled = true;
      setTimeout(() => {
        form.style.display = 'none';
        if (sid) document.getElementById(sid)?.classList.add('show');
      }, 1400);
    });
  });

  // ── LOGIN FORM ──────────────────────────────────────────────────
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = document.getElementById('loginEmail')?.value;
      const pass  = document.getElementById('loginPass')?.value;
      const err   = document.getElementById('loginErr');
      const btn   = loginForm.querySelector('[type=submit]');
      btn.textContent = 'Signing in…'; btn.disabled = true;
      setTimeout(() => {
        const session = AUTH.login(email, pass);
        if (session) {
          window.location.href = 'dashboard/index.html';
        } else {
          if (err) { err.textContent = 'Incorrect email or password. Try: client@demo.com / demo1234'; err.style.display = 'block'; }
          btn.textContent = 'Sign In'; btn.disabled = false;
        }
      }, 900);
    });
    // autofill demo hint
    document.getElementById('demoFill')?.addEventListener('click', () => {
      document.getElementById('loginEmail').value = 'client@demo.com';
      document.getElementById('loginPass').value = 'demo1234';
    });
  }

  // ── DASHBOARD BOOT ──────────────────────────────────────────────
  if (window.location.pathname.includes('/dashboard/')) {
    const session = AUTH.getSession();
    if (!session) { window.location.href = '../login.html'; return; }
    bootDashboard(session);
  }

  // Logout
  document.getElementById('logoutBtn')?.addEventListener('click', () => {
    AUTH.clearSession(); window.location.href = '../index.html';
  });

  // ── ROI CALCULATOR ──────────────────────────────────────────────
  document.getElementById('calcBtn')?.addEventListener('click', () => {
    const rev  = parseFloat(document.getElementById('calcRev')?.value) || 0;
    const rate = parseFloat(document.getElementById('calcRate')?.value) || 0;
    const aov  = parseFloat(document.getElementById('calcAOV')?.value) || 0;
    if (!rev || !rate || !aov) return showToast('Please fill all 3 fields.');
    const lift = Math.round(rev * 0.32);
    const annual = lift * 12;
    const el = document.getElementById('calcResult');
    if (!el) return;
    el.innerHTML = `<div style="background:var(--card);border:1px solid rgba(201,168,76,.25);border-radius:14px;padding:24px;margin-top:20px">
      <p class="label" style="margin-bottom:14px">Estimated Revenue Lift from Better Copy</p>
      <div class="g2" style="gap:20px">
        <div class="stat"><div class="stat-v">$${lift.toLocaleString()}</div><div class="stat-l">Per month</div></div>
        <div class="stat"><div class="stat-v">$${annual.toLocaleString()}</div><div class="stat-l">Per year</div></div>
      </div>
      <p style="font-size:12.5px;text-align:center;margin-top:14px;color:var(--slate)">Based on average 32% email revenue lift across Tony's pet & baby brand clients.</p>
    </div>`; el.style.display = 'block';
  });

  // ── QUIZ ────────────────────────────────────────────────────────
  document.getElementById('quizBtn')?.addEventListener('click', () => {
    const r = document.getElementById('q1')?.value;
    const n = document.getElementById('q2')?.value;
    const g = document.getElementById('q3')?.value;
    if (!r || !n || !g) return showToast('Please answer all 3 questions first.');
    let tier = 'Starter Copy (Tier 1)', why = "You're at the perfect stage to test what great copy does for your brand. One focused project will show you the ROI before committing to ongoing work.", link = 'contact.html';
    if (r === 'mid' || r === 'high') { tier = 'Performance Copy (Tier 2)'; why = "You're generating real revenue and ready to use copy as a growth lever. A performance retainer means Tony's success is directly tied to yours."; }
    if (r === 'high' && g === 'scale') { tier = 'Growth Partnership (Tier 3)'; why = "You're ready to treat copy as a core growth function, not a service. Tony takes a stake in your outcome — real partnership, real results."; }
    const el = document.getElementById('quizResult');
    if (!el) return;
    el.innerHTML = `<div class="badge b-gold" style="margin-bottom:12px">✦ Your Recommendation</div>
      <h3 style="margin-bottom:10px">${tier}</h3>
      <p style="margin-bottom:20px">${why}</p>
      <a href="${link}" class="btn btn-gold">Apply for This Plan →</a>`;
    el.style.display = 'block';
  });

  // ── COPY AUDIT WIDGET ───────────────────────────────────────────
  document.getElementById('auditBtn')?.addEventListener('click', () => {
    const copy = document.getElementById('auditCopy')?.value.trim();
    if (!copy || copy.length < 20) return showToast('Paste at least 20 characters of copy.');
    const btn = document.getElementById('auditBtn');
    btn.textContent = 'Analysing…'; btn.disabled = true;
    setTimeout(() => {
      const el = document.getElementById('auditResult');
      if (el) {
        el.innerHTML = `<p class="label" style="margin-bottom:14px">3 Things Holding Your Copy Back</p>
          <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:20px">
            <div class="card" style="padding:16px"><strong style="color:var(--red)">❶ No clear hook in line 1.</strong><br/><span style="font-size:13px;color:rgba(248,250,255,.55)">Your reader decides in 2 seconds. Lead with the biggest benefit or boldest claim.</span></div>
            <div class="card" style="padding:16px"><strong style="color:var(--red)">❷ Features, not feelings.</strong><br/><span style="font-size:13px;color:rgba(248,250,255,.55)">Pet and baby buyers buy safety, love, and peace of mind. Reframe every feature as an emotional outcome.</span></div>
            <div class="card" style="padding:16px"><strong style="color:var(--red)">❸ Weak or missing CTA.</strong><br/><span style="font-size:13px;color:rgba(248,250,255,.55)">Make it specific: "Shop the Bundle" beats "Buy Now." Specificity creates trust and urgency.</span></div>
          </div>
          <div style="background:var(--gold-dim);border:1px solid rgba(201,168,76,.25);border-radius:10px;padding:18px;text-align:center">
            <p style="font-size:14px;margin-bottom:12px"><strong style="color:var(--gold-light)">Want Tony's personal full audit?</strong> Free Loom video within 48 hours.</p>
            <a href="contact.html#audit" class="btn btn-gold btn-sm">Get My Free Full Audit →</a>
          </div>`; el.style.display = 'block';
      }
      btn.textContent = 'Analyse My Copy'; btn.disabled = false;
    }, 1800);
  });

  // ── SUBJECT LINE SCORER ─────────────────────────────────────────
  document.getElementById('slBtn')?.addEventListener('click', () => {
    const line = document.getElementById('subjectLine')?.value.trim();
    if (!line) return showToast('Enter a subject line first.');
    let score = 5;
    if (line.length > 20 && line.length < 55) score += 2;
    if (line.includes('?')) score += 1;
    if (/\d/.test(line)) score += 1;
    if (line.length < 10) score -= 2;
    score = Math.min(10, Math.max(2, score));
    const colour = score >= 8 ? 'var(--teal)' : score >= 6 ? 'var(--gold)' : 'var(--red)';
    const el = document.getElementById('slResult');
    if (!el) return;
    el.innerHTML = `<div style="text-align:center;margin-bottom:18px">
        <div style="font-family:var(--font-h);font-size:54px;font-weight:900;color:${colour};line-height:1">${score}<span style="font-size:22px;color:var(--slate)">/10</span></div>
        <p style="color:var(--slate);font-size:12.5px">Open Rate Score</p>
      </div>
      <p style="margin-bottom:14px;font-size:14px;font-weight:600">3 stronger alternatives:</p>
      <div style="display:flex;flex-direction:column;gap:9px">
        <div class="card" style="padding:12px;font-size:13.5px">🐾 "Is your dog supplement really doing enough? (Most aren't)"</div>
        <div class="card" style="padding:12px;font-size:13.5px">👶 "The one thing 9/10 baby brands get wrong about their copy"</div>
        <div class="card" style="padding:12px;font-size:13.5px">📬 "We analysed 200 pet brand emails. Here's what made them click."</div>
      </div>`;
    el.style.display = 'block';
  });

  // Hash scroll
  if (location.hash) setTimeout(() => document.querySelector(location.hash)?.scrollIntoView({ behavior:'smooth' }), 400);

  // Intersection reveals
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }), { threshold:.1 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

}); // end DOMContentLoaded

// ── DASHBOARD RENDERER ──────────────────────────────────────────────
function bootDashboard(s) {
  // Fill names
  document.querySelectorAll('[data-client-name]').forEach(el => el.textContent = s.name.split(' ')[0]);
  document.querySelectorAll('[data-client-brand]').forEach(el => el.textContent = s.brand);
  document.querySelectorAll('[data-client-tier]').forEach(el => el.textContent = s.tier);
  document.querySelectorAll('[data-client-avatar]').forEach(el => el.textContent = s.avatar);
  document.querySelectorAll('[data-open-rate]').forEach(el => el.textContent = s.openRate);
  document.querySelectorAll('[data-revenue-up]').forEach(el => el.textContent = s.revenueUp);
  document.querySelectorAll('[data-emails-sent]').forEach(el => el.textContent = s.emailsSent);

  // Projects
  const projContainer = document.getElementById('projectsContainer');
  if (projContainer && s.projects) {
    projContainer.innerHTML = s.projects.map(p => `
      <div class="d-card" style="margin-bottom:14px">
        <div class="fbet" style="margin-bottom:10px">
          <div>
            <div style="font-weight:700;font-size:14px;margin-bottom:4px">${p.name}</div>
            <div style="font-size:12px;color:var(--slate)">Due: ${p.due} · ${p.deliverable}</div>
          </div>
          <span class="status-pill ${p.status === 'active' ? 'sp-active' : p.status === 'pending' ? 'sp-pending' : 'sp-done'}">${p.status}</span>
        </div>
        <div style="font-size:13px;color:rgba(248,250,255,.55);margin-bottom:10px">${p.notes}</div>
        <div class="fbet" style="margin-bottom:4px">
          <span style="font-size:12px;color:var(--slate)">Progress</span>
          <span style="font-size:12px;font-weight:700;color:var(--gold)">${p.progress}%</span>
        </div>
        <div class="progress-bar"><div class="progress-fill" style="width:${p.progress}%"></div></div>
      </div>`).join('');
  }

  // Invoices
  const invContainer = document.getElementById('invoicesContainer');
  if (invContainer && s.invoices) {
    invContainer.innerHTML = `<table style="width:100%;border-collapse:collapse">
      <thead><tr style="border-bottom:1px solid var(--border)">
        ${['Invoice','Date','Amount','Status'].map(h=>`<th style="text-align:left;padding:10px 12px;font-size:12px;color:var(--slate);font-weight:600">${h}</th>`).join('')}
      </tr></thead>
      <tbody>${s.invoices.map(inv => `<tr style="border-bottom:1px solid var(--border)">
        <td style="padding:12px;font-size:13.5px;font-weight:600">${inv.id}</td>
        <td style="padding:12px;font-size:13px;color:var(--slate)">${inv.date}</td>
        <td style="padding:12px;font-size:13.5px;font-weight:700;color:var(--white)">${inv.amount}</td>
        <td style="padding:12px"><span class="status-pill ${inv.status === 'paid' ? 'sp-active' : 'sp-pending'}">${inv.status}</span></td>
      </tr>`).join('')}</tbody>
    </table>`;
  }

  // Messages
  const msgContainer = document.getElementById('messagesContainer');
  if (msgContainer && s.messages) {
    msgContainer.innerHTML = s.messages.map(m => `
      <div style="display:flex;gap:12px;margin-bottom:18px;${m.from === 'You' ? 'flex-direction:row-reverse' : ''}">
        <div style="width:36px;height:36px;border-radius:50%;background:${m.from === 'Tony' ? 'var(--gold-dim)' : 'var(--teal-dim)'};border:2px solid ${m.from === 'Tony' ? 'var(--gold)' : 'var(--teal)'};display:flex;align-items:center;justify-content:center;font-weight:800;font-size:13px;color:${m.from === 'Tony' ? 'var(--gold)' : 'var(--teal)'};flex-shrink:0">${m.from === 'Tony' ? 'T' : s.avatar}</div>
        <div style="max-width:72%">
          <div style="font-size:11px;color:var(--slate);margin-bottom:5px;${m.from === 'You' ? 'text-align:right' : ''}">${m.from} · ${m.date}</div>
          <div style="background:${m.from === 'Tony' ? 'var(--card2)' : 'rgba(10,191,188,.09)'};border:1px solid ${m.from === 'Tony' ? 'var(--border)' : 'rgba(10,191,188,.2)'};border-radius:12px;padding:13px 16px;font-size:13.5px;line-height:1.65;color:rgba(248,250,255,.8)">${m.text}</div>
        </div>
      </div>`).join('');
    // Message input
    document.getElementById('msgSend')?.addEventListener('click', () => {
      const inp = document.getElementById('msgInput');
      const val = inp?.value.trim();
      if (!val) return;
      const newMsg = `<div style="display:flex;gap:12px;margin-bottom:18px;flex-direction:row-reverse">
        <div style="width:36px;height:36px;border-radius:50%;background:var(--teal-dim);border:2px solid var(--teal);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:13px;color:var(--teal);flex-shrink:0">${s.avatar}</div>
        <div style="max-width:72%">
          <div style="font-size:11px;color:var(--slate);margin-bottom:5px;text-align:right">You · Just now</div>
          <div style="background:rgba(10,191,188,.09);border:1px solid rgba(10,191,188,.2);border-radius:12px;padding:13px 16px;font-size:13.5px;line-height:1.65;color:rgba(248,250,255,.8)">${val}</div>
        </div>
      </div>`;
      msgContainer.insertAdjacentHTML('afterbegin', newMsg);
      inp.value = '';
      showToast('Message sent! Tony will reply within 24 hours.');
    });
  }

  // Dash nav
  document.querySelectorAll('.dash-nav-item[data-section]').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.dash-nav-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      document.querySelectorAll('.dash-section').forEach(s => s.style.display = 'none');
      const sec = document.getElementById('sec-' + item.dataset.section);
      if (sec) sec.style.display = 'block';
    });
  });
}

// ── TOAST ──────────────────────────────────────────────────────────
function showToast(msg) {
  let t = document.getElementById('__toast');
  if (!t) {
    t = document.createElement('div');
    t.id = '__toast';
    t.style.cssText = 'position:fixed;bottom:28px;left:50%;transform:translateX(-50%);background:var(--card2);border:1px solid var(--border2);color:var(--white);padding:12px 24px;border-radius:100px;font-family:var(--font-b);font-size:14px;font-weight:600;z-index:9999;opacity:0;transition:opacity .3s;pointer-events:none;white-space:nowrap';
    document.body.appendChild(t);
  }
  t.textContent = msg; t.style.opacity = '1';
  setTimeout(() => { t.style.opacity = '0'; }, 2800);
}
