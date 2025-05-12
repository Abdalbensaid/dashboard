import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonInput, IonItem, IonLabel, IonButton, IonToast, IonTextarea,
  IonList, IonButtons, IonBackButton
} from '@ionic/react';

const StartProspection: React.FC = () => {
  const [groupLink, setGroupLink] = useState('');
  const [tags, setTags] = useState('');
  const [countries, setCountries] = useState('+225');
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';
  const TOKEN = localStorage.getItem('token');

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${API_URL}/start-prospection`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({
          group_link: groupLink,
          tags: tags.split(',').map(tag => tag.trim()),
          countries: countries.split(',').map(c => c.trim().replace('+', ''))
        }),
      });

      if (!response.ok) throw new Error("Erreur lors du lancement de la prospection");

      setToastMsg("✅ Prospection lancée avec succès !");
    } catch (err: any) {
      setToastMsg(err.message || "Erreur inconnue");
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
          <IonTitle>Lancer une Prospection</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="floating">Lien du groupe Telegram</IonLabel>
            <IonInput
              value={groupLink}
              onIonChange={(e) => setGroupLink(e.detail.value!)}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Tags (séparés par ,)</IonLabel>
            <IonTextarea
              value={tags}
              onIonChange={(e) => setTags(e.detail.value!)}
              rows={2}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Pays (ex: +225,+33)</IonLabel>
            <IonInput
              value={countries}
              onIonChange={(e) => setCountries(e.detail.value!)}
            />
          </IonItem>
        </IonList>

        <IonButton expand="block" onClick={handleSubmit}>
          Lancer la prospection
        </IonButton>

        <IonToast
          isOpen={showToast}
          message={toastMsg}
          duration={2500}
          color={toastMsg.startsWith("✅") ? "success" : "danger"}
          onDidDismiss={() => setShowToast(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default StartProspection;
