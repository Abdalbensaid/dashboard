import React, { useEffect, useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList,
  IonItem, IonLabel, IonSearchbar, IonButtons, IonBackButton,
  IonToast, IonLoading
} from '@ionic/react';
import { getProspects } from '../api';

interface Prospect {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  phone: string;
  tags?: string;
  activity?: string;
}

const Prospects: React.FC = () => {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProspects();
        setProspects(data);
      } catch (err: any) {
        setToastMsg(err.message || 'Erreur lors du chargement');
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
          <IonTitle>Liste des Prospects</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonLoading isOpen={loading} message="Chargement..." />

        <IonToast
          isOpen={!!toastMsg}
          onDidDismiss={() => setToastMsg('')}
          message={toastMsg}
          duration={3000}
          color="danger"
        />

        <IonSearchbar
          placeholder="Recherche par nom, tag ou activité..."
          value={search}
          debounce={300}
          onIonChange={(e) => setSearch(e.detail.value ?? '')}
        />

        <IonList>
          {filtered.length > 0 ? (
            filtered.map((p) => (
              <IonItem key={p.id} routerLink={`/prospects/${p.id}`}>
                <IonLabel>
                  <h2>{p.first_name} {p.last_name}</h2>
                  <p>👤 @{p.username || '—'} | 📱 {p.phone || '—'}</p>
                  {p.tags && <p>🏷 Tags: {p.tags}</p>}
                  {p.activity && <p>🔥 Activité: {p.activity}</p>}
                </IonLabel>
              </IonItem>
            ))
          ) : (
            !loading && (
              <IonItem>
                <IonLabel color="medium">Aucun prospect trouvé</IonLabel>
              </IonItem>
            )
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Prospects;
