import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import auth from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import judgementIcon from "../assets/judgement-favicon.png";

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
          <img src={judgementIcon}></img>
          <div>
            <h2 className="font-bold">Criminal Case Management</h2>
            <h3>Dashboard / overview</h3>
          </div>
        </div>
        <br></br>
        <h1>
          Welcome back, {firstName} {lastName} {formattedDate}
        </h1>
        <button className="flex flex-auto" onClick={handleLogout}>
          logout
        </button>
      </header>

      <main>
        <div className="grid grid-cols-2 gap-6">
          <div className="p-6">
            <h3>Total cases</h3>
            <sub className="font-thin">Assigned to you</sub>
          </div>

            <div className="p-6">
              <h3>Active</h3>
              <sub className="font-thin">Currently active</sub>
            </div>

          <div className="p-6">
            <h3 >Pending</h3>
            <sub className="font-thin">Awaiting action</sub>
          </div>

            <div className="p-6">
            <h3>Closed</h3>
            <sub className="font-thin">Completed cases</sub>
            </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
