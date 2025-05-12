import React from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonLabel, IonButton, IonToast
} from '@ionic/react';
import { useState } from 'react';

const AddProspect: React.FC = () => {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    username: '',
    phone: '',
    tags: '',
    activity: '',
  });
  const [toast, setToast] = useState(false);

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const submitProspect = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://127.0.0.1:8000/api/prospects', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error('Erreur');
      setToast(true);
      setForm({ first_name: '', last_name: '', username: '', phone: '', tags: '', activity: '' });
    } catch (e) {
      alert("Erreur lors de l'envoi");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ajouter un Prospect</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {['first_name', 'last_name', 'username', 'phone', 'tags', 'activity'].map((field) => (
          <IonItem key={field}>
            <IonLabel position="floating">{field.replace('_', ' ')}</IonLabel>
            <IonInput value={form[field as keyof typeof form]} onIonChange={(e) => handleChange(field, e.detail.value!)} />
          </IonItem>
        ))}
        <IonButton expand="block" onClick={submitProspect}>Enregistrer</IonButton>
        <IonToast isOpen={toast} message="✅ Prospect ajouté" duration={2000} onDidDismiss={() => setToast(false)} />
      </IonContent>
    </IonPage>
  );
};

export default AddProspect;
