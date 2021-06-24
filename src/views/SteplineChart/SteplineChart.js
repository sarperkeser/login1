import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
//import styles from "../../css/css";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import axios from "axios";
import { useTranslation } from "react-i18next";
import * as am4plugins_timeline from "@amcharts/amcharts4/plugins/timeline";
import CardIcon from "components/Card/CardIcon.js";
import { MdTimeline } from "react-icons/md";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  const { t } = useTranslation();
  const [apiData, setapiData] = useState(null);

  function fetchData() {
    axios
      .get("http://localhost:3000/fakeMeetingServerDist")
      .then((response) => response.data)
      .then((data) => setapiData(data));
  }
  function SteplineChart() {
    let chart = am4core.create("Stepline", am4plugins_timeline.SerpentineChart);
    chart.levelCount = 3;

    chart.curveContainer.padding(50, 20, 50, 20);
    chart.data = prepareSteplineChartData(apiData);

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    dateAxis.renderer.line.disabled = true;
    dateAxis.cursorTooltipEnabled = false;
    dateAxis.minZoomCount = 5;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.innerRadius = -50;
    valueAxis.renderer.radius = 50;
    chart.seriesContainer.zIndex = -1;

    let series = chart.series.push(
      new am4plugins_timeline.CurveStepLineSeries()
    );
    series.fillOpacity = 0.3;
    series.dataFields.dateX = "dataDate";
    series.dataFields.valueY = "serverCount";
    series.tooltipText =
      "[bold font-size: 15px #062288]{dateX} : [bold font-size: 15px #90086a]{valueY}";
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.background.fillOpacity = 0.5;
    series.fill = "#089089"; //chart.colors.getIndex(10);
    series.strokeWidth = 2;

    chart.cursor = new am4plugins_timeline.CurveCursor();
    chart.cursor.xAxis = dateAxis;
    chart.cursor.yAxis = valueAxis;
    chart.cursor.lineY.disabled = true;

    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX.width = am4core.percent(80);
    chart.scrollbarX.align = "center";
    return <div id="Stepline" style={{ width: "100%", height: "500px" }}></div>;
  }
  function prepareSteplineChartData(datajson) {
    if (datajson !== null) {
      //const id = datajson.map((element) => element.id.toString());
      const dateYear = datajson.map((element) => element.startAt.slice(0, 4));
      const dateMonth = datajson.map((element) => element.startAt.slice(5, 7));
      const dateDay = datajson.map((element) => element.startAt.slice(8, 10));
      const server = datajson.map((element) => element.server);
      let serverNumber = [];
      for (let i = 0; i < server.length; i++) {
        let count = 1;
        for (let x = i + 1; x < server.length; x++) {
          if (
            new Date(dateYear[i], dateMonth[i], dateDay[i]).toString() ===
            new Date(dateYear[x], dateMonth[x], dateDay[x]).toString()
          ) {
            count++;
            delete server[x];
          }
        }
        if (server[i] !== undefined) {
          serverNumber.push({
            dataDate: new Date(dateYear[i], dateMonth[i], dateDay[i]),
            serverCount: count,
          });
        }
      }
      
      return serverNumber;
    } else {
      console.log("SteplineChart için veri yok");
    }
  }

  useEffect(() => {
    fetchData();
    SteplineChart();
  }, []);
  if (localStorage.getItem("username") || localStorage.getItem("pasword")) {
    return (
      <div>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <CardIcon color="warning">
                  <h1>
                    <MdTimeline className={classes.iconsStyle}></MdTimeline>
                  </h1>
                </CardIcon>
                <h3 className={classes.cardTitleWhite}>
                  {t("serverIntensity")}
                </h3>
              </CardHeader>
              <CardBody>{SteplineChart()}</CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  } else {
    return (
      <div>
        <SnackbarContent message={t("login")} close color="danger" />
        {setTimeout(() => {
          window.location.href = "http://localhost:3001/admin/login";
        }, 2000)}
      </div>
    );
  }
}
