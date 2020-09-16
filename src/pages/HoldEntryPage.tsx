import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonItem,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonTextarea,
  IonButton,
} from "@ionic/react";
import React, { useState } from "react";
import "./Home.css";
import { 

 } from "ionicons/icons";
import { } from "@fortawesome/react-fontawesome";
import { } from "@fortawesome/free-solid-svg-icons";
import "../theme/custom.css";
import { useAuth } from "../auth";
import { useHistory, useParams } from "react-router";
import { firestore } from "../firebase";

interface RouteParams {
  id: string;
}

const HoldEntryPge: React.FC = () => {

  const { userId } = useAuth();
  const history = useHistory();
  const [Reason, setReason] = useState<any>();
  const { id } = useParams<RouteParams>();
  

  const handleReason = async () => {
    const ReasonData = {
      Reason,
    };
     await firestore
      .collection("users")
      .doc(userId)
      .collection("Orders")
      .doc(id)
      .update(ReasonData);

    history.goBack();
  };
 
  return (
    <IonPage className="dashboard-page">
      <IonHeader>
        <IonToolbar color="deliverboy">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/my/holdpage" />
          </IonButtons>
          <IonTitle>Update Reason</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
      
        <IonCard color="dark">
          <IonCardHeader>
          </IonCardHeader>
          <IonCardContent>
              <IonItem color="textarea">
                <IonTextarea  value={Reason} onIonChange={(event)=> setReason(event.detail.value)}/>
              </IonItem>
              <IonButton fill="solid" expand="block" onClick={handleReason} >Save</IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
        
    </IonPage>
  );
};

export default HoldEntryPge;
