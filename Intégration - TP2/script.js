
// 1. Sélectionner les éléments
const bouton = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');

// 2. Écouter le clic
bouton.addEventListener('click', () => {
  // 3. Toggle la classe
  menu.classList.toggle('is-open');

  const isOpen = menu.classList.contains('is-open');
  bouton.setAttribute('aria-expanded', isOpen);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.classList.contains('is-open')) {
    menu.classList.remove('is-open');
    bouton.focus(); // remettre le focus sur le bouton
  }
});

const btnOpen = document.querySelector('.modal-open');
const btnClose = document.querySelector('.modal-close');
const modal = document.querySelector('.modal');

function ouvrirModale() {
  modal.classList.add('is-visible');
  modal.setAttribute('aria-hidden', 'false');
}

function fermerModale() {
  modal.classList.remove('is-visible');
  modal.setAttribute('aria-hidden', 'true');
  btnOpen.focus();
}

btnOpen.addEventListener('click', ouvrirModale);
btnClose.addEventListener('click', fermerModale);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('is-visible')) {
    fermerModale();
  }
});

modal.addEventListener('click', (event) => {
  // Si le clic est sur le fond (la modale elle-même), pas sur son contenu
  if (event.target === modal) {
    fermerModale();
  }
});

const questions = document.querySelectorAll('.faq-question');

questions.forEach((question) => {
  question.addEventListener('click', () => {
    const reponse = question.nextElementSibling;
    const estDejaOuverte = reponse.classList.contains('is-visible');

    // Fermer toutes les réponses
    document.querySelectorAll('.faq-answer').forEach((r) => {
      r.classList.remove('is-visible');
    });

    // Si elle n'était pas ouverte, l'ouvrir
    if (!estDejaOuverte) {
      reponse.classList.add('is-visible');
    }
  });
});

const btnTheme = document.querySelector('#theme-toggle');

btnTheme.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  
  const isDark = document.body.classList.contains('dark');
  btnTheme.textContent = isDark ? '☀️ Clair' : '🌙 Sombre';
});