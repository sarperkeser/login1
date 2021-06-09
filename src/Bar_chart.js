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
const resources = {
  en: {
    changeLanguage: "change Language",
    selectedLanguage: "en",
    ChooseTime: "Choose Time: ",
    day: "day",
    week: "week",
    month: "month",
    numberOfMeeting: "number of meeting",
    alert:"not exist weekly data",
    sa: "Welcome to React and react-i18next",
  },
  tr: {
    changeLanguage: "dili değiştir",
    selectedLanguage: "tr",
    ChooseTime: "Zamanı seç:",
    day: "gün",
    week: "hafta",
    month: "ay",
    numberOfMeeting: " toplantı sayısı",
    alert:"haftalık veri yok",
    sa: "tr123",
  },
};

am4core.useTheme(am4themes_animated);
const useStyles = makeStyles(styles);

export default function BarChart() {
  const [lang, setLang] = useState(resources.tr);
  const [selectedLanguage, setSelectedLanguage] = useState("seçili dil: tr");
  const [apiData, setapiData] = useState(null);
  const [Time, setTime] = useState(lang.day);
  function grap() {
    let chart = am4core.create("chartdiv", am4charts.XYChart);
    let fakeData = preperData(apiData);
    console.log(fakeData);
    chart.data = fakeData;

    /*let data_ıd = data.find((element) => (element = "id"));
    data_ıd = data_ıd.id;*/

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "day";
    categoryAxis.title.text = Time;
    categoryAxis.title.fontWeight = "bold";
    categoryAxis.title.fontSize = "15px";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.fontSize = "15px";

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    valueAxis.title.text = lang.numberOfMeeting;
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
        return setTime(lang.day);
      case "week":
        return setTime(lang.week);
      case "month":
        return setTime(lang.month);
      default:
        return setTime(lang.day);
    }
  }

  const classes = useStyles();

  async function fetchData() {
    const response = await axios.get("http://localhost:3000/fakeMeeting");
    const datajson = response.data;
    setapiData(datajson);
  }

  useEffect(() => {
    fetchData();
    grap();
  }, []);
  function preperData(datajson) {
    if (datajson !== null) {
      if (Time === "day" || Time === "gün") {
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
        return arrayStartAt;
      } else if (Time === "week" || Time === "hafta") {
        alert(lang.alert);
      } else if (Time === "month" || Time === "ay") {
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
        return arrayStartAt;
      }
    } else {
      console.log("veri yok");
    }
  }
  //const [lang, setLang] = useState(resources.tr);
  //const [selectedLanguage, setSelectedLanguage] = useState("seçili dil: tr");
  //const { t } = useTranslation();<h2>{t('Welcome to React')}</h2>;
  const swichLang = (e) => {
    //e.preventDefault();
    setSelectedLanguage(
      selectedLanguage === "seçili dil: tr"
        ? "selected language: en"
        : "seçili dil: tr"
    );
    lang === resources.tr ? setLang(resources.en) : setLang(resources.tr);
  };
  //const sa="Welcome to React"
  return (
    <div>
      <Button
        onClick={swichLang}
        className={classes.selectingName}
        color="rose"
      >
        {selectedLanguage}, {lang.changeLanguage}
      </Button>
      {lang.sa}

      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12}>
                <CardHeader color="primary">
                  <label className={classes.selectingName}>
                    {lang.ChooseTime}{" "}
                  </label>
                  <Button onClick={changeTime.bind(this, "day")} color="rose">
                    {lang.day}
                  </Button>
                  <Button onClick={changeTime.bind(this, "week")} color="rose">
                    {lang.week}
                  </Button>
                  <Button onClick={changeTime.bind(this, "month")} color="rose">
                    {lang.month}
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
}
