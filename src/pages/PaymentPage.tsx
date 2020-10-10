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
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonTitle,
  IonLabel,
  IonIcon,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import "./Home.css";
import { checkmarkCircleSharp as correcticon } from "ionicons/icons";
import {} from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-solid-svg-icons";
import "../theme/custom.css";
import { firestore } from "../firebase";
import { useAuth } from "../auth";
import { Entry, toEntry } from "../model";

interface RouteParams {
  id: string;
}

const PaymentPage: React.FC = () => {
  const { userId } = useAuth();
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const entriesRef = firestore
      .collection("users")
      .doc(userId)
      .collection("Orders")
      .where("Status", "==", "Delivered");
    return entriesRef.onSnapshot(({ docs }) => setEntries(docs.map(toEntry)));
  }, [userId]);

  return (
    <IonPage className="dashboard-page">
      <IonHeader>
        <IonToolbar color="deliverboy">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/my/home" />
          </IonButtons>
          <IonTitle>Payment Recived</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList color="dark" mode="ios">
          <IonItem color="success" mode="ios">
            <strong>Payment Recived</strong>
          </IonItem>
        </IonList>

        {entries.map((entry) => (
          <IonCard
            color="dark"
            button
            key={entry.id}
            routerLink={`./deliveryentrypage/${entry.id}`}
          >
            <IonCardHeader>
              <IonGrid>
                <IonRow>
                  <IonCol size="12">
                    <IonCardTitle mode="md">
                      <strong>{entry?.Name}</strong>
                    </IonCardTitle>
                    <IonCardSubtitle mode="md">
                      {entry?.Address}
                    </IonCardSubtitle>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="8">
                    <IonLabel color="success">
                      <IonIcon icon={correcticon}></IonIcon>
                      {entry?.Status}
                    </IonLabel>
                  </IonCol>
                  <IonCol size="4">
                    <IonLabel>
                      <strong style={{ fontSize: 15, alignContent: "center" }}>
                        Rs. {entry?.Price}
                      </strong>
                    </IonLabel>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardHeader>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default PaymentPage;
