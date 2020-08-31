import {
  IonContent,
  IonPage,
  IonHeader,
  IonTitle,
  IonImg,
  IonItem,
  IonLabel,
  IonInput,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButton,
} from "@ionic/react";
import React from "react";
import "./Home.css";
import {} from "ionicons/icons";
import {} from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-solid-svg-icons";
import "../theme/custom.css";

const LoginPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonTitle></IonTitle>
      </IonHeader>
      <IonContent>
        <div className="loginpage-up">
          <IonImg className="loginpage-up-img" src="./assets/deliveryboy.png" />
          <IonCard color="dark" mode="ios">
            <IonCardHeader>
              <IonCardTitle className="logintitle">Login</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem color="dark">
                <IonLabel position="floating">UserName</IonLabel>
                <IonInput></IonInput>
              </IonItem>
              <IonItem color="dark">
                <IonLabel position="floating">Password</IonLabel>
                <IonInput type="password"></IonInput>
              </IonItem>
              <IonButton expand="block">
                Login
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
