import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonLabel, IonInput, IonButton, IonToast
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { login } from '../api';

const Login: React.FC = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);
  const history = useHistory();

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleLogin = async () => {
    try {
      const data = await login(form.email, form.password);
      localStorage.setItem('token', data.access_token); // Enregistre le token

      history.push('/prospects'); // Redirection
    } catch (err: any) {
      setToastMsg(err.message || 'Erreur de connexion');
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Connexion</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput type="email" value={form.email} onIonChange={(e) => handleChange('email', e.detail.value!)} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Mot de passe</IonLabel>
          <IonInput type="password" value={form.password} onIonChange={(e) => handleChange('password', e.detail.value!)} />
        </IonItem>

        <IonButton expand="block" onClick={handleLogin}>Se connecter</IonButton>
        <IonButton expand="block" fill="clear" routerLink="/register">Créer un compte</IonButton>

        <IonToast
          isOpen={showToast}
          message={toastMsg}
          duration={2000}
          color="danger"
          onDidDismiss={() => setShowToast(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
