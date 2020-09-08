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
import { location as locationIcon } from "ionicons/icons";
import {} from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-solid-svg-icons";
import "../theme/custom.css";
import { useAuth } from "../auth";
import { firestore } from "../firebase";
import { Entry, toEntry } from "../model";

const Delivery: React.FC = () => {
  const { userId } = useAuth();
  const [entries, setEntries] = useState<Entry[]>([]);
  useEffect(() => {
    const entriesRef = firestore
      .collection("users")
      .doc(userId)
      .collection("Orders");
    return entriesRef.onSnapshot(({ docs }) => setEntries(docs.map(toEntry)));
  }, [userId]);
  return (
    <IonPage className="dashboard-page">
      <IonHeader>
        <IonToolbar color="deliverboy">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/my/home" />
          </IonButtons>
          <IonTitle>Today's Deliveries</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList color="dark" mode="ios">
          <IonItem color="dark" mode="ios" ><strong>To be Delivered</strong></IonItem>
        </IonList>
        {entries.map((entry) => (<IonCard color="dark" button key={entry.id} routerLink={`./deliveryentrypage/${entry.id}`}>
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

        <IonList color="dark" mode="ios">
          <IonItem color="dark" mode="ios" ><strong>Delivered</strong></IonItem>
        </IonList>
        <IonCard color="dark" button>
          <IonCardHeader>
            <IonGrid>
              <IonRow>
                <IonCol size="10">
                  <IonCardTitle mode="md">
                    <strong>Miss Arya Stark.</strong>
                  </IonCardTitle>
                  <IonCardSubtitle mode="md">
                    122B Winterfell,Westros
                  </IonCardSubtitle>
                </IonCol>
                <IonCol size="2">
                <IonIcon icon={locationIcon} size="large" />
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardHeader>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Delivery;
