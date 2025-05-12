import React, { useEffect, useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonLabel, IonButtons, IonBackButton, IonToast, IonLoading
} from '@ionic/react';
import { useParams } from 'react-router-dom';

interface Prospect {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  phone: string;
  tags?: string;
  activity?: string;
}

const ProspectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [prospect, setProspect] = useState<Prospect | null>(null);
  const [loading, setLoading] = useState(true);
  const [toastError, setToastError] = useState('');

  const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';
  const TOKEN = localStorage.getItem('token');

  useEffect(() => {
    const fetchProspect = async () => {
      try {
        const res = await fetch(`${API_URL}/prospects/${id}`, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            'Accept': 'application/json',
          },
        });

        if (!res.ok) throw new Error('Erreur de chargement');

        const data = await res.json();
        setProspect(data);
      } catch (err: any) {
        setToastError(err.message || 'Erreur de chargement');
      } finally {
        setLoading(false);
      }
    };

    fetchProspect();
  }, [id, API_URL, TOKEN]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/prospects" />
          </IonButtons>
          <IonTitle>Détail du Prospect</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {loading ? (
          <IonLoading isOpen={true} message="Chargement..." />
        ) : prospect ? (
          <>
            <IonItem><IonLabel><strong>Nom :</strong> {prospect.first_name} {prospect.last_name}</IonLabel></IonItem>
            <IonItem><IonLabel><strong>Username :</strong> @{prospect.username || '—'}</IonLabel></IonItem>
            <IonItem><IonLabel><strong>Téléphone :</strong> {prospect.phone || '—'}</IonLabel></IonItem>
            <IonItem><IonLabel><strong>Tags :</strong> {prospect.tags || '—'}</IonLabel></IonItem>
            <IonItem><IonLabel><strong>Activité :</strong> {prospect.activity || '—'}</IonLabel></IonItem>
          </>
        ) : (
          <IonItem><IonLabel>Prospect introuvable.</IonLabel></IonItem>
        )}

        <IonToast
          isOpen={!!toastError}
          message={toastError}
          duration={2500}
          color="danger"
          onDidDismiss={() => setToastError('')}
        />
      </IonContent>
    </IonPage>
  );
};

export default ProspectDetail;
