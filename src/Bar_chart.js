import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import styles from "./css/css";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import Button from "components/CustomButtons/Button.js";
import axios from "axios";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

am4core.useTheme(am4themes_animated);
const useStyles = makeStyles(styles);

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        translation: {
          changeLanguage: "change Language",
          chosenLanguage: "chosen Language: en",
          selectedLanguage: "en",
          ChooseTime: "Choose Time: ",
          day: "day",
          week: "week",
          month: "month",
          numberOfMeeting: "number of meeting",
          alert: "not exist weekly data",
          login: "please login",
        },
      },
      tr: {
        translation: {
          changeLanguage: "dili değiştir",
          chosenLanguage: "seçilen dil: tr",
          selectedLanguage: "tr",
          ChooseTime: "Zamanı seç:",
          day: "gün",
          week: "hafta",
          month: "ay",
          numberOfMeeting: " toplantı sayısı",
          alert: "haftalık veri yok",
          login: "lütfen giriş yapın",
        },
      },
    },
    //lng: "tr",
    fallbackLng: "tr",

    detection: {
      order: ["cookie", "sessionStorage"],
      caches: ["cookie"],
    },
  });

export default function BarChart(props) {
  const [apiData, setapiData] = useState(null);
  const [time, setTime] = useState("day");
  const [xAxisTitle, setxAxisTitle] = useState("gün");
  const { t } = useTranslation();
  function grap() {
    let chart = am4core.create("chartdiv", am4charts.XYChart);
    let fakeData = prepareData(apiData);
    //console.log("fake", fakeData);
    chart.data = fakeData;

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "day";
    categoryAxis.title.text = xAxisTitle;
    categoryAxis.title.fontWeight = "bold";
    categoryAxis.title.fontSize = "15px";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.fontSize = "15px";

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    valueAxis.title.text = t("numberOfMeeting");
    valueAxis.title.fontWeight = "bold";
    valueAxis.title.fontSize = "15px";
    valueAxis.renderer.fontSize = "15px";
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "number_of_meeting";
    series.dataFields.categoryX = "day";
    series.name = "Number_Of_Meeting";
    series.columns.template.tooltipText =
      "[bold font-size: 20px blue]{categoryX}: [purple bold font-size: 20px]{valueY}[/]";

    return <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>;
  }

  function changeTime(time, event) {
    switch (time) {
      case "day":
        setxAxisTitle(t("day"));
        return setTime("day");
      case "week":
        setxAxisTitle(t("week"));
        return setTime("week");
      case "month":
        setxAxisTitle(t("month"));
        return setTime("month");
      default:
        setxAxisTitle(t("day"));
        return setTime("day");
    }
  }

  const classes = useStyles();

  function fetchData() {
    axios
      .get("http://localhost:3000/fakeMeeting")
      .then((response) => response.data)
      .then((data) => setapiData(data));
  }

  function prepareData(datajson) {
    if (datajson !== null) {
      if (time === "day") {
        const dataDate = datajson.map((element) =>
          element.room.startAt.slice(0, 10)
        );
        let count = 1;
        const arrayStartAt = [];
        for (let i = 0; i < dataDate.length; i++) {
          for (let x = i + 1; x < dataDate.length; x++) {
            if (dataDate[i] === dataDate[x]) {
              count = count + 1;
              delete dataDate[x];
            }
          }
          if (dataDate[i] !== undefined) {
            arrayStartAt.push({ day: dataDate[i], number_of_meeting: count });
          }
          count = 1;
        }
        //console.log("arrastartat", arrayStartAt);
        return arrayStartAt;
      } else if (time === "week") {
        alert(t("alert"));
      } else if (time === "month") {
        const dataDate = datajson.map((element) =>
          element.room.startAt.slice(0, 7)
        );
        let count = 1;
        const arrayStartAt = [];
        for (let i = 0; i < dataDate.length; i++) {
          for (let x = i + 1; x < dataDate.length; x++) {
            if (dataDate[i] === dataDate[x]) {
              count = count + 1;
              delete dataDate[x];
            }
          }
          if (dataDate[i] !== undefined) {
            arrayStartAt.push({ day: dataDate[i], number_of_meeting: count });
          }
          count = 1;
        }
        //console.log("arrastartat", arrayStartAt);
        return arrayStartAt;
      }
    } else {
      console.log("veri yok");
    }
  }
  function handlerChangeTime() {
    if (time === "day") {
      setxAxisTitle(t("day"));
    } else if (time === "week") {
      setxAxisTitle(t("week"));
    } else if (time === "month") {
      setxAxisTitle(t("month"));
    }
  }

  useEffect(() => {
    handlerChangeTime();
    fetchData();
    grap();
  }, []);
  if (localStorage.getItem("username") || localStorage.getItem("pasword")) {
    return (
      <div>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={12}>
                  <CardHeader color="primary">
                    <label className={classes.selectingName}>
                      {t("ChooseTime")}{" "}
                    </label>
                    <Button onClick={changeTime.bind(this, "day")} color="rose">
                      {t("day")}
                    </Button>
                    <Button
                      onClick={changeTime.bind(this, "week")}
                      color="rose"
                    >
                      {t("week")}
                    </Button>
                    <Button
                      onClick={changeTime.bind(this, "month")}
                      color="rose"
                    >
                      {t("month")}
                    </Button>
                  </CardHeader>
                </GridItem>
              </GridContainer>
              <CardBody>{grap()}</CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  } else {
    alert(t("login"));
    return <div>{t("login")}</div>;
  }
}
