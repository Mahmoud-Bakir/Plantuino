import "../NavBar/style.css";
import Logos from "../../assets/pictures/logo.svg";
import Name from "../../assets/pictures/logoName.svg";
import Logout from "../../assets/pictures/logout.svg";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigater = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigater("/");
  };
  return (
    <div className="navContainer">
      <div className="logoContainer">
        <img src={Logos} alt="Logo" className="logo" />
      </div>
      <div className="logoNameContainer">
        <img src={Name} alt="Logo" className=" logo logoName" />
      </div>
      <div className="logoContainer logout">
        <img src={Logout} alt="Logout" className="logo" onClick={logout} />
      </div>
    </div>
  );
};
export default NavBar;
