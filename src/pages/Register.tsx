// src/pages/Register.tsx
import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonLabel, IonInput, IonButton, IonToast
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { register } from '../api'; // 🧠 Appel API centralisé

const Register: React.FC = () => {
  const history = useHistory();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);

  // 🔁 Met à jour un champ du formulaire
  const handleChange = (key: keyof typeof form, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleRegister = async () => {
    try {
      await register(form.name, form.email, form.password);
      setToastMsg('✅ Compte créé avec succès !');
      history.push('/login');
    } catch (err: any) {
      setToastMsg(err.message || 'Erreur inconnue');
    } finally {
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Créer un compte</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* Nom */}
        <IonItem>
          <IonLabel position="floating">Nom</IonLabel>
          <IonInput value={form.name} onIonChange={(e) => handleChange('name', e.detail.value!)} />
        </IonItem>

        {/* Email */}
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput type="email" value={form.email} onIonChange={(e) => handleChange('email', e.detail.value!)} />
        </IonItem>

        {/* Mot de passe */}
        <IonItem>
          <IonLabel position="floating">Mot de passe</IonLabel>
          <IonInput type="password" value={form.password} onIonChange={(e) => handleChange('password', e.detail.value!)} />
        </IonItem>

        <IonButton expand="block" onClick={handleRegister}>S’inscrire</IonButton>

        <IonToast
          isOpen={showToast}
          message={toastMsg}
          duration={2500}
          onDidDismiss={() => setShowToast(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default Register;
