import { Link } from "react-router-dom";
import "./index.scss";

type ListTodoProps = {
  listTodo: string[];
};

const ListTodo = (props: ListTodoProps) => {
  // get listTodo from props is like const listTodo = props.listTodo
  const { listTodo } = props;
  return (
    <ul className="listTodo">
      {/* map to listTodo for show li */}
      {listTodo.map((todo, i) => (
        // first child of map need key with uniq value
        <Link to={`/todo/${i}`} key={i}>
          <li>
            <span>{todo}</span>
            <span className="material-icons">chevron_right</span>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default ListTodo;
