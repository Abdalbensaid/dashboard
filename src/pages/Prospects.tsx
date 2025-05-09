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
    IonBackButton
  } from '@ionic/react';
  
  import { useEffect, useState } from 'react';
  
  interface Prospect {
    id: string;
    first_name: string;
    last_name: string;
    username: string;
    phone: string;
    tags?: string;
    activity?: string;
    [key: string]: string | undefined;
  }
  
  
  const Prospects: React.FC = () => {
    const [prospects, setProspects] = useState<Prospect[]>([]);
    const [search, setSearch] = useState("");
  
    useEffect(() => {
      fetch('/assets/members.csv')
        .then(res => res.text())
        .then(data => {
          const lines = data.trim().split("\n");
          const headers = lines[0].split(",");
          const rows = lines.slice(1).map(line => {
            const values = line.split(",");
            return headers.reduce((obj, key, i) => {
              obj[key.trim()] = values[i]?.trim() || undefined;
              return obj;
            }, {} as Prospect);
          });
          setProspects(rows);
        });
    }, []);
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/home" />
            </IonButtons>
            <IonTitle>Liste des Prospects</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonSearchbar
            placeholder="Recherche par nom, tag ou activité..."
            value={search}
            onIonChange={(e) => setSearch(e.detail.value!)}
          />
          <IonList>
            {prospects
              .filter(p =>
                (p.first_name?.toLowerCase().includes(search.toLowerCase()) ||
                 p.tags?.toLowerCase()?.includes(search.toLowerCase()) ||
                 p.activity?.toLowerCase()?.includes(search.toLowerCase()))
              )
              .map((p, index) => (
                <IonItem key={index}>
                  <IonLabel>
                    <h2>{p.first_name} {p.last_name}</h2>
                    <p>👤 @{p.username} | 📱 {p.phone}</p>
                    <p>🏷 Tags : {p.tags || 'Aucun'}</p>
                    <p>🔥 Activité : {p.activity || 'Aucune'}</p>
                  </IonLabel>
                </IonItem>
              ))}
          </IonList>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Prospects;
