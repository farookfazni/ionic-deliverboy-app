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
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { IonButton, IonLoading } from "@ionic/react";
import { Geolocation, Geoposition } from "@ionic-native/geolocation";


const containerStyle = {
  width: "400px",
  height: "900px",
};

interface RouteParams {
  id: string;
}

const LocationPage: React.FC = () => {
  const { userId } = useAuth();
  const { id } = useParams<RouteParams>();
  const [entry, setEntry] = useState<Entry>();
  const [loading, setloading] = useState<boolean>(false);
  const [position, setposition] = useState<Geoposition>();
  const [button, setbutton] = useState(true);

  

  const getloaction = async () => {
    setloading(true);
    try {
      const position = await Geolocation.getCurrentPosition();
      setposition(position);
      setloading(false);
      setbutton(false);
    } catch (e) {
      setloading(false);
    }
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
            <IonBackButton defaultHref="/my/home" />
          </IonButtons>
          <IonTitle>Google Map</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="GeoMap">
          <GoogleMap
            mapContainerStyle={containerStyle}
            zoom={16}
            center={{ lat: parseFloat(entry?.Latitude), lng: parseFloat(entry?.Longitude) }}
            options={{ zoomControl: true }}
            onClick={(event) => {
              console.log(event);
            }}
          >
            <Marker
              position={{ lat:  parseFloat(entry?.Latitude), lng: parseFloat(entry?.Longitude) }}
            />
            {position && (
              <Marker
                position={{
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                }}
              />
            )}

            <DirectionsRenderer />
          </GoogleMap>
        </div>
        {button && (
          <div className="geoFooter">
            <IonLoading
              isOpen={loading}
              message={"Getting Direction"}
              onDidDismiss={() => setloading(false)}
            />
            <IonButton
              expand="block"
              fill="solid"
              color="primary"
              onClick={getloaction}
            >
              Get Direction
            </IonButton>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default LocationPage;
