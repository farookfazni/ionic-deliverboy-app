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
  IonPopover,
  IonList,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import "./Home.css";
import {
  notifications as notificationIcon,
  person as profileIcon,
  cardOutline as paymentIcon,
  pause as holdIcon,
  chatbox as chatIcon,
  logOut as logoutIcon,
  refreshOutline as refreshIcon,
  ellipsisVerticalSharp as dotIcon,
} from "ionicons/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faRetweet } from "@fortawesome/free-solid-svg-icons";
import "../theme/custom.css";
import { auth, firestore } from "../firebase";
import { useAuth } from "../auth";
import { useHistory } from "react-router";

const Home: React.FC = () => {
  const [showPopover, setShowPopover] = useState<{
    open: boolean;
    event: Event | undefined;
  }>({
    open: false,
    event: undefined,
  });
  const { userId } = useAuth();
  const history = useHistory();
  const [entries, setEntries] = useState([]);
  const [Deliverysize, setDeliverysize] = useState<any>();
  const [Holdsize, setHoldsize] = useState<any>();
  const [Returnsize, setReturnsize] = useState<any>();
  const [Newsize, setNewsize] = useState<any>();

  useEffect(() => {
    const entriesRef = firestore
      .collection("users")
      .doc(userId)
      .collection("Details");
    entriesRef.get().then((snapshot) => {
      const entries = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEntries(entries);
    });
  }, [userId]);

  useEffect(() => {
    const Deliverysize = firestore
      .collection("users")
      .doc(userId)
      .collection("Orders")
      .where("Status", "==", "Delivered");
    Deliverysize.get().then((snap) => {
      const Deliverysize = snap.size;
      setDeliverysize(Deliverysize);
    });
  }, [userId]);

  useEffect(() => {
    const Holdsize = firestore
      .collection("users")
      .doc(userId)
      .collection("Orders")
      .where("Status", "==", "Hold");
    Holdsize.get().then((snap) => {
      const Holdsize = snap.size;
      setHoldsize(Holdsize);
    });
  }, [userId]);

  useEffect(() => {
    const Returnsize = firestore
      .collection("users")
      .doc(userId)
      .collection("Orders")
      .where("Status", "==", "Return");
    Returnsize.get().then((snap) => {
      const Returnsize = snap.size;
      setReturnsize(Returnsize);
    });
  }, [userId]);

  useEffect(() => {
    const Newsize = firestore
      .collection("users")
      .doc(userId)
      .collection("Orders")
      .where("Status", "==", "New Order");
    Newsize.get().then((snap) => {
      const Newsize = snap.size;
      setNewsize(Newsize);
    });
  }, [userId]);

  const handlerefresh = async () => {
    history.go(0);
  };

  const buttonclicked = async (e) => {
    setShowPopover({ open: false, event: e.nativeEvent });
  };

  return (
    <IonPage className="dashboard-page">
      <IonHeader>
        <IonToolbar>
          <IonItem mode="md" lines="none" color="deliveryboy">
            <IonTitle>Dashboard</IonTitle>
            <IonPopover
              cssClass="pop-over"
              isOpen={showPopover.open}
              event={showPopover.event}
              onDidDismiss={(e) =>
                setShowPopover({ open: false, event: undefined })
              }
            >
              <IonList mode="ios" color="dark">
                {entries.map((entry) => (
                  <IonItem
                    color="dark"
                    button
                    onClick={buttonclicked}
                    key={entry.id}
                    routerLink={`/my/profile/${entry.id}`}
                  >
                    <IonIcon slot="start" icon={profileIcon} />
                    Profile
                  </IonItem>
                ))}

                <IonItem color="dark" button onClick={() => auth.signOut()}>
                  <IonIcon slot="start" icon={logoutIcon} />
                  LogOut
                </IonItem>
              </IonList>
            </IonPopover>
            <IonButtons>
              <IonButton fill="clear" size="small" onClick={handlerefresh}>
                <IonIcon slot="icon-only" icon={refreshIcon} />
              </IonButton>
              <IonButton
                id="notification-btn"
                fill="clear"
                size="small"
                routerLink="./notificationpage"
              >
                <IonIcon slot="icon-only" icon={notificationIcon} />
                <IonBadge id="notification-badge" color="danger">
                  {Newsize}
                </IonBadge>
              </IonButton>
              <IonButton
                fill="clear"
                size="small"
                onClick={(e) =>
                  setShowPopover({ open: true, event: e.nativeEvent })
                }
              >
                <IonIcon slot="icon-only" icon={dotIcon} />
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
                <IonCardContent>{Deliverysize}</IonCardContent>
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
                <IonCardContent>{Holdsize}</IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="6">
              <IonCard
                button
                mode="md"
                color="danger"
                routerLink="./returnpage"
              >
                <IonCardHeader>
                  <IonCardTitle className="card-font">
                    <FontAwesomeIcon icon={faRetweet} /> Return
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>{Returnsize}</IonCardContent>
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
