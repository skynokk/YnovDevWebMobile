import React, { useState, useEffect } from "react";
import { useDatabase } from "..";
import { defaultList, List, Top } from "../../types";

const key = "list";

const useTopList = () => {
  const [list, setList] = useState<List>([]);
  const { setItem, getItem } = useDatabase();

  const pushTop = (top: Top) => setList(Array.from(list.concat(top)));
  const createList = (l: List) => setList(Array.from(list.concat(l)));
  const findTopByTitle = (title: string) => list.find((l) => l.title === title);

  useEffect(() => {
    getItem<List>(key).then((l) => {
      if (l && l.length > 0) {
        setList(l);
      } else {
        setList(defaultList);
      }
    });
  }, [getItem]);

  useEffect(() => {
    setItem(key, list);
  }, [list, setItem]);

  return {
    list,
    pushTop,
    createList,
    findTopByTitle,
  };
};

export default useTopList;
