import React, { useState, useEffect, useCallback } from "react";
import { useDatabase } from "..";
import { defaultList, List, Top } from "../../types";

const key = "list";

const useTopList = () => {
  const [list, setList] = useState<List>([]);
  const { setItem, getItem } = useDatabase();

  const init = useCallback(
    () =>
      getItem<List>(key).then((l) => {
        if (l && l.length > 0) {
          setList(l);
        } else {
          setList(defaultList);
        }
      }),
    [getItem]
  );

  const getLists = useCallback(
    () =>
      new Promise<void>((resolve, reject) => {
        getItem<List>(key)
          .then((l) => {
            if (l && l.length > 0) {
              setList(l);
              resolve();
            } else {
              reject();
            }
          })
          .catch(reject);
      }),
    [getItem]
  );

  const pushTop = (top: Top) => setList(Array.from(list.concat(top)));
  const createList = (l: List) => setList(Array.from(list.concat(l)));
  const findTopByTitle = useCallback(
    (title: string) => list.find((l) => l.title === title),
    [list]
  );

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    setItem(key, list).catch((error) => console.error(error));
  }, [list, setItem]);

  return {
    list,
    pushTop,
    createList,
    findTopByTitle,
    init,
    getLists,
  };
};

export default useTopList;
