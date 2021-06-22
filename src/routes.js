/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";
import login from "./views/login/login.js"
import Bar_chart from "./views/barChart/Bar_chart"
import pieChart from "./views/pieChart/pieChart";
import SteplineChart from "./views/SteplineChart/SteplineChart"
import lineChart from "./views/lineChart/lineChart"
import { BiBarChartAlt2, BiLineChart } from "react-icons/bi";
import { MdTimeline } from "react-icons/md";
import { FaChartPie } from "react-icons/fa";



const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "login",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: login,
    layout: "/admin"
  },
  {
    path: "/Bar_chart",
    name: "Bar chart",
    rtlName: "لوحة القيادة",
    icon: BiBarChartAlt2,
    component: Bar_chart,
    layout: "/admin"
  },
  {
    path: "/pieChart",
    name: "toplantı bazlı grafik",
    rtlName: "لوحة القيادة",
    icon: FaChartPie,
    component: pieChart,
    layout: "/admin"
  },
  {
    path: "/SteplineChart",
    name: "sunucu yoğunluğu",
    rtlName: "لوحة القيادة",
    icon: MdTimeline,
    component: SteplineChart,
    layout: "/admin"
  },
  {
    path: "/lineChart",
    name: "toplantıların günlük süresi",
    rtlName: "لوحة القيادة",
    icon: BiLineChart,
    component: lineChart,
    layout: "/admin"
  },
];

export default dashboardRoutes;
