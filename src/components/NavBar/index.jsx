import React, { useState } from "react";
import "./styles.css";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { AiFillSetting } from "react-icons/ai";
import UserProfile from "../UserProfileFeture";

const NavBar = ({ activeTab, handleActiveTabChange, children }) => {
  return (
    <div className="dashboard-wrapper">
        <div className="dashboard-nav-wrapper">
            <div className={`dashboard-nav-item ${activeTab === 'TRANSACTIONS' ? "active" : ""}`} onClick={() => handleActiveTabChange("TRANSACTIONS")}>Transactions</div>
            <div className={`dashboard-nav-item ${activeTab === 'CHARTS' ? "active" : ""}`} onClick={() => handleActiveTabChange("CHARTS")}>Charts</div>
        </div>
        <div class="dashboard-body">
            {children}
        </div>
    </div>
  );
};

export default NavBar;
