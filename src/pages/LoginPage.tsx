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
  IonLoading,
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


interface Error {
  loading: boolean;
  error: boolean;
  message?: string;
}

const LoginPage: React.FC = () => {
  const { loggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<Error>({
    loading: false,
    error: false,
    message: undefined,
  });

  const handlelogin = async () => {
    try {
      setStatus({ loading: true, error: false, message: undefined });
      const credintial = await auth.signInWithEmailAndPassword(email, password);
      console.log("credential:", credintial);
    } catch (err) {
      const message = err.message.length > 0 ? err.message : "Invalid Crendial";
      setStatus({ loading: false, error: true, message });
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
              {status.error && (
                <IonText color="danger">{status.message}</IonText>
              )}
              <IonButton expand="block" onClick={handlelogin}>
                Login
              </IonButton>
              <IonLoading isOpen={status.loading} />
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
