import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { documentTextOutline, personAddOutline, peopleOutline } from 'ionicons/icons'; // Correction ici
import PrivateRoute from './components/PrivateRoute';

import Prospects from './pages/Prospects';
import Login from './pages/Login';
import AddProspect from './pages/AddProspect';
import Prospections from './pages/Prospections'; 
import StartProspection from './pages/StartProspection';
import ProspectDetail from './pages/ProspectDetail';
import Campaign from './pages/Campaign';
import Register from './pages/Register';


import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/flex-utils.css';

import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
           <PrivateRoute exact path="/prospects" component={Prospects} />
            <PrivateRoute exact path="/prospections" component={Prospections} />
            <PrivateRoute exact path="/add" component={AddProspect} />
            <PrivateRoute exact path="/prospects/:id" component={ProspectDetail} />
            <PrivateRoute exact path="/start-prospection" component={StartProspection} />
            <PrivateRoute exact path="/campaign" component={Campaign} />

          <Route exact path="/">
            <Redirect to="/prospects" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="prospects" href="/prospects">
            <IonIcon icon={peopleOutline} />
            <IonLabel>Prospects</IonLabel>
          </IonTabButton>
          <IonTabButton tab="prospections" href="/prospections">
            <IonIcon icon={documentTextOutline} /> {/* Maintenant correct */}
            <IonLabel>Historique</IonLabel>
          </IonTabButton>
          <IonTabButton tab="add" href="/add">
            <IonIcon icon={personAddOutline} />
            <IonLabel>Ajouter</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;