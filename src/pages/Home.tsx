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
  IonBadge,
} from "@ionic/react";
import React from "react";
import "./Home.css";
import {
  notifications as notificationIcon,
  person as profileIcon,
  cardOutline as paymentIcon,
  pause as holdIcon,
  chatbox as chatIcon,
  logOut as logoutIcon,
} from "ionicons/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faRetweet } from "@fortawesome/free-solid-svg-icons";
import "../theme/custom.css";
import {auth} from '../firebase';

const Home: React.FC = () => {

  return (
    <IonPage className="dashboard-page">
      <IonHeader>
        <IonToolbar>
          <IonItem mode="md" lines="none" color="deliveryboy">
            <IonTitle>Dashboard</IonTitle>
            <IonButtons>
              <IonButton  fill="clear" size="small"  onClick={()=> auth.signOut()}>
                <IonIcon slot="icon-only" icon={logoutIcon} />
              </IonButton>
              <IonButton id="notification-btn" fill="clear" size="small"  routerLink="./notificationpage">
                <IonIcon slot="icon-only" icon={notificationIcon} />
                <IonBadge id="notification-badge" color="danger">1</IonBadge>
              </IonButton>
              <IonButton fill="clear" size="small"  routerLink="./profile">
                <IonIcon slot="icon-only" icon={profileIcon} />
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
          <IonFabButton routerLink="./chatpage">
            <IonIcon icon={chatIcon} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Home;
