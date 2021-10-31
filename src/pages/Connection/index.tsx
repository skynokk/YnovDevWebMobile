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
import { logIn, logoGoogle } from "ionicons/icons";
import { useState } from "react";
import { useFirebaseLogin } from "../../hooks";
import "./index.scss";

const Connection = () => {
  const { connectEmailPassword } = useFirebaseLogin();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <IonPage>
      <IonContent id="connectionPage">
        <IonGrid>
          <IonRow>
            <IonCol>
              <h1>
                Connexion <IonIcon icon={logIn} />
              </h1>
            </IonCol>
          </IonRow>
          <IonRow>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
            />
          </IonRow>
          <IonRow>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Mot de passe"
            />
          </IonRow>
          <IonRow>
            <IonButton
              color="tertiary"
              onClick={() => connectEmailPassword(email, password)}
            >
              Valider
            </IonButton>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Connection;
