import "./index.scss";

// declare props of BtnAddTodo components
type BtnAddTodoProps = {
  onClick: () => void;
};

const BtnAddTodo = (props: BtnAddTodoProps) => {
  // get onClick from props is like const onClick = props.onClick
  const { onClick } = props;
  return (
    <button className="btn btnAddTodo" onClick={() => onClick()}>
      <span className="material-icons">add</span>
    </button>
  );
};

export default BtnAddTodo;
