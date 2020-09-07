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
  IonText,
} from "@ionic/react";
import React, { useState } from "react";
import "./Home.css";
import {} from "ionicons/icons";
import {} from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-solid-svg-icons";
import "../theme/custom.css";
import { Redirect } from "react-router";
import { useAuth } from "../auth";
import { auth } from "../firebase";

interface Proops {
  loggedIn: boolean;
  onlogin: () => void;
}

const LoginPage: React.FC<Proops> = ({ onlogin }) => {
  const { loggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ error, setError] = useState(false);

  const handlelogin = async () => {
    try {
      const credintial = await auth.signInWithEmailAndPassword(email, password);
      console.log("credential:", credintial);
      onlogin();
    } catch (err) {
      setError(true);
      console.log("error : ", err);
    }
  };

  if (loggedIn) {
    return <Redirect to="/my/home" />;
  }
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
                <IonLabel position="floating">Email</IonLabel>
                <IonInput
                  type="email"
                  value={email}
                  onIonChange={(event) => setEmail(event.detail.value)}
                />
              </IonItem>
              <IonItem color="dark">
                <IonLabel position="floating">Password</IonLabel>
                <IonInput
                  type="password"
                  value={password}
                  onIonChange={(event) => setPassword(event.detail.value)}
                />
              </IonItem>
              {error && <IonText color="danger">Invalid credential</IonText>}
              <IonButton expand="block" onClick={handlelogin}>
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
