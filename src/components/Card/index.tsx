import { Carte } from "../../types";

import "./index.css";

type CardProps = {
  carte: Carte;
};
const Card = (props: CardProps) => {
  const { carte } = props;
  return (
    <div className="card">
      <img
        className="card-texte"
        src={`assets/images/${carte.texte}.png`}
        alt=""
      />
      <img
        src={`assets/images/${carte.enseigne}.png`}
        className="card-enseigne"
        alt=""
      />
      <span className="card-value">{carte.valeur}</span>
    </div>
  );
};

export default Card;
