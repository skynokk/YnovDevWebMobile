import React from "react";
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonModal,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  card,
  clipboardOutline,
  close,
  gameController,
  stopwatch,
} from "ionicons/icons";

import { Card } from "../../components";
import { useGame } from "../../hooks";
import "./index.css";

const Home: React.FC = () => {
  const { player, ia, step, setStep, getTotal, takeCard, restartGame } =
    useGame();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="primary">
            <IonButton routerLink="/rules">
              <IonIcon slot="icon-only" icon={clipboardOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>
            <img src="assets/images/blackjack.png" alt="" />
            BlackJack
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent id="home-content">
        <IonGrid>
          {step === "null" && (
            <IonRow>
              <IonCol>
                <IonButton
                  shape="round"
                  expand="block"
                  onClick={() => setStep("start")}
                >
                  <IonIcon slot="start" icon={gameController} />
                  Nouvelle partie
                </IonButton>
              </IonCol>
            </IonRow>
          )}
          {step === "playerturn" && (
            <IonRow>
              <IonCol size="6">
                <p>
                  Score IA: <b>{ia.score}</b>
                </p>
              </IonCol>
              <IonCol size="6">
                <p>
                  Score joueur: <b>{player.score}</b>
                </p>
              </IonCol>
              <IonCol size="6">
                <div>Actions</div>
                <div>
                  <IonButton
                    onClick={() => takeCard()}
                    disabled={player && getTotal(player.cartes) === 21}
                    expand="block"
                    color="success"
                  >
                    <IonIcon slot="start" icon={card} />
                    Tirer une carte
                  </IonButton>
                </div>
                <div>
                  <IonButton
                    expand="block"
                    onClick={() => setStep("playerended")}
                  >
                    <IonIcon slot="start" icon={stopwatch} />
                    Stop
                  </IonButton>
                </div>
                <div>
                  <IonButton
                    expand="block"
                    onClick={() => restartGame()}
                    color="tertiary"
                  >
                    <IonIcon slot="start" icon={gameController} />
                    Nouvelle partie
                  </IonButton>
                </div>
              </IonCol>
              <IonCol size="6">
                <div>
                  <b>Total: {getTotal(player?.cartes || [])}</b>
                </div>
                <div>Les cartes</div>
                {player?.cartes.map((carte, i) => (
                  <React.Fragment key={i}>
                    <Card carte={carte} />
                  </React.Fragment>
                ))}
              </IonCol>
            </IonRow>
          )}
          {(step === "loose" || step === "win") && (
            <IonRow>
              <IonCol size="6">
                <IonRow>
                  <IonCol>
                    <IonButton
                      shape="round"
                      expand="block"
                      onClick={() => setStep("start")}
                    >
                      <IonIcon slot="start" icon={gameController} />
                      Continuer
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonCol>
              <IonCol size="6">
                <p>
                  Vous avez {step === "win" ? "gagné" : "perdu"} avec le total
                  de {getTotal(player?.cartes || [])}
                </p>
                <p>
                  Le croupier a {step !== "win" ? "gagné" : "perdu"} avec le
                  total de {getTotal(ia?.cartes || [])}
                </p>
              </IonCol>
            </IonRow>
          )}
          <IonModal isOpen={step === "iaturn"}>
            <IonHeader>
              <IonToolbar>
                <IonButtons slot="secondary">
                  <IonButton onClick={() => setStep("endgame")}>
                    <IonIcon slot="icon-only" icon={close} />
                  </IonButton>
                </IonButtons>
                <IonTitle>Croupier</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonGrid>
                <IonRow>
                  <IonCol size="12">
                    Total du croupier <b>{getTotal(ia?.cartes || [])}</b>
                  </IonCol>
                  {ia?.cartes.map((carte, i) => (
                    <IonCol key={i} size="12">
                      <Card carte={carte} />
                    </IonCol>
                  ))}
                </IonRow>
              </IonGrid>
            </IonContent>
          </IonModal>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
