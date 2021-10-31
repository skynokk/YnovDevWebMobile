import { useEffect, useState } from "react";

const keyDatabaseListTodo = "listTodo";

export type TodoItem = {
  id: number;
  todo: string;
  done: boolean;
};
export type TodoType = TodoItem[];

// customHook useTodo
const useTodo = () => {
  const [listTodo, setListTodo] = useState<string[]>([]);
  // createTodo for append title of list
  const createTodo = (title: string) => {
    const newListTodo = Array.from(listTodo.concat(title));
    setListTodo(newListTodo);
    localStorage.setItem(keyDatabaseListTodo, JSON.stringify(newListTodo));
  };

  // saveTodo create table listTodo-{id} with todo value
  const saveTodo = (id: string, todo: TodoType) => {
    localStorage.setItem(`${keyDatabaseListTodo}-${id}`, JSON.stringify(todo));
  };
  const getTodo = (id: string) => {
    const value = localStorage.getItem(`${keyDatabaseListTodo}-${id}`);
    if (value) {
      return JSON.parse(value) as TodoType;
    }
    return [];
  };

  // on hook starting load list todo from localstorage
  useEffect(() => {
    const databaseListTodo = localStorage.getItem(keyDatabaseListTodo);
    if (databaseListTodo) {
      setListTodo(JSON.parse(databaseListTodo));
    }
  }, []);

  return {
    listTodo,
    createTodo,
    saveTodo,
    getTodo,
  };
};

export default useTodo;
