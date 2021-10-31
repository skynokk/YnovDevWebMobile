import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../components";
import { useTodo } from "../../hooks";
import { TodoType } from "../../hooks/useTodo";
import "./index.scss";

const Todo = () => {
  const { id } = useParams<{ id: string }>();
  const { listTodo, saveTodo, getTodo } = useTodo();
  const [todoValue, setTodoValue] = useState<string>("");
  const [todoType, setTodoType] = useState<TodoType>(getTodo(id));

  const addTodoItem = () => {
    setTodoType(
      todoType.concat({
        id: todoType.length + 1,
        todo: todoValue,
        done: false,
      })
    );
    setTodoValue("");
  };

  const handleCheck = (id: number) => {
    // copy todoType
    const newTodoType = Array.from(todoType);
    const todoItemFind = newTodoType.find((todoItem) => todoItem.id === id);
    if (todoItemFind) {
      // toogle done
      todoItemFind.done = !todoItemFind.done;
    }
    setTodoType(newTodoType);
  };

  useEffect(() => {
    saveTodo(id, todoType);
  }, [id, todoType, saveTodo]);

  return (
    <React.Fragment>
      <Header showBtnGoBack title={listTodo[Number(id)]} />
      <div id="todo-page">
        <div className="todo-page-form-content">
          <input
            className="input"
            placeholder="A faire"
            value={todoValue}
            onChange={(e) => setTodoValue(e.target.value)}
          />
          <button className="btn" onClick={addTodoItem}>
            Ajouter
          </button>
        </div>
        <div>
          <ul className="todo-page-list">
            {todoType.map((todoItem) => (
              <li key={todoItem.id} onClick={() => handleCheck(todoItem.id)}>
                <span>{todoItem.todo}</span>
                <span className="material-icons">
                  {todoItem.done ? "check_box" : "check_box_outline_blank"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Todo;
