import { useHistory } from "react-router";
import "./index.scss";

type HeaderProps = {
  title?: string;
  showBtnGoBack?: boolean;
};

const Header = (props: HeaderProps) => {
  // title props default value is "Application Todolist"
  const { showBtnGoBack, title = "Application Todolist" } = props;
  const { goBack } = useHistory();
  return (
    <div className={`header ${showBtnGoBack ? "withBtn" : ""}`}>
      {showBtnGoBack && (
        <button className="btn" onClick={() => goBack()}>
          <span className="material-icons">arrow_back_ios_new</span>
        </button>
      )}
      <h1>{title}</h1>
    </div>
  );
};

export default Header;
