/* ── NAV ── */
const nav = document.getElementById('mainNav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });
}

/* ── HAMBURGER ── */
function toggleMobile(){
  const hb = document.getElementById('hamburger');
  const mm = document.getElementById('mobileMenu');
  hb.classList.toggle('open');
  mm.classList.toggle('open');
  const open = mm.classList.contains('open');
  hb.setAttribute('aria-expanded', open ? 'true' : 'false');
  document.body.style.overflow = open ? 'hidden' : '';
}
function closeMobile(){
  const hb = document.getElementById('hamburger');
  hb.classList.remove('open');
  hb.setAttribute('aria-expanded','false');
  document.getElementById('mobileMenu').classList.remove('open');
  document.body.style.overflow = '';
}

/* close the mobile sheet if the viewport grows back to desktop */
window.addEventListener('resize', function(){
  const mm = document.getElementById('mobileMenu');
  if (mm && mm.classList.contains('open') && window.innerWidth > 900) closeMobile();
});

/* ── SUCCESS MODAL (used by the contact & volunteer forms) ── */
const SUCCESS_MODAL = `
<div class="modal-wrap" id="successModal">
  <div class="modal">
    <div class="modal-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="30" height="30" aria-hidden="true"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/></svg></div>
    <h2>Thank You!</h2>
    <p id="successMsg">Thanks for reaching out — we'll be in touch soon.</p>
    <button class="btn-primary" onclick="document.getElementById('successModal').classList.remove('show')" style="width:100%">Close</button>
  </div>
</div>`;
if (!document.getElementById('successModal')) {
  document.body.insertAdjacentHTML('beforeend', SUCCESS_MODAL);
}

/* Close any modal by clicking the dim backdrop or pressing Escape. */
document.addEventListener('click', e => {
  if (e.target.classList && e.target.classList.contains('modal-wrap')) {
    e.target.classList.remove('show');
    document.body.style.overflow = '';
  }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-wrap.show').forEach(m => m.classList.remove('show'));
    document.body.style.overflow = '';
  }
});

/* ── SCROLL REVEAL ── */
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const ro = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in'); });
  },{threshold:0.08, rootMargin:'0px 0px -50px 0px'});
  reveals.forEach(el=>ro.observe(el));
} else {
  reveals.forEach(el=>el.classList.add('in'));
}

/* ── FAQ ACCORDION ── */
document.querySelectorAll('.faq-q').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const item = btn.closest('.faq-item');
    const ans  = item.querySelector('.faq-a');
    const open = item.classList.toggle('open');
    ans.style.maxHeight = open ? ans.scrollHeight + 'px' : 0;
  });
});

/* ── CONTACT FORM (demo only) ── */
function handleContact(e){
  if(e) e.preventDefault();
  const modal = document.getElementById('successModal');
  const msg = document.getElementById('successMsg');
  const name = (document.getElementById('cName')||{}).value || 'Friend';
  if(msg){
    msg.innerHTML = `Thanks <strong>${name}</strong> — your message has been received. Our team will reply within 1–2 business days.`;
  }
  if(modal){ modal.classList.add('show'); }
  const form = document.getElementById('contactForm');
  if(form) form.reset();
  return false;
}

/* ── MOBILE SUBMENU ── */
function toggleMobileSubmenu(button) {
  button.classList.toggle('open');
  button.nextElementSibling.classList.toggle('open');
}

/* ── NEWSLETTER SUBSCRIPTION (Netlify Forms) ── */
function subscribeNewsletter(e) {
  if (e) e.preventDefault();
  const emailInput = document.getElementById('newsletterEmail');
  const box = emailInput.closest('.footer-newsletter');
  const note = box ? box.querySelector('.newsletter-note') : null;
  const email = emailInput.value.trim();
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!ok) {
    if (note) { note.textContent = 'Please enter a valid email address.'; note.style.color = 'var(--gold-ink)'; }
    emailInput.focus();
    return false;
  }
  if (note) { note.textContent = 'Subscribing…'; note.style.color = 'var(--muted)'; }
  const body = new URLSearchParams({ 'form-name': 'newsletter', 'email': email }).toString();
  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body
  }).then(function (res) {
    if (!res.ok) throw new Error('bad status');
    if (note) { note.textContent = "Thanks! You're subscribed — watch your inbox."; note.style.color = 'var(--green-bright)'; }
    emailInput.value = '';
  }).catch(function () {
    if (note) {
      note.textContent = "Couldn't subscribe right now — please email info@ascendfuturesfoundation.org.";
      note.style.color = 'var(--gold-ink)';
    }
  });
  return false;
}

/* ── FINANCIALS TABS ── */
function openTab(event, id){
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  const panel = document.getElementById(id);
  if(panel) panel.classList.add('active');
  if(event && event.currentTarget) event.currentTarget.classList.add('active');
}

/* ── CAREERS JOB PORTAL ── */
let jobDept = 'all';
function setDept(btn){
  jobDept = btn.getAttribute('data-dept');
  document.querySelectorAll('#jobFilters .jf').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  filterJobs();
}
function filterJobs(){
  const box = document.getElementById('jobSearch');
  const q = (box ? box.value : '').toLowerCase().trim();
  let shown = 0;
  document.querySelectorAll('#jobsList .job-card').forEach(card => {
    const dept = card.getAttribute('data-dept');
    const text = (card.getAttribute('data-text') || '');
    const match = (jobDept === 'all' || dept === jobDept) && text.includes(q);
    card.style.display = match ? '' : 'none';
    if(match) shown++;
  });
  const empty = document.getElementById('jobsEmpty');
  if(empty) empty.hidden = shown > 0;
}

/* ── VOLUNTEER SIGN-UP (demo only) ── */
function handleVolunteer(e){
  if(e) e.preventDefault();
  const name = (document.getElementById('vName') || {}).value || 'Friend';
  const msg = document.getElementById('successMsg');
  if(msg) msg.innerHTML = `Thank you, <strong>${name}</strong>! Your volunteer application is in — we'll be in touch about opportunities that fit your skills and interests.`;
  const modal = document.getElementById('successModal');
  if(modal) modal.classList.add('show');
  const f = document.getElementById('volunteerForm'); if(f) f.reset();
  return false;
}

/* ── HIGHLIGHT ACTIVE NAV LINK ── */
(function(){
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a=>{
    const href = a.getAttribute('href') || '';
    if(href === here){ a.style.color = 'var(--gold-ink)'; }
  });
})();


/* ── HERO STAT COUNT-UP (runs on load / when scrolled into view) ── */
(function(){
  var els = document.querySelectorAll('[data-count]');   /* hero stats + impact counters */
  if(!els.length) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function fmt(n){ return n.toLocaleString('en-US'); }
  function run(el){
    if(el.dataset.done) return;
    el.dataset.done = '1';
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    if(reduce){ el.textContent = fmt(target) + suffix; return; }
    var dur = 1600, start = null;
    function step(ts){
      if(start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);           /* ease-out */
      el.textContent = fmt(Math.floor(target * eased)) + suffix;
      if(p < 1){ requestAnimationFrame(step); }
      else { el.textContent = fmt(target) + suffix; }
    }
    requestAnimationFrame(step);
  }
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ run(e.target); io.unobserve(e.target); } });
    }, {threshold: 0.3});
    els.forEach(function(el){ io.observe(el); });
  } else {
    els.forEach(run);
  }
})();


/* ── STATIC RIBBON: shrink text until the row fits on one line ── */
(function(){
  var band = document.querySelector('.marquee-band.static-band');
  if(!band) return;
  var track = band.querySelector('.marquee-track');
  var items = track ? track.querySelectorAll('.m-item') : [];
  if(!items.length) return;

  function fit(){
    // start from the CSS-defined size, then step down only if needed
    items.forEach(function(el){ el.style.fontSize = ''; });
    var size = parseFloat(getComputedStyle(items[0]).fontSize) || 14;
    var floor = 7;                        // never go unreadably small
    var guard = 60;
    while (track.scrollWidth > track.clientWidth && size > floor && guard-- > 0) {
      size -= 0.5;
      items.forEach(function(el){ el.style.fontSize = size + 'px'; });
    }
    // if it still overflows at the floor, drop letter-spacing as a last resort
    if (track.scrollWidth > track.clientWidth) {
      items.forEach(function(el){ el.style.letterSpacing = '0'; });
    }
  }

  if (document.readyState === 'complete') fit();
  else window.addEventListener('load', fit);
  var t;
  window.addEventListener('resize', function(){ clearTimeout(t); t = setTimeout(fit, 120); });
})();


/* ── STAFF BIOGRAPHY POPUP ── */
function openBio(card){
  var modal = document.getElementById('bioModal');
  if(!modal){
    document.body.insertAdjacentHTML('beforeend',
      '<div class="modal-wrap bio-modal" id="bioModal">' +
        '<div class="modal bio-card">' +
          '<button class="bio-close" onclick="closeBio()" aria-label="Close">&times;</button>' +
          '<img class="bio-photo" id="bioPhoto" src="" alt="">' +
          '<div class="bio-text">' +
            '<span class="section-tag" id="bioRole"></span>' +
            '<h3 id="bioName"></h3>' +
            '<p id="bioBody"></p>' +
          '</div>' +
        '</div>' +
      '</div>');
    modal = document.getElementById('bioModal');
  }
  var img = card.querySelector('.person-photo');
  var photo = document.getElementById('bioPhoto');
  if(img){ photo.src = img.getAttribute('src'); photo.alt = img.getAttribute('alt') || ''; photo.hidden = false; }
  else { photo.hidden = true; }
  document.getElementById('bioRole').textContent = card.getAttribute('data-role') || '';
  document.getElementById('bioName').textContent = card.getAttribute('data-name') || '';
  document.getElementById('bioBody').innerHTML = card.getAttribute('data-bio') || '';
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
  var btn = modal.querySelector('.bio-close'); if(btn) btn.focus();
}
function closeBio(){
  var m = document.getElementById('bioModal');
  if(m) m.classList.remove('show');
  document.body.style.overflow = '';
}
