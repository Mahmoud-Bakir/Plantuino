import "./style.css";
import AuthenticationForm from "../../Components/AuthenticationForm";
import Logo from "../../Components/Logo";
import Hero from "../../assets/pictures/admin.svg";

const AuthenticationPage = () => {
  return (
    <div className="authContainer">
      <div className="authContent centered">
        <Logo/>
        <AuthenticationForm />
      </div>
      <div className="authContent">
        <img src={Hero} alt="Logo" className="logo" />
      </div>
    </div>
  );
};

export default AuthenticationPage;
