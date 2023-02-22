import React from "react";
import {NavLink} from "react-router-dom";
import Logo from "Assets/images/logo";
import {appRoutes} from "../index";

const LeftNavigation = () => {
  return (
    <nav className="navigation">
      <img src={Logo} />
      {
        appRoutes.map(({section,routes}) => [
          <div className={"navigation__section"}> {section}</div>,
          routes.map(({path, label}) => (
            <NavLink to={path} key={path} className={"navigation__link"}>{ label }</NavLink>
          ))
        ])
      }
    </nav>
  );
};

export default LeftNavigation;
