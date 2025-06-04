import React, { useState } from "react";
import "./styles.css";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { AiFillSetting } from "react-icons/ai";
import UserProfile from "../UserProfileFeture";
import { NavLink, useLocation } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openOrder, setIsOpenOrder] = useState(0);
  const location = useLocation();
  const handleOpen = () => {
    if (openOrder === 0) {
      setIsOpen(true);
      setIsOpenOrder(1);
    } else if (openOrder === 1) {
      setIsOpen(false);
      setIsOpenOrder(0);
    }
  };
  return (
    <>
      <div className="navbar">
        <h1>
          Finance Tracker
          <RiMoneyRupeeCircleFill className="logo-image" />
        </h1>
        <div className="navbar-right-wrapper">
          {location.pathname === "/accounts" && (
            <NavLink className="nav-link-item" to={"/dashboard"}>
              Manage Transactions
            </NavLink>
          )}
          {location.pathname !== "/accounts" && (
            <NavLink className="nav-link-item" to={"/accounts"}>
              Manage Accounts
            </NavLink>
          )}

          <AiFillSetting className="menu-btn" onClick={handleOpen} />
        </div>
      </div>
      {isOpen && <UserProfile className="profile" />}
    </>
  );
};

export default Header;
