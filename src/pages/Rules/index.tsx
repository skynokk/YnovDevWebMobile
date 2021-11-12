import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";

import "./index.css";

const Rules = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="secondary">
            <IonBackButton defaultHref="/home" text="Retourner au jeu" />
          </IonButtons>
          <IonTitle>Règles</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent id="rules-content">
        <p>
          <b>But du jeu</b>
          <br />
          <br /> Après avoir reçu deux cartes, le joueur tire des cartes pour
          s’approcher de la valeur 21 sans la dépasser. Le but du joueur est de
          battre le croupier en obtenant un total de points supérieur à celui-ci
          ou en voyant ce dernier dépasser 21. Chaque joueur joue contre le
          croupier, qui représente la banque, ou le casino, et non contre les
          autres joueurs. Pour avoir un aperçu du jeu, essayez notre jeu de
          blackjack en ligne gratuit. <br />
          <br />
          <b>Valeurs des cartes au blackjack</b>
          <br />
          <br /> Chaque carte numérotée de 2 à 10 a sa valeur nominale (égale au
          numéro sur la carte) Les valets, les dames et les rois (les figures),
          ont une valeur de 10 points L’As vaut 1 point ou 11 points, au choix
          du joueur
        </p>
      </IonContent>
    </IonPage>
  );
};

export default Rules;
