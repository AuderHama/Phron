const picker = document.getElementById('language');
const articles = Array.from(document.querySelectorAll('[data-language]'));
const params = new URLSearchParams(location.search);
function selectLanguage(code) {
  const active = articles.find(article => article.dataset.language === code) || articles[0];
  const language = active.dataset.language;
  articles.forEach(article => { article.hidden = article !== active; });
  picker.value = language;
  document.documentElement.lang = language;
  document.documentElement.dir = active.dir;
  const title = (active.querySelector('.section-heading h2') || active.querySelector('.hero h1')).textContent;
  document.title = `${title} — Phron`;
  const labels = {en:'Choose language',ar:'اختر اللغة',es:'Elegir idioma',de:'Sprache wählen',pt:'Escolher idioma',it:'Scegli la lingua',ckb:'زمان هەڵبژێرە',da:'Vælg sprog'};
  document.getElementById('language-label').textContent = labels[language];
  const footer = document.getElementById('footer-link');
  footer.textContent = active.querySelector('.back, .secondary').textContent.replace(' →', '');
  footer.href = active.querySelector('.back, .secondary').getAttribute('href');
  document.querySelector('.brand').href = `./?lang=${language}`;
  document.querySelectorAll('.contact').forEach(contact => contact.removeAttribute('id'));
  const contact = active.querySelector('.contact');
  if (contact) contact.id = 'contact';
}
selectLanguage(params.get('lang') || 'en');
picker.addEventListener('change', () => {
  selectLanguage(picker.value);
  const url = new URL(location.href);
  url.searchParams.set('lang', picker.value);
  history.replaceState(null, '', url);
});
