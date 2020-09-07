import {
  IonContent,
  IonPage,
  IonImg,
  IonAvatar,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonButton,
} from "@ionic/react";
import React from "react";
import "./Home.css";
import { 
  person as nameIcon,
  call as callIcon,
  water as bloodIcon,
  mail as mailIcon,
  pencil as editIcon,
 } from "ionicons/icons";
import {} from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-solid-svg-icons";
import "../theme/custom.css";

const Profile: React.FC = () => {
  return (
    <IonPage className="profile-page">
      <IonHeader>
        <IonToolbar color="deliverboy">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/my/home" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent id="dashboard-content">
        <div className="profile-img">
          <IonAvatar>
            <IonImg src="/assets/Me.jpg" />
          </IonAvatar>
          <IonButton fill="clear" mode="ios">
            <IonIcon className="profile-edit-icon" slot="icon-only" icon={editIcon} size="small" color="dark"/>
          </IonButton>
        </div>

        <div className="dashboard">
          <div className="profile-list">
            <IonList mode="ios" lines="inset">
              <IonItem color="dark" mode="ios">
                <IonLabel mode="ios">
                  <p style={{fontSize:10}}>Full Name</p>
                  <h2><strong>Fazni Farook</strong></h2>
                  </IonLabel>
                  <IonIcon slot="end" icon={nameIcon} color="deliverboy"/>
              </IonItem>
              <IonItem color="dark" mode="ios">
                <IonLabel mode="ios">
                  <p style={{fontSize:10}}>Mobile Number</p>
                  <h2><strong>+94 757502298</strong></h2>
                  </IonLabel>
                  <IonIcon slot="end" icon={callIcon} color="deliverboy"/>
              </IonItem>
              <IonItem color="dark" mode="ios">
                <IonLabel mode="ios">
                  <p style={{fontSize:10}}>Blood Group</p>
                  <h2><strong>A+</strong></h2>
                  </IonLabel>
                  <IonIcon slot="end" icon={bloodIcon} color="deliverboy"/>
              </IonItem>
              <IonItem color="dark" mode="ios">
                <IonLabel mode="ios">
                  <p style={{fontSize:10}}>Email</p>
                  <h2><strong>faznifarook@gmail.com</strong></h2>
                  </IonLabel>
                  <IonIcon slot="end" icon={mailIcon} color="deliverboy"/>
              </IonItem>
            </IonList>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
