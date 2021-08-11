import { NavLink } from "react-router-dom";

import "./LeftBar.scss";
import dashboard from "../../img/dashboard.svg";
import stuff from "../../img/stuff.svg";
import alerts from "../../img/alerts.svg";
import sequence from "../../img/sequence.svg";
import logout from "../../img/sign-out.svg";

export const LeftBar = () => {
  return (
    <div className="left">
      <p className="logo">Logo</p>
      <div className="navigation">
        <div className="navigation_dashboard">
          <img src={dashboard} alt="dashboard picture" />
          <NavLink
            className="navigation__buttons"
            to="/dashboard"
            activeClassName="button_active"
          >
            Dashboard
          </NavLink>
        </div>
        <div className="navigation_stuff">
          <img src={stuff} alt="stuff picture" />
          <NavLink
            className="navigation__buttons"
            to="/stuff"
            activeClassName="button_active"
          >
            Stuff
          </NavLink>
        </div>
        <div className="navigation_alerts">
          <img src={alerts} alt="alerts picture" />
          <NavLink
            className="navigation__buttons"
            to="/alerts"
            activeClassName={"button_active"}
          >
            Alerts
          </NavLink>
        </div>
        <div className="navigation_sequence">
          <img src={sequence} alt="sequence picture" />
          <NavLink
            to="/sequence"
            className="navigation__buttons"
            activeClassName={"button_active"}
          >
            Sequence
          </NavLink>
        </div>
      </div>
      <div className="sign-out">
        <img src={logout} alt="" />
        <button className="logout">Logout</button>
      </div>
    </div>
  );
};

export default LeftBar;
