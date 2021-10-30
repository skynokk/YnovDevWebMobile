import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { logoGoogle } from "ionicons/icons";
import { useFirebaseLogin } from "../../hooks";

const Connection = () => {
  const { connectionWithGoogle } = useFirebaseLogin();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Connexion</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent id="connectionPage">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonButton color="primary" onClick={() => connectionWithGoogle()}>
                Connexion avec Google
                <IonIcon slot="end" icon={logoGoogle} />
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Connection;
