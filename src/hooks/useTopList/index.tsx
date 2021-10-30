import React, { useState, useEffect, useCallback } from "react";
import { useDatabase, useFirebaseDatabase } from "..";
import { defaultList, List, Top } from "../../types";

const key = "list";

const useTopList = () => {
  const [list, setList] = useState<List>([]);
  const { saveList, getList } = useFirebaseDatabase();

  const init = useCallback(
    () =>
      getList().then((l) => {
        if (l && l.length > 0) {
          setList(l);
        } else {
          saveList(defaultList).then(() => setList(defaultList));
        }
      }),
    [getList, saveList]
  );
  const getLists = useCallback(
    () =>
      getList().then((l) => {
        setList(l);
      }),
    [getList]
  );

  const pushTop = (top: Top): Promise<any> => {
    const newList = Array.from(list.concat(top));
    return saveList(newList).then(() => setList(newList));
  };
  const findTopByTitle = useCallback(
    (title: string) => list.find((l) => l.title === title),
    [list]
  );

  useEffect(() => {
    getLists();
  }, [getLists]);

  console.log("list::", list);

  return {
    list,
    pushTop,
    findTopByTitle,
    init,
    getLists,
  };
};

export default useTopList;
