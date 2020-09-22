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
  IonSelectOption,
  IonSelect,
  IonText
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import "./Home.css";
import { location as locationIcon, call as callIcon } from "ionicons/icons";
import {} from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-solid-svg-icons";
import "../theme/custom.css";
import { firestore } from "../firebase";
import { useAuth } from "../auth";
import { Entry, toEntry } from "../model";
import { useParams, useHistory } from "react-router";

interface RouteParams {
  id: string;
}

const ReturnPageEntry: React.FC = () => {
  const { userId } = useAuth();
  const history = useHistory();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [Status, setStatus] = useState();
  const [ error, setError] = useState(false);
  const { id } = useParams<RouteParams>();

  const handleStatus = async () => {
    try{
      const StatusData = {
      Status,
    };
    await firestore
      .collection("users")
      .doc(userId)
      .collection("Orders")
      .doc(id)
      .update(StatusData);
      setError(false);
    history.goBack();

    }
    catch(err){
      setError(true);
      
    }
  };

  useEffect(() => {
    const entriesRef = firestore
      .collection("users")
      .doc(userId)
      .collection("Orders")
      .where("Status", "==", "Return");
    return entriesRef.onSnapshot(({ docs }) => setEntries(docs.map(toEntry)));
  }, [userId]);

  return (
    <IonPage className="dashboard-page">
      <IonHeader>
        <IonToolbar color="deliverboy">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/my/returnpage" />
          </IonButtons>
          <IonTitle>Returns</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {entries.map((entry) => (
          <IonCard color="dark" key={entry.id}>
            <IonCardHeader>
              <IonGrid>
                <IonRow>
                  <IonCol size="10">
                    <IonCardTitle mode="md">
                      <strong>{entry?.Name}</strong>
                    </IonCardTitle>
                    <IonCardSubtitle mode="md">
                      {entry?.Address}
                    </IonCardSubtitle>
                  </IonCol>
                  <IonCol size="2">
                    <IonButtons>
                      <IonButton fill="clear" size="small" mode="ios" routerLink={`/my/location/${entry?.id}`}>
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
                          <strong>+{entry?.Contact_no}</strong>
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
                      <strong>{entry?.Order_id}</strong>
                    </h2>
                  </IonLabel>
                </IonItem>
                <IonItem color="dark" mode="ios">
                  <IonLabel mode="ios">
                    <p style={{ fontSize: 10 }}>Price :</p>
                    <h2>
                      <strong>Rs {entry?.Price}</strong>
                    </h2>
                  </IonLabel>
                </IonItem>
                <IonItem color="dark" mode="ios">
                  <IonLabel mode="ios">
                    <p style={{ fontSize: 10 }}>Reason for Return :</p>
                    <h2>
                      <strong> {entry?.Reason}</strong>
                    </h2>
                  </IonLabel>
                </IonItem>
              </IonList>
              <IonItem color="deliveryboy">
                <IonLabel>Set Status</IonLabel>
                <IonSelect
                  interface="action-sheet"
                  placeholder="Select One"
                  onIonChange={(event) => setStatus(event.detail.value)}
                >
                  <IonSelectOption value={Status}>Delivered</IonSelectOption>
                  <IonSelectOption value={Status}>Hold</IonSelectOption>
                  <IonSelectOption value={Status}>Return</IonSelectOption>
                  <IonSelectOption value={Status}>New Order</IonSelectOption>
                </IonSelect>
              </IonItem>

              {error && <IonText color="danger">Select Status</IonText>}
                <IonButton
                  
                  fill="solid"
                  expand="block"
                  color="primary"
                  routerLink={`/my/holdentrypage/${entry.id}`}
                >
                  Update Reason
                </IonButton>
              
                
              <IonButton
                fill="solid"
                expand="block"
                color="color1"
                onClick={handleStatus}
              >
                Submit
              </IonButton>
            </IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default ReturnPageEntry;
