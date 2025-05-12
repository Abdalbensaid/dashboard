import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonInput, IonItem, IonLabel, IonButton, IonToast, IonTextarea,
  IonButtons, IonBackButton
} from '@ionic/react';

const ScrapeForm: React.FC = () => {
  const [groupLink, setGroupLink] = useState('');
  const [keywords, setKeywords] = useState('');
  const [country, setCountry] = useState('+225');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';
  const token = localStorage.getItem('token');

  const handleScrape = async () => {
    try {
      const response = await fetch(`${API_URL}/scrape`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          group_link: groupLink,
          keywords: keywords.split(',').map(k => k.trim()),
          countries: [country.replace('+', '').trim()]
        })
      });

      if (!response.ok) throw new Error('Erreur lors du scraping');

      setIsSuccess(true);
      setToastMessage('✅ Scraping démarré avec succès !');
    } catch (err: any) {
      setToastMessage(err.message || 'Erreur inconnue');
      setIsSuccess(false);
    } finally {
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/prospects" />
          </IonButtons>
          <IonTitle>Lancer un Scraping</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Lien du groupe Telegram</IonLabel>
          <IonInput value={groupLink} onIonChange={e => setGroupLink(e.detail.value!)} />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Mots-clés (séparés par virgule)</IonLabel>
          <IonTextarea value={keywords} onIonChange={e => setKeywords(e.detail.value!)} />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Pays (ex: +225)</IonLabel>
          <IonInput value={country} onIonChange={e => setCountry(e.detail.value!)} />
        </IonItem>

        <IonButton expand="block" onClick={handleScrape}>Démarrer le scraping</IonButton>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
          color={isSuccess ? 'success' : 'danger'}
        />
      </IonContent>
    </IonPage>
  );
};

export default ScrapeForm;
