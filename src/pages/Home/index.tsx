import React, { useState } from "react";
import { BtnAddTodo, CreateTodoForm, ListTodo } from "../../components";
import { useTodo } from "../../hooks";
import "./index.scss";

const Home = () => {
  const { listTodo, createTodo } = useTodo();
  // declare state openModal and setter setOpenModal
  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleCreateTodo = (title: string) => {
    createTodo(title);
    // close modal
    setOpenModal(false);
  };
  // if openModal show CreateTodoForm
  if (openModal) {
    return <CreateTodoForm onSubmit={handleCreateTodo} />;
  }
  // else show home page
  return (
    <React.Fragment>
      <div id="homePage">
        <div>
          <h2>Votre liste de todos</h2>
        </div>
        <div>
          <ListTodo listTodo={listTodo} />
        </div>
      </div>
      <BtnAddTodo onClick={() => setOpenModal(true)} />
    </React.Fragment>
  );
};

export default Home;
