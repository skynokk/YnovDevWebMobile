import React, { useState } from "react";
import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonList,
  IonItemDivider,
} from "@ionic/react";
import {
  add,
  clipboardOutline,
  imageOutline,
  informationOutline,
  linkOutline,
  saveOutline,
} from "ionicons/icons";
import { TopItem, Top } from "../../types";

type TopFormProps = {
  onSubmit: (top: Top) => void;
};

const TopForm = ({ onSubmit }: TopFormProps) => {
  const [title, setTitle] = useState<string>("");
  const [items, setItems] = useState<TopItem[]>([]);

  const appendNewItem = () => {
    setItems(
      items.concat({
        order: items.length + 1,
        name: "",
      })
    );
  };

  const modifyItem = (item: TopItem) =>
    setItems((_items) => {
      let itemFind = _items.find((i) => i.order === item.order);
      if (!itemFind) return _items;
      itemFind = item;
      return Array.from(_items);
    });

  return (
    <IonGrid>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="floating">Titre du top *</IonLabel>
            <IonIcon icon={clipboardOutline} slot="start" />
            <IonInput
              value={title}
              onIonChange={(e) => setTitle(e.detail.value || "")}
            ></IonInput>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size="9">
          <h3>Ajouter un élément</h3>
        </IonCol>
        <IonCol>
          <IonButton shape="round" color="success" onClick={appendNewItem}>
            <IonIcon icon={add} />
          </IonButton>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonList>
            {items.map((item) => (
              <IonCol key={item.order}>
                <IonItemDivider>
                  {item.order}. {item.name}
                </IonItemDivider>
                <IonItem>
                  <IonLabel position="floating">Intitulé *</IonLabel>
                  <IonIcon icon={clipboardOutline} slot="start" />
                  <IonInput
                    value={item.name}
                    onIonChange={(e) => {
                      item.name = e.detail.value || "";
                      modifyItem(item);
                    }}
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Déscription</IonLabel>
                  <IonIcon icon={informationOutline} slot="start" />
                  <IonInput
                    value={item.description}
                    onIonChange={(e) => {
                      item.description = e.detail.value || "";
                      modifyItem(item);
                    }}
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Lien de l'image</IonLabel>
                  <IonIcon icon={imageOutline} slot="start" />
                  <IonInput
                    value={item.img}
                    onIonChange={(e) => {
                      item.img = e.detail.value || "";
                      modifyItem(item);
                    }}
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Lien</IonLabel>
                  <IonIcon icon={linkOutline} slot="start" />
                  <IonInput
                    value={item.link}
                    onIonChange={(e) => {
                      item.link = e.detail.value || "";
                      modifyItem(item);
                    }}
                  ></IonInput>
                </IonItem>
              </IonCol>
            ))}
          </IonList>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonButton
            shape="round"
            expand="full"
            color="primary"
            onClick={() => onSubmit({ title, items })}
          >
            Sauvegarder
            <IonIcon slot="end" icon={saveOutline} />
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default TopForm;
