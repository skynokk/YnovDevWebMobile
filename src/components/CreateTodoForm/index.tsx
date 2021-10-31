import { useState } from "react";
import "./index.scss";

// props of CreateTodoForm
type CreateTodoFormProps = {
  onSubmit: (title: string) => void;
};

const CreateTodoForm = (props: CreateTodoFormProps) => {
  const [title, setTitle] = useState<string>("");
  // get onSubmit from props is like const onSubmit = props.onSubmit
  const { onSubmit } = props;
  return (
    <div className="create-todo-form-content">
      <div>
        {/* htmlForm= is jsx html= */}
        <label htmlFor="title">Titre* :</label>
        <input
          type="text"
          id="title"
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <button className="btn btnSubmit" onClick={() => onSubmit(title)}>
          Créer
        </button>
      </div>
    </div>
  );
};

export default CreateTodoForm;
