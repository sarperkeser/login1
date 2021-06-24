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
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";
import "assets/css/material-dashboard-react.css?v=1.9.0";

import i18n from "i18next";
import {initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import LanguageEn from "Language/en"
import LanguageTr from "Language/tr"

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        translation: LanguageEn
      },
      tr: {
        translation: LanguageTr
      },
    },
    //lng: "tr",
    fallbackLng: "tr",

    detection: {
      order: ["cookie", "sessionStorage"],
      caches: ["cookie"],
    },
  });

const hist = createBrowserHistory();

ReactDOM.render(
  
  <Router history={hist}>

    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/rtl" component={RTL} />
      <Redirect from="/" to="/admin/dashboard" />
    </Switch>
  </Router>,

  document.getElementById("root")
);
