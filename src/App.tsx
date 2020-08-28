import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Delivery from './pages/Delivery';
import DeliveryEntryPge from './pages/DeliveryEntryPage';
import HoldPage from './pages/HoldPage';
import HoldEntryPge from './pages/HoldEntryPage';


const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home" ><Home/></Route>
        <Route exact path="/profile" ><Profile/></Route>
        <Route exact path="/delivery" ><Delivery/></Route>
        <Route exact path="/deliveryentrypage" ><DeliveryEntryPge/></Route>
        <Route exact path="/holdpage" ><HoldPage/></Route>
        <Route exact path="/holdentrypage" ><HoldEntryPge/></Route>
        <Route exact path="/" render={() => <Redirect to="/home" />} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
