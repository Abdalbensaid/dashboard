// ✅ Étape 1 : `api.ts` centralisé
const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';
const getToken = () => localStorage.getItem('token');

export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error('Connexion échouée');
  return await res.json();
}

export async function register(name: string, email: string, password: string) {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  if (!res.ok) throw new Error("Inscription échouée");
  return await res.json();
}

export async function getProspects() {
  const res = await fetch(`${API_URL}/prospects`, {
    headers: {
      'Authorization': `Bearer ${getToken()}`,
      'Content-Type': 'application/json'
    }
  });
  if (!res.ok) throw new Error("Erreur chargement prospects");
  return await res.json();
}

export async function getProspect(id: number | string) {
  const res = await fetch(`${API_URL}/prospects/${id}`, {
    headers: {
      'Authorization': `Bearer ${getToken()}`,
      'Content-Type': 'application/json'
    }
  });
  if (!res.ok) throw new Error("Erreur chargement prospect");
  return await res.json();
}

export async function launchCampaign(tag: string, message: string) {
  const res = await fetch(`${API_URL}/campaigns`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ tag, message })
  });
  if (!res.ok) throw new Error("Erreur lancement campagne");
  return await res.json();
}

export async function scrapeGroup(group_link: string, keywords: string[], countries: string[]) {
  const res = await fetch(`${API_URL}/scrape`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ group_link, keywords, countries })
  });
  if (!res.ok) throw new Error("Erreur scraping");
  return await res.json();
}

export async function startProspection(group_link: string, tags: string[], countries: string[]) {
  const res = await fetch(`${API_URL}/start-prospection`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ group_link, tags, countries })
  });
  if (!res.ok) throw new Error("Erreur prospection");
  return await res.json();
}
