import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonItem,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonCardHeader,
  IonFab,
  IonFabButton,
} from "@ionic/react";
import React from "react";
import "./Home.css";
import {
  refresh as refreshIcon,
  notifications as notificationIcon,
  person as profileIcon,
  cardOutline as paymentIcon,
  pause as holdIcon,
  chatbox as chatIcon,
} from "ionicons/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faRetweet } from "@fortawesome/free-solid-svg-icons";
import "../theme/custom.css";
import { useHistory } from "react-router";

const Home: React.FC = () => {
  const history = useHistory();
  const handleRefresh = () =>{
    history.go(0);
  }

  return (
    <IonPage className="dashboard-page">
      <IonHeader>
        <IonToolbar>
          <IonItem mode="md" lines="none" color="deliveryboy">
            <IonTitle>Dashboard</IonTitle>
            <IonButtons>
              <IonButton fill="clear" size="small" mode="ios" onClick={handleRefresh}>
                <IonIcon slot="end" icon={refreshIcon} />
              </IonButton>
              <IonButton fill="clear" size="small" mode="ios" routerLink="./welcomepage">
                <IonIcon slot="end" icon={notificationIcon} />
              </IonButton>
              <IonButton fill="clear" size="small" mode="ios" routerLink="./profile">
                <IonIcon slot="end" icon={profileIcon} />
              </IonButton>
            </IonButtons>
            
          </IonItem>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid className="ion-padding">
          <IonRow>
            <IonCol size="6">
              <IonCard button mode="md" color="primary" routerLink="./delivery">
                <IonCardHeader>
                  <IonCardTitle className="card-font">
                    <FontAwesomeIcon icon={faTruck} /> Delivery
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent></IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="6">
              <IonCard button mode="md" color="success">
                <IonCardHeader>
                  <IonCardTitle className="card-font">
                    <IonIcon icon={paymentIcon} /> Payment
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent></IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="6">
              <IonCard button mode="md" color="warning" routerLink="./holdpage">
                <IonCardHeader>
                  <IonCardTitle className="card-font">
                    <IonIcon icon={holdIcon} /> Hold
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent></IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="6">
              <IonCard button mode="md" color="danger">
                <IonCardHeader>
                  <IonCardTitle className="card-font">
                    <FontAwesomeIcon icon={faRetweet} /> Return
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent></IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton>
            <IonIcon icon={chatIcon} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Home;
