import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonLabel, IonTextarea, IonButton, IonToast,
  IonInput, IonBackButton, IonButtons
} from '@ionic/react';

const Campaign: React.FC = () => {
  const [message, setMessage] = useState('');
  const [tag, setTag] = useState('');
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';
  const token = localStorage.getItem('token');

  const handleSend = async () => {
    try {
      const response = await fetch(`${API_URL}/campaigns`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tag, message })
      });

      if (!response.ok) throw new Error('Erreur lors de l’envoi de la campagne');

      setIsSuccess(true);
      setToastMsg('✅ Campagne lancée avec succès');
      setMessage('');
      setTag('');
    } catch (err: any) {
      setIsSuccess(false);
      setToastMsg(err.message || '❌ Erreur inconnue');
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
          <IonTitle>Nouvelle Campagne</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Tag cible (ex: dev, marketing)</IonLabel>
          <IonInput value={tag} onIonChange={(e) => setTag(e.detail.value!)} />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Message à envoyer</IonLabel>
          <IonTextarea rows={6} value={message} onIonChange={(e) => setMessage(e.detail.value!)} />
        </IonItem>

        <IonButton expand="block" onClick={handleSend}>Lancer la campagne</IonButton>

        <IonToast
          isOpen={showToast}
          message={toastMsg}
          duration={2500}
          color={isSuccess ? 'success' : 'danger'}
          onDidDismiss={() => setShowToast(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default Campaign;
