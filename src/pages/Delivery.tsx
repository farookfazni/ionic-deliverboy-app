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
import React from "react";
import "./Home.css";
import { location as locationIcon } from "ionicons/icons";
import {} from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-solid-svg-icons";
import "../theme/custom.css";

const Delivery: React.FC = () => {
  return (
    <IonPage className="dashboard-page">
      <IonHeader>
        <IonToolbar color="deliverboy">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Today's Deliveries</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList color="dark" mode="ios">
          <IonItem color="dark" mode="ios" ><strong>To be Delivered</strong></IonItem>
        </IonList>
        <IonCard color="dark" button routerLink="./deliveryentrypage">
          <IonCardHeader>
            <IonGrid>
              <IonRow>
                <IonCol size="10">
                  <IonCardTitle mode="md">
                    <strong>Mr Nathan D.</strong>
                  </IonCardTitle>
                  <IonCardSubtitle mode="md">
                    122B Backers St,United Kingdom
                  </IonCardSubtitle>
                </IonCol>
                <IonCol size="2">
                <IonIcon icon={locationIcon} size="large" />
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardHeader>
        </IonCard>

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
