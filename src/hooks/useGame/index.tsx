import React, { useState, useEffect } from "react";

import { Step, Joueur, getDeck, Carte } from "../../types";

const useGame = () => {
  const [step, setStep] = useState<Step>("null");
  const [deck, setDeck] = useState<Carte[]>([]);
  const [player, setPlayer] = useState<Joueur>({
    score: 0,
    cartes: [],
    type: "joueur",
  });
  const [ia, setIa] = useState<Joueur>({
    score: 0,
    cartes: [],
    type: "ia",
  });

  const getTotal = (cartes: Carte[]) => {
    let total = 0;
    cartes.forEach((carte) => (total += carte.valeur));
    return total;
  };

  const getCards = (nb: number = 1) => {
    const cards = [];
    for (let i = 0; i < nb; i++) {
      const card = deck[Math.floor(Math.random() * deck.length)];
      cards.push(card);
    }
    let newDeck = deck;
    cards.forEach((card) => {
      newDeck = newDeck.filter(
        (c) =>
          !(
            c.valeur === card.valeur &&
            c.enseigne === card.enseigne &&
            c.texte === card.texte
          )
      );
    });
    setDeck(newDeck);

    return cards;
  };

  const takeCard = () => {
    if (!player) return;
    const card: any = getCards(1);
    const newPlayer = { ...player };
    newPlayer.cartes.push(card[0]);
    setPlayer(newPlayer);
  };

  const startGame = () => {
    const cards: any = getCards(2);
    setPlayer({ ...player, cartes: cards });
    setStep("playerturn");
  };

  const iaTurn = () => {
    const cards: Carte[] = [];
    if (!player) return;
    while (
      getTotal(cards) < getTotal(player.cartes) + 1 &&
      getTotal(cards) < 21
    ) {
      cards.push(getCards(1)[0]);
    }
    setIa({ ...ia, cartes: cards });
    setStep("iaturn");
  };

  const restartGame = () => {
    setPlayer({
      cartes: [],
      score: 0,
      type: "joueur",
    });
    setIa({
      cartes: [],
      score: 0,
      type: "ia",
    });
    setDeck(getDeck());
    setStep("start");
  };

  useEffect(() => {
    if (step !== "null" && step !== "start" && deck.length > 0) {
      localStorage.setItem(
        "game",
        JSON.stringify({
          step,
          deck,
          player,
          ia,
        })
      );
    }
  }, [step, deck, player, ia]);

  useEffect(() => {
    const dataLocalStorage = localStorage.getItem("game");
    if (dataLocalStorage) {
      const { step, deck, player, ia } = JSON.parse(dataLocalStorage);
      console.log(step, deck, player, ia, "i'm here");
      setPlayer(player);
      setIa(ia);
      setDeck(deck);
      setStep(step);
    } else {
      setDeck(getDeck());
    }
  }, []);

  useEffect(() => {
    switch (step) {
      case "start":
        startGame();
        break;
      case "playerended":
        iaTurn();
        break;
      case "endgame":
        if (!ia || !player) return;
        const totalIa = getTotal(ia.cartes);
        const totalPlayer = getTotal(player.cartes);
        if (totalIa > 21) {
          setStep("win");
        } else if (totalIa < 22 && totalPlayer < 22 && totalPlayer > totalIa) {
          setStep("win");
        } else {
          setStep("loose");
        }
        break;
      case "win":
        console.log("joueur a gagné");
        if (!player) return;
        const newPlayer = { ...player };
        newPlayer.score += 1;
        setPlayer(newPlayer);
        break;
      case "loose":
        if (!ia) return;
        const newIa = { ...ia };
        newIa.score += 1;
        setIa(newIa);
        break;
    }
  }, [step]);

  useEffect(() => {
    if (player) {
      let total = 0;
      player.cartes.forEach((carte) => (total += carte.valeur));
      if (total > 21) {
        setStep("loose");
      }
    }
  }, [player]);

  console.log("ia ", ia, getTotal(ia?.cartes || []));
  console.log("player ", player, getTotal(player?.cartes || []));
  console.log("deck ", deck);

  return {
    step,
    player,
    ia,
    setStep,
    getTotal,
    takeCard,
    restartGame,
  };
};

export default useGame;
