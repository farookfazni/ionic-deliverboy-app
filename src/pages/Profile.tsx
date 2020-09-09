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
import React, { useState, useEffect } from "react";
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
import { firestore } from "../firebase";
import { useAuth } from "../auth";


const Profile: React.FC = () => {
  const { userId } = useAuth();
  const [entries, setEntries] = useState([]);
  useEffect(() => {
    const entriesRef = firestore
      .collection("users").doc(userId).collection("Details");
      entriesRef.get().then((snapshot) => {
        const entries = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEntries(entries);
      });
  }, [userId]);

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
          {entries.map((entry) => (<IonList mode="ios" lines="inset" key={entry.id}>
              <IonItem color="dark" mode="ios"  >
                <IonLabel mode="ios">
                  <p style={{fontSize:10}}>Full Name</p>
                  <h2><strong>{entry.full_name}</strong></h2>
                  </IonLabel>
                  <IonIcon slot="end" icon={nameIcon} color="deliverboy"/>
              </IonItem>
              <IonItem color="dark" mode="ios">
                <IonLabel mode="ios">
                  <p style={{fontSize:10}}>Mobile Number</p>
                  <h2><strong>+94 {entry.mobile_num}</strong></h2>
                  </IonLabel>
                  <IonIcon slot="end" icon={callIcon} color="deliverboy"/>
              </IonItem>
              <IonItem color="dark" mode="ios">
                <IonLabel mode="ios">
                  <p style={{fontSize:10}}>Blood Group</p>
                  <h2><strong>{entry.blood_group}</strong></h2>
                  </IonLabel>
                  <IonIcon slot="end" icon={bloodIcon} color="deliverboy"/>
              </IonItem>
              <IonItem color="dark" mode="ios">
                <IonLabel mode="ios">
                  <p style={{fontSize:10}}>Email</p>
                  <h2><strong>{entry.email}</strong></h2>
                  </IonLabel>
                  <IonIcon slot="end" icon={mailIcon} color="deliverboy"/>
              </IonItem>
            </IonList>
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
