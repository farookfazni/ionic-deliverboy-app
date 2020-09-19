import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import "./Home.css";
import {} from "ionicons/icons";
import {} from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-solid-svg-icons";
import "../theme/custom.css";
import { useAuth } from "../auth";
import { useParams } from "react-router";
import { firestore } from "../firebase";
import { Entry, toEntry } from "../model";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px",
};

interface RouteParams {
  id: string;
}

const LocationPage: React.FC = () => {
  const { userId } = useAuth();
  const { id } = useParams<RouteParams>();
  const [entry, setEntry] = useState<Entry>();

  useEffect(() => {
    const entryRef = firestore
      .collection("users")
      .doc(userId)
      .collection("Orders")
      .doc(id);
    entryRef.get().then((doc) => setEntry(toEntry(doc)));
  }, [userId, id]);

  useLoadScript({
    googleMapsApiKey: "AIzaSyDTbIMNNDPyFjHjuUBpTGv3UJcHR_rNaXI",
  });
  
  return (
    <IonPage className="dashboard-page">
      <IonHeader>
        <IonToolbar color="deliverboy">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/my/home" />
          </IonButtons>
          <IonTitle>Google Map</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div style={{ width: "100vw", height: "100vh" }}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            zoom={10}
            center={{ lat: entry?.Latitude, lng: entry?.Longitude }}
            options={{ zoomControl: true }}
            onClick={(event) => {
              console.log(event);
            }}
          >
            <Marker position={{ lat: entry?.Latitude, lng: entry?.Longitude }} />
          </GoogleMap>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LocationPage;
