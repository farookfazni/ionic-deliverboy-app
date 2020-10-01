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
  IonButton,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import "./Home.css";
import { location as locationIcon } from "ionicons/icons";
import {} from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-solid-svg-icons";
import "../theme/custom.css";
import { firestore } from "../firebase";
import { Entry, toEntry } from "../model";
import { useAuth } from "../auth";

const NotificationPage: React.FC = () => {
  const { userId } = useAuth();
  const [entries, setEntries] = useState<Entry[]>([]);
  useEffect(() => {
    const entriesRef = firestore
      .collection("users")
      .doc(userId)
      .collection("Orders").where("Status", "==", "New Order");
    return entriesRef.onSnapshot(({ docs }) => setEntries(docs.map(toEntry)));
  }, [userId]);
  return (
    <IonPage className="dashboard-page">
      <IonHeader>
        <IonToolbar color="deliverboy">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/my/home" />
          </IonButtons>
          <IonTitle>Notifications</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList color="dark" mode="ios">
          <IonItem color="dark" mode="ios" ><strong>New Orders</strong></IonItem>
        </IonList>
        {entries.map((entry) => (<IonCard color="dark"  key={entry.id}>
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
            <IonButton expand="block" routerLink={`./deliveryentrypage/${entry.id}`}>
              Get The Order
            </IonButton>
          </IonCardHeader>
        </IonCard>))}
      </IonContent>
    </IonPage>
  );
};

export default NotificationPage;
