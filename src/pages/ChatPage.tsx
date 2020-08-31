import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonItem,
  IonInput,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
  IonButton,
} from "@ionic/react";
import React from "react";
import "./Home.css";
import { send as sendIcon } from "ionicons/icons";
import {} from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-solid-svg-icons";
import "../theme/custom.css";

const ChatPage: React.FC = () => {
  return (
    <IonPage className="dashboard-page">
      <IonHeader>
        <IonToolbar color="deliverboy">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Chat</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol size="10">
              <IonItem color="dark">
                <IonInput></IonInput>
              </IonItem>
            </IonCol>
            <IonCol size="2">
              <IonButton fill="clear" color="deliveryboy">
                <IonIcon slot="icon-only"  icon={sendIcon} color="deliveryboy" />
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ChatPage;
