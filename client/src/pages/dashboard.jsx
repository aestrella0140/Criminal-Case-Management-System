import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import auth from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

import { GET_USER_BY_ID, GET_CASE_BY_ID } from "../utils/queries";

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const formattedDate = currentDate.format("DD MMMM YYYY");

  const user = auth.getUser();
  const userId = user?.data?._id;

  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { getUserByIdId: userId },
    skip: !userId,
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("id_token");
    navigate("/Login");
  };

  if (loading) return <p>loading</p>;

  if (error) {
    console.error(error);
    return <p>Error loading</p>;
  }

  const { firstName, lastName } = data.getUserById;

  return (
    <>
      <header className="">
        <div className="flex items-center gap-3">
          <img 
          src="/judgement-favicon.png"
          alt="judgement icon"
          className="w-8 h-8"
          />
        
          <h2>Criminal Case Management</h2>
          <h3>Dashboard / overview</h3>
        </div>
        <br></br>
        <h1>
          Welcome back, {firstName} {lastName} {formattedDate}
        </h1>
        <button className="m-auto" onClick={handleLogout}>
          logout
        </button>
      </header>

      <nav className="flex justify-start w-full">
        <ul className="">
          <li>
            <Link to="Profile">Profile</Link>
          </li>
          <li>
            <Link to="HomePage">HomePage</Link>
          </li>
          <li>
            <Link to="RelationalAnalytics">Analytics</Link>
          </li>
        </ul>
      </nav>

      <main>
        <div>
          <h3>My current cases</h3>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
