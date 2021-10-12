import React, { useState, useEffect } from "react";
import { useDatabase } from "..";
import { defaultList, List, Top } from "../../types";

const key = "list";

const useTopList = () => {
  const [list, setList] = useState<List>([]);
  const { setItem, getItem } = useDatabase();

  const pushTop = (top: Top) => setList(Array.from(list.concat(top)));
  const createList = (l: List) => setList(Array.from(list.concat(l)));

  useEffect(() => {
    getItem<List>(key).then((l) => {
      if (l) {
        setList(l);
      } else {
        setList(defaultList);
      }
    });
  }, [getItem]);

  useEffect(() => {
    setItem(key, list);
  }, [list, setItem]);

  console.log(list);

  return {
    list,
    pushTop,
    createList,
  };
};

export default useTopList;
