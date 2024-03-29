import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonButton,
  IonInput,
  IonLoading,
} from "@ionic/react";
import React, { useState, useEffect, useRef } from "react";
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
import { firestore, storage } from "../firebase";
import { useAuth } from "../auth";
import { useHistory, useParams } from "react-router";
import {PopoverComponent} from './PopoverComponent';

async function savePicture(blobUrl) {
  const pictureRef = storage.ref(`/profilepic/pictures/${Date.now()}`);
  const responce = await fetch(blobUrl);
  const blob = await responce.blob();
  const snapshot = await pictureRef.put(blob);
  const url = await snapshot.ref.getDownloadURL();
  console.log("saved Picture:", url);
  return url;
}

interface RouteParams {
  id: string;
}

const Profile: React.FC = () => {
  const { userId } = useAuth();
  const history = useHistory();
  const [full_name, setName] = useState<any>();
  const [mobile_num, setNumber] = useState<any>("");
  const [blood_group, setBloodgroup] = useState<any>("");
  const [email, setemail] = useState<any>("");
  const [entries, setEntries] = useState([]);
  const { id } = useParams<RouteParams>();
  const [editnme, setEditnme] = useState<any>(false);
  const [labelnme, setlabelnme] = useState<any>(true);

  const [editImg, setEditImg] = useState<any>(false);
  const [labelImg, setlabelImg] = useState<any>(true);
  const [loading, setloading] = useState(false);

  const [editnumb, setEditnumb] = useState<any>(false);
  const [labelnumb, setlabelnumb] = useState<any>(true);
  const [edit3, setEdit3] = useState<any>(false);
  const [label3, setlabel3] = useState<any>(true);
  const [edit4, setEdit4] = useState<any>(false);
  const [label4, setlabel4] = useState<any>(true);
  const fileInputRef = useRef<HTMLInputElement>();
  const [PictureUrl, setPictureUrl] = useState("/assets/placeholder.png");

  const handlefilechange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files.length > 0) {
      const file = event.target.files.item(0);
      const PictureUrl = URL.createObjectURL(file);
      setPictureUrl(PictureUrl);
      setEditImg(true);
      setlabelImg(false);
    }
  };

  const editname = () => {
    setEditnme(true);
    setlabelnme(false);
  };
  const editnum = () => {
    setEditnumb(true);
    setlabelnumb(false);
  };
  const editblood = () => {
    setEdit3(true);
    setlabel3(false);
  };
  const editemail = () => {
    setEdit4(true);
    setlabel4(false);
  };

  const editimage = async () => {
    const pictRef = firestore
      .collection("users")
      .doc(userId)
      .collection("Details")
      .doc(id);
    const picData = {
      PictureUrl,
    };
    setloading(true);
    if (PictureUrl.startsWith("blob:")) {
      picData.PictureUrl = await savePicture(PictureUrl);
    }
    const addpic = await pictRef.update(picData);
    console.log("added: ", addpic);
    setloading(false);
    history.go(0);
  };

  const savename = async () => {
    try {
      const nameData = {
        full_name,
      };
      await firestore
        .collection("users")
        .doc(userId)
        .collection("Details")
        .doc(id)
        .update(nameData);
      history.go(0);
      setEditnme(false);
      setlabelnme(true);
    } catch (err) {
      console.log(err);
    }
  };

  const savenum = async () => {
    try {
      const numData = {
        mobile_num,
      };
      await firestore
        .collection("users")
        .doc(userId)
        .collection("Details")
        .doc(id)
        .update(numData);
      history.go(0);
      setEditnumb(false);
      setlabelnumb(true);
    } catch (err) {
      console.log(err);
    }
  };

  const saveblood = async () => {
    try {
      const bloodData = {
        blood_group,
      };
      await firestore
        .collection("users")
        .doc(userId)
        .collection("Details")
        .doc(id)
        .update(bloodData);
      history.go(0);
      setEdit3(false);
      setlabel3(true);
    } catch (err) {
      console.log(err);
    }
  };

  const saveemail = async () => {
    try {
      const emailData = {
        email,
      };
      await firestore
        .collection("users")
        .doc(userId)
        .collection("Details")
        .doc(id)
        .update(emailData);
      history.go(0);
      setEdit4(false);
      setlabel4(true);
    } catch (err) {
      console.log(err);
    }
  };
  const cancel = async () => {
    history.go(0);
  }

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
  useEffect(
    () => () => {
      if (PictureUrl.startsWith("blob:")) {
        URL.revokeObjectURL(PictureUrl);
      }
    },
    [PictureUrl]
  );

  return (
    <IonPage className="profile-page">
      <IonHeader>
        <IonToolbar color="deliverboy">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/my/home" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {labelImg && (
          <div className="profile-img">
            {entries.map((entry) => (
              <img
                key={entry.id}
                className="avatr-img"
                src={entry.PictureUrl}
                alt=""
                style={{ cursor: "pointer" }}
                onClick={() => fileInputRef.current.click()}
              />
            ))}
            <input
              type="file"
              accept="image/*"
              hidden
              ref={fileInputRef}
              onChange={handlefilechange}
            />
          </div>
        )}

        {editImg && (
          <div className="profile-img">
            
              <input
                type="file"
                accept="image/*"
                hidden
                ref={fileInputRef}
                onChange={handlefilechange}
              />
              <img className="avatr-img"
                src={PictureUrl}
                alt=""
                style={{ cursor: "pointer" }}
                onClick={() => fileInputRef.current.click()}
              />
            
            <IonButton fill="clear" mode="ios" onClick={editimage} color="dark">
              save
            </IonButton>
            <IonLoading isOpen={loading} />
          </div>
        )}

        <div className="dashboard">
          <div className="profile-list">
            {entries.map((entry) => (
              <IonList mode="ios" lines="inset" key={entry.id}>
                {labelnme && (
                  <IonItem color="dark" mode="ios">
                    <IonLabel mode="ios">
                      <p style={{ fontSize: 10 }}>Full Name</p>
                      <h2>
                        <strong>{entry.full_name}</strong>
                        <IonButton fill="clear" mode="ios" onClick={editname}>
                          <IonIcon
                            slot="icon-only"
                            icon={editIcon}
                            size="small"
                          />
                        </IonButton>
                      </h2>
                    </IonLabel>
                    <IonIcon slot="end" icon={nameIcon} color="deliverboy" />
                  </IonItem>
                )}
                {editnme && (
                  <IonItem color="dark" mode="ios">
                    <IonInput
                      value={full_name}
                      onIonChange={(event) => setName(event.detail.value)}
                    />
                    <IonButton fill="clear" mode="ios" onClick={cancel}>
                      cancel
                    </IonButton>
                    <IonButton fill="clear" mode="ios" onClick={savename}>
                      Save
                    </IonButton>
                  </IonItem>
                )}

                {labelnumb && (
                  <IonItem color="dark" mode="ios">
                    <IonLabel mode="ios">
                      <p style={{ fontSize: 10 }}>Mobile Number</p>
                      <h2>
                        <strong>+94 {entry.mobile_num}</strong>
                        <IonButton fill="clear" mode="ios" onClick={editnum}>
                          <IonIcon
                            slot="icon-only"
                            icon={editIcon}
                            size="small"
                          />
                        </IonButton>
                      </h2>
                    </IonLabel>
                    <IonIcon slot="end" icon={callIcon} color="deliverboy" />
                  </IonItem>
                )}
                {editnumb && (
                  <IonItem color="dark" mode="ios">
                    <IonInput
                      value={mobile_num}
                      onIonChange={(event) => setNumber(event.detail.value)}
                    />
                    <IonButton fill="clear" mode="ios" onClick={cancel}>
                      cancel
                    </IonButton>
                    <IonButton fill="clear" mode="ios" onClick={savenum}>
                      Save
                    </IonButton>
                  </IonItem>
                )}

                {label3 && (
                  <IonItem color="dark" mode="ios">
                    <IonLabel mode="ios">
                      <p style={{ fontSize: 10 }}>Blood Group</p>
                      <h2>
                        <strong>{entry.blood_group}</strong>
                        <IonButton fill="clear" mode="ios" onClick={editblood}>
                          <IonIcon
                            slot="icon-only"
                            icon={editIcon}
                            size="small"
                          />
                        </IonButton>
                      </h2>
                    </IonLabel>
                    <IonIcon slot="end" icon={bloodIcon} color="deliverboy" />
                  </IonItem>
                )}
                {edit3 && (
                  <IonItem color="dark" mode="ios">
                    <IonInput
                      value={blood_group}
                      onIonChange={(event) => setBloodgroup(event.detail.value)}
                    />
                    <IonButton fill="clear" mode="ios" onClick={cancel}>
                      cancel
                    </IonButton>
                    <IonButton fill="clear" mode="ios" onClick={saveblood}>
                      Save
                    </IonButton>
                  </IonItem>
                )}

                {label4 && (
                  <IonItem color="dark" mode="ios">
                    <IonLabel mode="ios">
                      <p style={{ fontSize: 10 }}>Email</p>
                      <h2>
                        <strong>{entry.email}</strong>
                        <IonButton fill="clear" mode="ios" onClick={editemail}>
                          <IonIcon
                            slot="icon-only"
                            icon={editIcon}
                            size="small"
                          />
                        </IonButton>
                      </h2>
                    </IonLabel>
                    <IonIcon slot="end" icon={mailIcon} color="deliverboy" />
                  </IonItem>
                )}
                {edit4 && (
                  <IonItem color="dark" mode="ios">
                    <IonInput
                      value={email}
                      onIonChange={(event) => setemail(event.detail.value)}
                    />
                    <IonButton fill="clear" mode="ios" onClick={cancel}>
                      cancel
                    </IonButton>
                    <IonButton fill="clear" mode="ios" onClick={saveemail}>
                      Save
                    </IonButton>
                  </IonItem>
                )}
                <PopoverComponent/>
              </IonList>
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
