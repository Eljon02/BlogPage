import React from "react";
import "./Sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import OtherHousesOutlinedIcon from "@mui/icons-material/OtherHousesOutlined";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Link, useNavigate } from "react-router-dom";
import { GiModernCity } from "react-icons/gi";
import { FaFileContract } from "react-icons/fa";
import { TiBusinessCard } from "react-icons/ti";
import { TbUserCheck, TbLiveView } from "react-icons/tb";
import { BsGenderFemale } from "react-icons/bs";

export default function Sidebar() {
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate("/");
    navigate(0);
  }
    
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <span className="logo">Dashboard</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">Main</p>
            <li onClick={handleHomeClick}>
              <DashboardIcon className="icon" />
              <span>Go to Homepage</span>
            </li>

          <p className="title">Lists</p>
          <Link to="/dashboard/users" style={{ textDecoration: "none" }}>
            <li>
              <GroupOutlinedIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/dashboard/employees" style={{ textDecoration: "none" }}>
            <li>
              <GroupOutlinedIcon className="icon" />
              <span>Employees</span>
            </li>
          </Link>
          <Link to="/dashboard/" style={{ textDecoration: "none" }}>
            <li>
              <OtherHousesOutlinedIcon className="icon" />
              <span>Orders</span>
            </li>
          </Link>
          <Link to="/dashboard/booking" style={{ textDecoration: "none" }}>
            <li>
              <EventAvailableIcon className="icon" />
              <span>Bookings</span>
            </li>
          </Link>
          <p className="title">Useful for Animals</p>
          <Link to="/dashboard/animals" style={{ textDecoration: "none" }}>
            <li>
              <BsGenderFemale className="icon" />
              <span>Animals</span>
            </li>
          </Link>
          <Link
            to="/dashboard/accommodationPlaces"
            style={{ textDecoration: "none" }}
          >
            <li>
              <TbUserCheck className="icon" />
              <span>Accommodation_Place</span>
            </li>
          </Link>
          <Link
            to="/dashboard/rooms"
            style={{ textDecoration: "none" }}
          >
            <li>
              <TbUserCheck className="icon" />
              <span>Rooms</span>
            </li>
          </Link>
          <Link to="/dashboard/breed" style={{ textDecoration: "none" }}>
            <li>
              <TiBusinessCard className="icon" />
              <span>Breed</span>
            </li>
          </Link>

          <p className="title">Useful for Products</p>

          <Link to="/dashboard/products" style={{ textDecoration: "none" }}>
            <li>
              <TbLiveView className="icon" />
              <span>Products</span>
            </li>
          </Link>

          <Link to="/dashboard/reviews" style={{ textDecoration: "none" }}>
            <li>
              <FaFileContract className="icon" />
              <span>Reviews</span>
            </li>
          </Link>

          <p className="title">Common</p>
          <Link to="/dashboard/category" style={{ textDecoration: "none" }}>
            <li>
              <GiModernCity className="icon" />
              <span>Category</span>
            </li>
          </Link>

          <p className="title">Service</p>

          <li>
            <SettingsOutlinedIcon className="icon" />
            <span>Settings</span>
          </li>
          <p className="title">User</p>

          <li>
            <LogoutOutlinedIcon className="icon" />
          </li>
        </ul>
      </div>
    </div>
  )
}
