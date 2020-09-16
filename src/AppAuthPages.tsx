import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Delivery from "./pages/Delivery";
import DeliveryEntryPge from "./pages/DeliveryEntryPage";
import HoldPage from "./pages/HoldPage";
import HoldEntryPge from "./pages/HoldEntryPage";
import NotificationPage from "./pages/NotificationPage";
import ChatPage from "./pages/ChatPage";
import { useAuth } from "./auth";
import HoldPageEntry from "./pages/HoldPageEntry";



const AppAuthPages: React.FC = () => {
  const { loggedIn }= useAuth();
  if(!loggedIn){
    return <Redirect to="/loginpage"/>;
  }
  return (
    <IonRouterOutlet>
      <Route exact path="/my/home">
        <Home />
      </Route>
      <Route exact path="/my/profile">
        <Profile />
      </Route>
      <Route exact path="/my/delivery">
        <Delivery />
      </Route>
      <Route exact path="/my/deliveryentrypage/:id">
        <DeliveryEntryPge />
      </Route>
      <Route exact path="/my/holdpageentry/:id">
        <HoldPageEntry />
      </Route>
      <Route exact path="/my/holdpage">
        <HoldPage />
      </Route>
      <Route exact path="/my/chatpage">
        <ChatPage />
      </Route>
      <Route exact path="/my/notificationpage">
        <NotificationPage />
      </Route>
      <Route exact path="/my/holdentrypage/:id">
        <HoldEntryPge />
      </Route>
      <Route exact path="/" render={() => <Redirect to="/my/home" />} />
    </IonRouterOutlet>
  );
};

export default AppAuthPages;
