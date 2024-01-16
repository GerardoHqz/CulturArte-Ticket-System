import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';

import "./index.css";

import Login from "./pages/Login";
import SetUserPassword from "./pages/SetUserPassword";
import Home from "./pages/Home";
 
import Art from "./pages/categories/Art";
import Music from "./pages/categories/Music";
import Dance from "./pages/categories/Dance";
import Cinema from "./pages/categories/Cinema";
import Literature from "./pages/categories/Literature";
import Forum from "./pages/categories/Forum";
import Theatre from "./pages/categories/Theatre";
import Debate from "./pages/categories/Debate";
import StandUp from "./pages/categories/StandUp";
import CreateEvent from "./pages/Employees/CreateEvent";
import EditSpecificEvent from "./pages/Employees/EditSpecificEvent";
import BuyTickets from "./pages/BuyTickets";
import Tier from "./components/buy_tickets/Tier";

import reportWebVitals from "./reportWebVitals";
import EventBuyCard from "./components/buy_tickets/EventBuyCard";

import UpcomingEvents from "./pages/UpcomingEvents";
import PastEvents from "./pages/PastEvents";
import PastEventsUser from "./pages/user/PastEventsUser";
import TransferredTickets from "./pages/user/TransferredTickets";
import RedeemTickets from "./pages/user/redeemTicket";

import Panic from "./pages/Employees/Panic";
import ViewEditEvent from "./pages/Employees/ViewEditEvent";
import AssignedEvents from "./pages/Employees/AssignedEvents";
import AdminEmployee from "./pages/Employees/AdminEmployee";
import AdminUser from "./pages/Employees/AdminUser";
import AssignStaff from "./pages/Employees/AssignStaff";
import SelectEmployee from "./components/SelectEmployee";
import GeneralStadistics from "./pages/Employees/GeneralStadistics";
import EventStadistic from "./pages/Employees/EventStadistic";

import AssignedPersonalCard from "./components/assigned_personal/AssignedPersonalCard";
import VerifyAccount from "./pages/VerifyAccount";
import EmployeePortal from "./pages/Employees/EmployeePortal";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="4082425860-abs9vuikn3l0ub6f9seo2nmvs21qk9c1.apps.googleusercontent.com">
  <BrowserRouter>
      <Routes>
        <Route index element={<Login />}></Route>
        <Route path="home" element={<Home />}></Route>
        <Route path="setpassword" element={<SetUserPassword />}></Route>
        <Route path="verify" element={<VerifyAccount />}></Route>
        <Route path="categories/art" element={<Art />}></Route>
        <Route path="categories/music" element={<Music />}></Route>
        <Route path="categories/dance" element={<Dance />}></Route>
        <Route path="categories/cinema" element={<Cinema />}></Route>
        <Route path="categories/literature" element={<Literature />}></Route>
        <Route path="categories/forum" element={<Forum />}></Route>
        <Route path="categories/theatre" element={<Theatre />}></Route>
        <Route path="categories/debate" element={<Debate />}></Route>
        <Route path="categories/standup" element={<StandUp />}></Route>

        <Route path="home/upcomingevents" element={<UpcomingEvents />}></Route>
        <Route path="home/pastevents" element={<PastEvents />}></Route>
        <Route path="user/pastevents" element={<PastEventsUser />}></Route>
        <Route path="user/transfers" element={<TransferredTickets />}></Route>
        <Route path="user/redeem" element={<RedeemTickets />}></Route>
        <Route path="user/buytickets" element={<BuyTickets />}></Route>

        <Route path="employee/home" element={<EmployeePortal />}></Route>
        <Route path="employee/editevent" element={<ViewEditEvent />}></Route>
        <Route
          path="employee/edit/:eventId"
          element={<EditSpecificEvent />}
        ></Route>
        <Route path="employee/createevent" element={<CreateEvent />}></Route>
        <Route path="employee/panicbuttom" element={<Panic />}></Route>
        <Route
          path="employee/assignedevents"
          element={<AssignedEvents />}
        ></Route>
        <Route path="employee/employees" element={<AdminEmployee />}></Route>
        <Route path="employee/users" element={<AdminUser />}></Route>
        <Route path="employee/assignstaff" element={<AssignStaff />}></Route>
        <Route
          path="employee/selectemployee"
          element={<SelectEmployee />}
        ></Route>

        <Route
          path="employee/stadistic"
          element={<GeneralStadistics />}
        ></Route>
        <Route
          path="employee/stadistic/:eventId"
          element={<EventStadistic />}
        ></Route>
        <Route path="buytickets" element={<BuyTickets />}></Route>
        <Route path="tier" element={<Tier />}></Route>
        <Route path="eventbuy" element={<EventBuyCard />}></Route>

        <Route path="personalcard" element={<AssignedPersonalCard />}></Route>
      </Routes>
  </BrowserRouter>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
