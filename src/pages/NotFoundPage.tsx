import {
  IonContent,
  IonPage,
} from "@ionic/react";
import React from "react";
import "./Home.css";
import {} from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-solid-svg-icons";
import "../theme/custom.css";

const NotFoundPage: React.FC = () => {
  return (
    <IonPage className="dashboard-page">
      <IonContent>
          Page not found.
      </IonContent>
    </IonPage>
  );
};

export default NotFoundPage;
