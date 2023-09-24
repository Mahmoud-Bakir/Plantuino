import "../NavBar/style.css";
import Logos from "../../assets/pictures/logo.svg";
import Name from "../../assets/pictures/logoName.svg";

const NavBar = () => {
  return (
    <div className="navContainer">
      <div className="logoContainer">
        <img src={Logos} alt="Logo" className="logo" />
      </div>
      <div className="logoNameContainer">
        <img src={Name} alt="Logo" className=" logo logoName" />
      </div>
    </div>
  );
};
export default NavBar;
