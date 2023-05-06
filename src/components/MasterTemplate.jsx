import { Outlet } from "react-router-dom";
import MenuBar from "./MenuBar";

const MasterTemplate = ({logout}) => {
  return (
    <>
      <MenuBar logout={logout}></MenuBar>
      <Outlet></Outlet>
    </>
  );
};

export default MasterTemplate;