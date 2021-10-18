import {
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { useTopList } from "../../../hooks";
import { Top } from "../../../types";

type ViewTopProps = RouteComponentProps<{
  title: string;
}>;

const ViewTop: React.FC<ViewTopProps> = ({ match }) => {
  const {
    params: { title },
  } = match;
  const { findTopByTitle } = useTopList();
  const [top, setTop] = useState<Top | undefined>();

  const openLink = (link?: string) => {
    if (!link) return;
    InAppBrowser.create(link, "_blank");
  };

  useEffect(() => {
    setTop(findTopByTitle(title));
  }, [title, findTopByTitle]);

  if (!top) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Liste des top</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent id="viewTopPage">
          <p>Chargement</p>
        </IonContent>
      </IonPage>
    );
  }

  const { title: titleTop, items } = top;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Liste des top</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent id="viewTopPage">
        <IonGrid>
          <IonRow>
            <IonCol>
              <h1># {titleTop}</h1>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              {items.map((item) => (
                <IonCard onClick={() => openLink(item.link)}>
                  {item.img && <img src={item.img} />}
                  <IonCardHeader>
                    <IonCardTitle>
                      {item.order}. {item.name}
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>{item.description}</IonCardContent>
                </IonCard>
              ))}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ViewTop;
