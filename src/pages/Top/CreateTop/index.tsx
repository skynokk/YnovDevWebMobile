import React from "react";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { TopForm } from "../../../components";
import { useTopList } from "../../../hooks";
import { RouteComponentProps } from "react-router";
import { Top } from "../../../types";

const CreateTop = ({ history }: RouteComponentProps) => {
  const { pushTop } = useTopList();

  const handleSubmit = (top: Top) => {
    pushTop(top);
    history.replace("/");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Crétion d'un top</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <TopForm onSubmit={handleSubmit} />
      </IonContent>
    </IonPage>
  );
};

export default CreateTop;
