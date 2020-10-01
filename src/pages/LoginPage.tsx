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
  IonLoading,
  IonToast,
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
  sucsess: boolean;
  message?: string;
}

const LoginPage: React.FC = () => {
  const { loggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showToast1, setShowToast1] = useState(false);
  const [status, setStatus] = useState<Error>({
    loading: false,
    error: false,
    sucsess: false,
    message: undefined,
  });

  const handlelogin = async () => {
    try {
      setStatus({
        loading: true,
        sucsess: true,
        error: false,
        message: undefined,
      });
      const credintial = await auth.signInWithEmailAndPassword(email, password);
      console.log("credential:", credintial);
    } catch (err) {
      const message = err.message.length > 0 ? err.message : "Invalid Crendial";
      setStatus({ loading: false, sucsess: false, error: true, message });
      console.log("error : ", err);
      setShowToast1(true);
    }
  };

  const forgetPassword = async () => {
    await auth
      .sendPasswordResetEmail(email)
      .then((user) => {
        const message = "please Check your email";
        setStatus({ loading: false, sucsess: true, error: false, message });
        setShowToast1(true);
      })
      .catch((e) => {
        const message = e.message.length > 0 ? e.message : "Invalid Crendial";
        setStatus({ loading: false, sucsess: false, error: true, message });
        console.log(e);
        setShowToast1(true);
      });
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

              <IonButton expand="block" onClick={handlelogin}>
                Login
              </IonButton>
              <IonButton
                style={{ margin: 0 }}
                expand="block"
                fill="clear"
                onClick={forgetPassword}
              >
                <p style={{ fontSize: 10 }}>Forget Password</p>
              </IonButton>
              <IonLoading isOpen={status.loading} />
              {status.error && (
                <IonToast
                  isOpen={showToast1}
                  color="danger"
                  onDidDismiss={() => setShowToast1(false)}
                  message={status.message}
                  duration={3500}
                />
              )}
              {status.sucsess && (
                <IonToast
                  isOpen={showToast1}
                  color="success"
                  onDidDismiss={() => setShowToast1(false)}
                  message={status.message}
                  duration={3500}
                />
              )}
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
