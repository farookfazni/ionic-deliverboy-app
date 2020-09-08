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
  IonTitle,
  IonButton,
  IonLabel,
  IonList,
  IonItem,
  IonCardContent,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import "./Home.css";
import {
  location as locationIcon,
  call as callIcon,
} from "ionicons/icons";
import {} from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-solid-svg-icons";
import "../theme/custom.css";
import { Entry, toEntry } from "../model";
import { useParams, useHistory } from "react-router";
import { useAuth } from "../auth";
import { firestore } from "../firebase";

interface RouteParams {
  id: string;
}

const DeliveryEntryPge: React.FC = () => {
  const { userId } = useAuth();
  const history = useHistory();
  const [Status, setStatus] = useState();
  const { id } = useParams<RouteParams>();
  const [entry, setEntry] = useState<Entry>();

  const handleStatus = async () => {
    const StatusData = {
      Status,
    };
     await firestore
      .collection("users")
      .doc(userId)
      .collection("Orders")
      .doc(id)
      .update(StatusData);

    history.goBack();
  };

  useEffect(() => {
    const entryRef = firestore
      .collection("users")
      .doc(userId)
      .collection("Orders")
      .doc(id);
    entryRef.get().then((doc) => setEntry(toEntry(doc)));
  }, [userId, id]);

  return (
    <IonPage className="dashboard-page">
      <IonHeader>
        <IonToolbar color="deliverboy">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/my/delivery" />
          </IonButtons>
          <IonTitle></IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonCard color="dark">
          <IonCardHeader>
            <IonGrid>
              <IonRow>
                <IonCol size="10">
                  <IonCardTitle mode="md">
                    <strong>{entry?.Name}</strong>
                  </IonCardTitle>
                  <IonCardSubtitle mode="md">{entry?.Address}</IonCardSubtitle>
                </IonCol>
                <IonCol size="2">
                  <IonButtons>
                    <IonButton fill="clear" size="small" mode="ios">
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
      </IonContent>
    </IonPage>
  );
};

export default DeliveryEntryPge;
