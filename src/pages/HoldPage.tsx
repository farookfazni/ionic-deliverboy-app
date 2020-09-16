import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonTitle,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import "./Home.css";
import {
  location as locationIcon,
} from "ionicons/icons";
import {} from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-solid-svg-icons";
import "../theme/custom.css";
import { firestore } from "../firebase";
import { useAuth } from "../auth";
import { Entry, toEntry } from "../model";


interface RouteParams {
  id: string;
}

const HoldPage: React.FC = () => {
  const { userId } = useAuth();
  const [entries, setEntries] = useState<Entry[]>([]);
  
  useEffect(() => {
    const entriesRef = firestore
      .collection("users")
      .doc(userId)
      .collection("Orders").where("Status", "==", "Hold");
    return entriesRef.onSnapshot(({ docs }) => setEntries(docs.map(toEntry)));
  }, [userId]);

  return (
    <IonPage className="dashboard-page">
      <IonHeader>
        <IonToolbar color="deliverboy">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/my/home" />
          </IonButtons>
          <IonTitle>Deliveries On Hold</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList color="dark" mode="ios">
          <IonItem color="warning" mode="ios">
            <strong>On Hold</strong>
          </IonItem>
        </IonList>

        {entries.map((entry) => (<IonCard color="dark" button key={entry.id} routerLink={`./holdpageentry/${entry.id}`}>
          <IonCardHeader>
            <IonGrid>
              <IonRow>
                <IonCol size="10">
                  <IonCardTitle mode="md">
                    <strong>{entry?.Name}</strong>
                  </IonCardTitle>
                  <IonCardSubtitle mode="md">
                  {entry?.Address}
                  </IonCardSubtitle>
                </IonCol>
                <IonCol size="2">
                <IonIcon icon={locationIcon} size="large" />
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardHeader>
        </IonCard>))}
      </IonContent>
    </IonPage>
  );
};

export default HoldPage;
