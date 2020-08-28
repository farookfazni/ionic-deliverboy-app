import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonItem,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonTextarea,
  IonButton,
} from "@ionic/react";
import React from "react";
import "./Home.css";
import { 

 } from "ionicons/icons";
import { } from "@fortawesome/react-fontawesome";
import { } from "@fortawesome/free-solid-svg-icons";
import "../theme/custom.css";

const HoldEntryPge: React.FC = () => {
 
  return (
    <IonPage className="dashboard-page">
      <IonHeader>
        <IonToolbar color="deliverboy">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/holdpage" />
          </IonButtons>
          <IonTitle>Update Reason</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
      
        <IonCard color="dark">
          <IonCardHeader>
          </IonCardHeader>
          <IonCardContent>
              <IonItem color="textarea">
                <IonTextarea></IonTextarea>
              </IonItem>
              <IonButton fill="solid" expand="block" >Save</IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
        
    </IonPage>
  );
};

export default HoldEntryPge;
