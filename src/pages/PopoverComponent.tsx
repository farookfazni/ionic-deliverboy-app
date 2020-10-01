import React, { useState } from "react";
import {
  IonPopover,
  IonButton,
  IonItem,
  IonInput,
  IonList,
  IonLabel,
  IonLoading,
  IonToast,
} from "@ionic/react";
import { auth } from "firebase";
import { useHistory } from "react-router";

interface Error {
  loading: boolean;
  error: boolean;
  sucsess:boolean;
  message?: string;
}

export const PopoverComponent: React.FC = () => {
  const history = useHistory();
  const [showPopover, setShowPopover] = useState(false);
  const [oldPassword, setOldPassword] = useState<any>();
  const [newPassword, setNewPassword] = useState<any>();
  const [showToast1, setShowToast1] = useState(false);
  const [status, setStatus] = useState<Error>({
    loading: false,
    error: false,
    sucsess : false,
    message: undefined,
  });

  const changePassword = async () => {
    const user = auth().currentUser;
    // reauthenticating
    const cred = auth.EmailAuthProvider.credential(user.email, oldPassword);
    user
      .reauthenticateWithCredential(cred)
      .then(() => {
        // updating password
        user.updatePassword(newPassword);
        const message = "Password changed Successfully";
        setStatus({ loading: false,sucsess:true, error: false, message });
        setShowToast1(true);
      })
      .catch((err) => {
        const message =
          err.message.length > 0 ? err.message : "Invalid Crendial";
        setStatus({ loading: false,sucsess:false, error: true, message });
        setShowToast1(true);
        console.log(err);
      });
  };

  const cancel = async () => { history.go(0); };

  return (
    <>
      <IonPopover
        isOpen={showPopover}
        cssClass="my-custom-class"
        onDidDismiss={(e) => setShowPopover(false)}
      >
        <IonList color="dark">
          <IonItem color="dark">
            <IonLabel>
              <p style={{ textAlign: "center", fontSize: 20 }}>
                <strong>Change Password</strong>
              </p>
            </IonLabel>
          </IonItem>

          <IonItem color="dark">
            <IonLabel position="stacked">Current Password</IonLabel>
            <IonInput
              value={oldPassword}
              onIonChange={(e) => setOldPassword(e.detail.value)}
            ></IonInput>
          </IonItem>
          <IonItem color="dark">
            <IonLabel position="stacked">New Password</IonLabel>
            <IonInput
              value={newPassword}
              onIonChange={(e) => setNewPassword(e.detail.value)}
            ></IonInput>
          </IonItem>
          <IonItem color="dark">
            <IonButton expand="block" onClick={cancel}>
              Cancel
            </IonButton>
            <IonButton expand="block" onClick={changePassword}>
              Submit
            </IonButton>
          </IonItem>
        </IonList>
      </IonPopover>
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
      <IonItem
        button
        color="dark"
        mode="ios"
        onClick={() => setShowPopover(true)}
      >
        Change My Password
      </IonItem>
    </>
  );
};

export default PopoverComponent;
