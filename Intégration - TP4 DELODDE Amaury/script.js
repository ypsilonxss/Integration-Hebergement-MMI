// TP4 — Fetch & API
// Complétez ce fichier en suivant les exercices du sujet.

// ===========================================
// TEMPS 1 — JSON local (exercices 1.1 à 1.3)
// ===========================================

async function chargerProjets() {
  const reponse = await fetch('./data.json');
  const donnees = await reponse.json();
  return donnees.projets;
}

// Utilisation
chargerProjets().then((projets) => {
  console.log(projets); // Vérifier dans la console
  afficherProjets(projets);
});

const conteneur = document.querySelector('#projets-liste');

async function chargerEtAfficher() {
  // État : chargement
  conteneur.innerHTML = '<p class="loading">Chargement...</p>';

  try {
    const reponse = await fetch('./data.json');

    if (!reponse.ok) {
      throw new Error(`Erreur HTTP : ${reponse.status}`);
    }

    const donnees = await reponse.json();

    // État : succès
    afficherProjets(donnees.projets);

  } catch (erreur) {
    // État : erreur
    conteneur.innerHTML = `<p class="error">Impossible de charger les données : ${erreur.message}</p>`;
    console.error(erreur);
  }
}

function afficherProjets(projets) {
  conteneur.innerHTML = '';
  projets.forEach((projet) => {
    const carte = document.createElement('article');
    carte.classList.add('carte');
    carte.innerHTML = `
      <h3>${projet.titre}</h3>
      <p>${projet.description}</p>
      <p class="annee">${projet.annee}</p>
      <div class="tags">
        ${projet.tags.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
    `;
    conteneur.append(carte);
  });
}

// Lancer au chargement
chargerEtAfficher();


// ===========================================
// TEMPS 2 — API distante (exercices 2.1 à 2.3)
// ===========================================

const conteneurApi = document.querySelector('#api-liste');

async function chargerPays() {
  conteneurApi.innerHTML = '<p class="loading">Chargement...</p>';

  try {
    const reponse = await fetch('https://restcountries.com/v3.1/region/europe');
    
    if (!reponse.ok) {
      throw new Error(`Erreur HTTP : ${reponse.status}`);
    }

    const pays = await reponse.json();

    console.log(pays);

    conteneurApi.innerHTML = '';
    
    pays.forEach((p) => {
      const carte = document.createElement('article');
      carte.classList.add('carte');
      carte.innerHTML = `
        <h3>${p.flag} ${p.name.common}</h3>
        <p>Capitale : ${p.capital ? p.capital[0] : 'Inconnue'}</p>
        <p>Population : ${p.population.toLocaleString()}</p>
      `;
      conteneurApi.append(carte);
    });

  } catch (erreur) {
    conteneurApi.innerHTML = '<p class="error">Impossible de charger les pays.</p>';
    console.error(erreur);
  }
}

chargerPays();




// ===========================================
// TEMPS 3 — Recherche + API (exercices 3.1 et 3.2)
// ===========================================

const inputRecherche = document.querySelector('#recherche');
const conteneurRecherche = document.querySelector('#recherche-resultats');

inputRecherche.addEventListener('input', async () => {
  const terme = inputRecherche.value.trim();

  if (terme.length < 2) {
    conteneurRecherche.innerHTML = '<p>Tapez au moins 2 caractères.</p>';
    return;
  }

  conteneurRecherche.innerHTML = '<p class="loading">Recherche...</p>';

  try {
    const reponse = await fetch(`https://restcountries.com/v3.1/name/${terme}`);

    if (!reponse.ok) {
      conteneurRecherche.innerHTML = '<p>Aucun résultat.</p>';
      return;
    }

    const paysTrouves = await reponse.json();

    conteneurRecherche.innerHTML = '';
    
    paysTrouves.forEach((p) => {
      const carte = document.createElement('article');
      carte.classList.add('carte');
      carte.innerHTML = `
        <h3>${p.flag} ${p.name.common}</h3>
        <p>Capitale : ${p.capital ? p.capital[0] : 'Inconnue'}</p>
        <p>Population : ${p.population.toLocaleString()}</p>
      `;
      conteneurRecherche.append(carte);
    });

  } catch (erreur) {
    conteneurRecherche.innerHTML = '<p class="error">Erreur de recherche.</p>';
  }
});


// ===========================================
// TEMPS 4 — Bonus (exercices 4.1 à 4.3)
// ===========================================

let tousPays = [];

async function chargerPays() {
  const apiConteneur = document.querySelector('#api-liste');
  apiConteneur.innerHTML = '<p class="loading">Chargement...</p>';

  try {
    const reponse = await fetch('https://restcountries.com/v3.1/region/europe');
    tousPays = await reponse.json(); // On stocke dans la variable globale
    
    afficherPays(tousPays, apiConteneur);
  } catch (erreur) {
    apiConteneur.innerHTML = '<p class="error">Erreur de chargement.</p>';
  }
}

function afficherPays(liste, cible) {
  cible.innerHTML = '';
  liste.forEach(p => {
    const carte = document.createElement('article');
    carte.classList.add('carte');
    carte.innerHTML = `
      <h3>${p.flag} ${p.name.common}</h3>
      <p>Population : ${p.population.toLocaleString()}</p>
    `;
    cible.append(carte);
  });
}

const apiConteneur = document.querySelector('#api-liste');

// Tri par population (Décroissant)
document.querySelector('#tri-pop').addEventListener('click', () => {
  // [...tousPays] crée une copie pour ne pas modifier l'original
  const tries = [...tousPays].sort((a, b) => b.population - a.population);
  afficherPays(tries, apiConteneur);
});

// Tri par nom (Alphabétique)
document.querySelector('#tri-nom').addEventListener('click', () => {
  const tries = [...tousPays].sort((a, b) =>
    a.name.common.localeCompare(b.name.common)
  );
  afficherPays(tries, apiConteneur);
});

// Filtre > 10 millions
document.querySelector('#filtre-grand').addEventListener('click', () => {
  const grands = tousPays.filter(p => p.population > 10_000_000);
  afficherPays(grands, apiConteneur);
});

// Lancement initial
chargerPays();
