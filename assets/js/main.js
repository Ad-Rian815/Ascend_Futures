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
  document.body.style.overflow = mm.classList.contains('open') ? 'hidden' : '';
}
function closeMobile(){
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('mobileMenu').classList.remove('open');
  document.body.style.overflow = '';
}

/* ── SUCCESS MODAL (used by the contact & volunteer forms) ── */
const SUCCESS_MODAL = `
<div class="modal-wrap" id="successModal">
  <div class="modal">
    <div class="modal-icon">🌱</div>
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
  button.nextElementSibling.classList.toggle('open');
}

/* ── NEWSLETTER SUBSCRIPTION (demo only) ── */
function subscribeNewsletter() {
  const emailInput = document.getElementById('newsletterEmail');
  const note = emailInput.closest('.footer-newsletter')
    ? emailInput.closest('.footer-newsletter').querySelector('.newsletter-note') : null;
  const email = emailInput.value.trim();
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if(!ok){
    if(note){ note.textContent = 'Please enter a valid email address.'; note.style.color = 'var(--gold-ink)'; }
    emailInput.focus();
    return;
  }
  if(note){ note.textContent = "Thanks! You're subscribed — watch your inbox."; note.style.color = 'var(--green-bright)'; }
  emailInput.value = '';
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
