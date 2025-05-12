import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonSearchbar,
  IonButtons,
  IonBackButton,
  IonToast,
  IonLoading,
} from '@ionic/react';

interface Prospect {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  phone: string;
  tags?: string;
  activity?: string;
}

const Prospections: React.FC = () => {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';
  const TOKEN = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const TOKEN = localStorage.getItem('token'); // 🔐 récupère

        const res = await fetch(`${API_URL}/prospects`, {
          headers: {
            Authorization: `Bearer ${TOKEN}`, // ✅ OBLIGATOIRE
            'Content-Type': 'application/json'
          }
        });

        if (!res.ok) {
          throw new Error('Échec de chargement des prospects');
        }

        const data = await res.json();
        setProspects(data);
      } catch (err: any) {
        setToastMsg(err.message || 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filtered = prospects.filter((p) =>
    [p.first_name, p.last_name, p.username, p.tags, p.activity]
      .filter(Boolean)
      .some((val) => val!.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Historique des Prospections</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonLoading isOpen={loading} message="Chargement..." />
        <IonToast
          isOpen={!!toastMsg}
          onDidDismiss={() => setToastMsg(null)}
          message={toastMsg || ''}
          duration={2500}
          color="danger"
        />

        <IonSearchbar
          value={search}
          onIonChange={(e) => setSearch(e.detail.value!)}
          placeholder="Rechercher un prospect..."
        />

        <IonList>
          {filtered.map((p) => (
            <IonItem key={p.id}>
              <IonLabel>
                <h2>{p.first_name} {p.last_name}</h2>
                <p>@{p.username} | 📱 {p.phone}</p>
                <p>🏷 Tags : {p.tags || '—'} | 🔥 {p.activity}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Prospections;
