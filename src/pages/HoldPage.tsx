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
  IonItemSliding,
  IonLabel,
  IonItemOptions,
  IonItemOption,
  IonCardContent,
  IonActionSheet,
} from "@ionic/react";
import React, { useState } from "react";
import "./Home.css";
import {
  location as locationIcon,
  call as callIcon,
  trash,
  pause as holdIcon,
  bicycle as deliveryIcon,
  returnUpBack as returnIcon,
  close as closeIcon,
} from "ionicons/icons";
import {} from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-solid-svg-icons";
import "../theme/custom.css";

const HoldPage: React.FC = () => {
  const [showActionSheet, setShowActionSheet] = useState(false);
  return (
    <IonPage className="dashboard-page">
      <IonHeader>
        <IonToolbar color="deliverboy">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
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
        <IonCard color="dark">
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
                  <IonButtons>
                    <IonButton fill="clear" size="small" mode="ios">
                      <IonIcon icon={locationIcon} size="large" />
                    </IonButton>
                  </IonButtons>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="3"></IonCol>
                <IonCol size="9">
                  <IonItemSliding>
                    <IonItem button mode="ios" color="dark" detail={false}>
                      <IonIcon icon={callIcon} color="primary" size="small" />
                      <IonLabel color="primary">
                        <strong>+94 779794020</strong>
                      </IonLabel>
                    </IonItem>
                    <IonItemOptions side="start">
                      <IonItemOption color="success">Call</IonItemOption>
                    </IonItemOptions>
                    <IonItemOptions side="end">
                      <IonItemOption color="primary">Message</IonItemOption>
                    </IonItemOptions>
                  </IonItemSliding>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardHeader>
          <IonCardContent>
            <IonList mode="ios" lines="inset" className="entrypage-items">
              <IonItem color="dark" mode="ios">
                <IonLabel mode="ios">
                  <p style={{ fontSize: 10 }}>OrderID :</p>
                  <h2>
                    <strong>MH01182245</strong>
                  </h2>
                </IonLabel>
              </IonItem>
              <IonItem color="dark" mode="ios">
                <IonLabel mode="ios">
                  <p style={{ fontSize: 10 }}>Price :</p>
                  <h2>
                    <strong>Rs 100.00</strong>
                  </h2>
                </IonLabel>
              </IonItem>
              <IonItem color="dark" mode="ios">
                <IonLabel mode="ios">
                  <p style={{ fontSize: 10 }}>Reason for Hold :</p>
                  <h2>
                    <strong>Customer is Not Answering Phone</strong>
                  </h2>
                </IonLabel>
              </IonItem>
            </IonList>

            <IonButton fill="solid" expand="block" routerLink="./holdentrypage">Update Reason</IonButton>
            <IonButton
              fill="solid"
              expand="block"
              color="color1"
              onClick={() => setShowActionSheet(true)}
            >
              Update Status
            </IonButton>
            <IonActionSheet
              isOpen={showActionSheet}
              onDidDismiss={() => setShowActionSheet(false)}
              buttons={[
                {
                  text: "Delete",
                  role: "destructive",
                  icon: trash,
                  handler: () => {
                    console.log("Delete clicked");
                  },
                },
                {
                  text: "Delivered",
                  icon: deliveryIcon,
                  handler: () => {
                    console.log("Delivered clicked");
                  },
                },
                {
                  text: "Hold",
                  icon: holdIcon,
                  handler: () => {
                    console.log("Hold clicked");
                  },
                },
                {
                  text: "Return",
                  icon: returnIcon,
                  handler: () => {
                    console.log("Return clicked");
                  },
                },
                {
                  text: "Cancel",
                  icon: closeIcon,
                  role: "cancel",
                  handler: () => {
                    console.log("Cancel clicked");
                  },
                },
              ]}
            ></IonActionSheet>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default HoldPage;
