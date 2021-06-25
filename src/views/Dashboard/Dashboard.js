import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import axios from "axios";
import { useTranslation } from "react-i18next";
//import styles from "../../css/css";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import CardIcon from "components/Card/CardIcon.js";
import { SiGooglehangoutsmeet } from "react-icons/si";
import { HiUser } from "react-icons/hi";
import CardFooter from "components/Card/CardFooter.js";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const { t } = useTranslation();
  const classes = useStyles();
  const [apiData, setapiData] = useState(null);
  const [fakeMeetingServerDistData, setFakeMeetingServerDistData] = useState(
    null
  );

  function fetchData() {
    axios
      .get("http://localhost:3000/badges")
      .then((response) => response.data)
      .then((data) => setapiData(data));
  }
  function preparedData(apiData) {
    if (apiData !== null) {
      const meetingCount = apiData.map((element) => element.meetingCount);
      const activeMeetingCount = apiData.map(
        (element) => element.activeMeetingCount
      );
      const activeParticipantCount = apiData.map(
        (element) => element.activeParticipantCount
      );
      const dataArray = [];
      for (let index = 0; index < meetingCount.length; index++) {
        dataArray.push(
          meetingCount[index],
          activeMeetingCount[index],
          activeParticipantCount[index]
        );
      }
      //console.log("dataArray", dataArray[0]);
      return dataArray;
    } else {
      //console.log("data yok");
      return [];
    }
  }
  const data = [];
  data.push(preparedData(apiData));
  //console.log("data", data[0][0]);
  //console.log("apidata",apiData);
  function fetchFakeMeetingServerDist() {
    axios
      .get("http://localhost:3000/fakeMeetingServerDist")
      .then((response) => response.data)
      .then((data) => setFakeMeetingServerDistData(data));
  }
  function preparedChartDate() {
    if (fakeMeetingServerDistData !== null) {
      var curr = new Date();
      var first = curr.getDate() - curr.getDay() + 1;
      var last = first + 6;
      var days = first;
      var firstday = new Date(curr.setDate(first));
      var lastday = new Date(curr.setDate(last));
      const week = [];
      for (let index = 0; index < 7; index++) {
        week.push({
          day: new Date(curr.setDate(days)),
        });
        days++;
      }

      const Stringdate = fakeMeetingServerDistData.map((element) =>
        element.startAt.slice(0, 10)
      );

      const date = [];
      for (let index = 0; index < Stringdate.length; index++) {
        for (let i = 0; i < 7; i++) {
          if (Stringdate[index] === week[i].day.toISOString().slice(0, 10)) {
            date.push({
              days: new Date(Stringdate[index]),
            });
          }
        }
      }
      var count = 1;
      const countData = [];
      for (let index = 0; index < date.length; index++) {
        for (let i = 1; i < date.length; i++) {
          if (date[index].days.toISOString() === date[i].days.toISOString()) {
            count++;
          }
        }
        countData.push({
          count: count,
          days: date[index].days,
        });
        index = index + count;
        count = 1;
      }

      //console.log("countData", countData);
      return countData;
    } else {
      console.log("date veri yok");
      return [];
    }
  }
  function barChart() {
    let chart = am4core.create("barChart", am4charts.XYChart);
    //chart.scrollbarX = new am4core.Scrollbar();
    // Add data
    /*var rect = container.createChild(am4core.Rectangle);
    rect.width = 200;
    rect.height = 100;*/
    chart.data = preparedChartDate();

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    //dateAxis.dataFields.category = "country";
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.minGridDistance = 30;
    dateAxis.renderer.labels.template.horizontalCenter = "right";
    dateAxis.renderer.labels.template.verticalCenter = "middle";
    dateAxis.renderer.labels.template.rotation = 270;

    dateAxis.tooltip.disabled = true;
    dateAxis.renderer.minHeight = 110;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minWidth = 50;

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.dateX = "days";
    series.sequencedInterpolation = true;
    series.dataFields.valueY = "count";
    //series.dataFields.categoryX = "country";
    series.tooltipText = "{valueY}[/]";
    series.columns.template.strokeWidth = 0;

    series.tooltip.pointerOrientation = "vertical";

    series.columns.template.column.cornerRadiusTopLeft = 10;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.fillOpacity = 0.8;

    let hoverState = series.columns.template.column.states.create("hover");
    hoverState.properties.cornerRadiusTopLeft = 0;
    hoverState.properties.cornerRadiusTopRight = 0;
    hoverState.properties.fillOpacity = 1;

    series.columns.template.adapter.add("fill", function (fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    chart.cursor = new am4charts.XYCursor();
    return <div id="barChart" style={{ width: "100%", height: "400px" }}></div>;
  }
  function preparedTriangleDate() {
    if (fakeMeetingServerDistData !== null) {
      const server = fakeMeetingServerDistData.map((element) => element.server);
      const date = fakeMeetingServerDistData.map((element) =>
        element.startAt.slice(0, 10)
      );
      //console.log("server",server)
      const d = new Date();
      //console.log(d.toISOString().slice(0, 10));
      var count = 1;
      const serverCount = [];
      for (let index = 0; index < server.length; index++) {
        if (d.toISOString().slice(0, 10) === date[index]) {
          for (let i = 1; i < server.length; i++) {
            if (server[index] === server[i]&&d.toISOString().slice(0, 10)===date[i]) {
              count++;
            }

          }
          serverCount.push({
            serverName: server[index],
            count: count,
          });
          index=index+count;
          count=1;
        }
      }
      //console.log("serverCount",serverCount)
      return serverCount
    } else {
      console.log("TriangleDate veri yok");
      return []
    }
  }
  function TriangleColumnChart() {
    am4core.useTheme(am4themes_animated);
    // Themes end

    let chart = am4core.create("TriangleColumnChart", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

    chart.data = preparedTriangleDate();
    /*[
      {
        country: "One",
        value: 3025,
      },
      {
        country: "Two",
        value: 1882,
      },
      {
        country: "Three",
        value: 1809,
      },
      {
        country: "Four",
        value: 1322,
      },
      {
        country: "Five",
        value: 1122,
      },
      {
        country: "Six",
        value: -1114,
      },
      {
        country: "Seven",
        value: -984,
      },
      {
        country: "Eight",
        value: 711,
      },
      {
        country: "Nine",
        value: 665,
      },
      {
        country: "Ten",
        value: -580,
      },
      {
        country: "Eleven",
        value: 443,
      },
      {
        country: "Twelve",
        value: 441,
      },
    ];*/

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "serverName";
    categoryAxis.renderer.minGridDistance = 40;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    let series = chart.series.push(new am4charts.CurvedColumnSeries());
    series.dataFields.categoryX = "serverName";
    series.dataFields.valueY = "count";
    series.tooltipText = "{valueY}";
    series.columns.template.strokeOpacity = 0;
    series.columns.template.tension = 1;

    series.columns.template.fillOpacity = 0.75;

    let hoverState = series.columns.template.states.create("hover");
    hoverState.properties.fillOpacity = 1;
    hoverState.properties.tension = 0.8;

    chart.cursor = new am4charts.XYCursor();

    // Add distinctive colors for each column using adapter
    series.columns.template.adapter.add("fill", function (fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    //chart.scrollbarX = new am4core.Scrollbar();
    //chart.scrollbarY = new am4core.Scrollbar();
    return (
      <div
        id="TriangleColumnChart"
        style={{ width: "100%", height: "400px" }}
      ></div>
    );
  }
  useEffect(() => {
    fetchData();
    fetchFakeMeetingServerDist();
    barChart();
  }, []);
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader stats icon>
              <CardIcon color="warning">
                <h1>
                  <SiGooglehangoutsmeet></SiGooglehangoutsmeet>
                </h1>
              </CardIcon>
              <p className={classes.cardCategory}>{t("meetingCount")}</p>
              <h2 className={classes.cardTitle}>{data[0][0]}</h2>
            </CardHeader>
            <CardFooter stats></CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader stats icon>
              <CardIcon color="warning">
                <h1>
                  <SiGooglehangoutsmeet></SiGooglehangoutsmeet>
                </h1>
              </CardIcon>
              <p className={classes.cardCategory}>{t("activeMeetingCount")}</p>
              <h2 className={classes.cardTitle}>{data[0][1]}</h2>
            </CardHeader>
            <CardFooter stats></CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader stats icon>
              <CardIcon color="warning">
                <h1>
                  <HiUser></HiUser>
                </h1>
              </CardIcon>
              <p className={classes.cardCategory}>
                {t("activeParticipantCount")}
              </p>
              <h2 className={classes.cardTitle}>{data[0][2]}</h2>
            </CardHeader>
            <CardFooter stats></CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">{barChart()}</CardHeader>
            <CardBody>
              <h3 className={classes.cardTitle}>{t("numberOfMeetingsPerDay")}</h3>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">{TriangleColumnChart()}</CardHeader>
            <CardBody>
              <h3 className={classes.cardTitle}>{t("serverDensityInDailyMeetings")}</h3>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
