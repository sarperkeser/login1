import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import styles from "../../css/css";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import Button from "components/CustomButtons/Button.js";
import axios from "axios";
import { useTranslation } from "react-i18next";
import * as am4plugins_timeline from "@amcharts/amcharts4/plugins/timeline";
import CardIcon from "components/Card/CardIcon.js";
import { BiLineChart } from "react-icons/bi";

am4core.useTheme(am4themes_animated);
const useStyles = makeStyles(styles);

export default function BarChart(props) {
  const [apiData, setapiData] = useState(null);

  const [format, setFormat] = useState("hours");
  const { t } = useTranslation();

  const classes = useStyles();

  function fetchData() {
    axios
      .get("http://localhost:3000/fakeMeetingServerDist")
      .then((response) => response.data)
      .then((data) => setapiData(data));
  }
  function prepareLineChartData(datajson) {
    if (datajson !== null) {
      const id = datajson.map((element) => element.id.toString());
      const dateYear = datajson.map((element) => element.startAt.slice(0, 4));
      const dateMonth = datajson.map((element) => element.startAt.slice(5, 7));
      const dateDay = datajson.map((element) => element.startAt.slice(8, 10));
      const startTime = datajson.map((element) =>
        element.startAt.slice(11, 19)
      );
      const startHours = startTime.map((element) =>
        parseInt(element.slice(0, 2))
      );
      const startMinute = startTime.map((element) =>
        parseInt(element.slice(3, 5))
      );
      const startSecond = startTime.map((element) =>
        parseInt(element.slice(6, 8))
      );
      const endTime = datajson.map((element) => element.endAt.slice(11, 19));
      const endhours = endTime.map((element) => parseInt(element.slice(0, 2)));
      const endMinute = endTime.map((element) => parseInt(element.slice(3, 5)));
      const endSecond = endTime.map((element) => parseInt(element.slice(6, 8)));
      const arrayTimeSubstitute = [];
      const arrayTime = [];
      if (format === "hours") {
        for (let i = 0; i < id.length; i++) {
          let hours = Math.abs(endhours[i] - startHours[i]);
          let minute = Math.abs(endMinute[i] - startMinute[i]);
          minute = minute / 60;
          let second = Math.abs(endSecond[i] - startSecond[i]);
          second = second / 3600;
          hours = hours + minute + second;
          arrayTimeSubstitute.push({
            id: id[i],
            dataDate: new Date(dateYear[i], dateMonth[i], dateDay[i]),
            time: hours,
          });
        }

        arrayTimeSubstitute.sort(function (a, b) {
          return new Date(a.dataDate) - new Date(b.dataDate);
        });
        for (let i = 0; i < arrayTimeSubstitute.length; i++) {
          let hours = Math.abs(endhours[i] - startHours[i]);
          let minute = Math.abs(endMinute[i] - startMinute[i]);
          minute = minute / 60;
          let second = Math.abs(endSecond[i] - startSecond[i]);
          second = second / 3600;
          hours = hours + minute + second;
          let count = 0;
          for (let x = i + 1; x < arrayTimeSubstitute.length; x++) {
            if (
              arrayTimeSubstitute[i].dataDate.toString() ===
              arrayTimeSubstitute[x].dataDate.toString()
            ) {
              hours = hours + Math.abs(endhours[x] - startHours[x]);
              minute = minute + Math.abs(endMinute[x] - startMinute[x]);
              minute = minute / 60;
              second = second + Math.abs(endSecond[x] - startSecond[x]);
              second = second / 3600;
              hours = hours + minute + second;
              count = count + 1;
            }
          }
          arrayTime.push({
            id: id[i],
            dataDate: new Date(dateYear[i], dateMonth[i], dateDay[i]),
            time: hours,
          });
          i = i + count;
        }

        arrayTime.sort(function (a, b) {
          return new Date(a.dataDate) - new Date(b.dataDate);
        });
        return arrayTime;
      } else if (format === "minute") {
        for (let i = 0; i < id.length; i++) {
          let hours = Math.abs(endhours[i] - startHours[i]);
          hours = hours * 60;
          let minute = Math.abs(endMinute[i] - startMinute[i]);
          let second = Math.abs(endSecond[i] - startSecond[i]);
          second = second / 60;
          minute = hours + minute + second;
          arrayTimeSubstitute.push({
            id: id[i],
            dataDate: new Date(dateYear[i], dateMonth[i], dateDay[i]),
            time: minute,
          });
        }
        arrayTimeSubstitute.sort(function (a, b) {
          return new Date(a.dataDate) - new Date(b.dataDate);
        });
        for (let i = 0; i < arrayTimeSubstitute.length; i++) {
          let hours = Math.abs(endhours[i] - startHours[i]);
          hours = hours * 60;
          let minute = Math.abs(endMinute[i] - startMinute[i]);
          let second = Math.abs(endSecond[i] - startSecond[i]);
          second = second / 60;
          minute = hours + minute + second;
          let count = 0;
          for (let x = i + 1; x < arrayTimeSubstitute.length; x++) {
            if (
              arrayTimeSubstitute[i].dataDate.toString() ===
              arrayTimeSubstitute[x].dataDate.toString()
            ) {
              //console.log("benzer")
              hours = hours + Math.abs(endhours[x] - startHours[x]);
              hours = hours * 60;
              minute = minute + Math.abs(endMinute[x] - startMinute[x]);
              second = second + Math.abs(endSecond[x] - startSecond[x]);
              second = second / 60;
              minute = hours + minute + second;
              count = count + 1;
            }
          }
          arrayTime.push({
            id: id[i],
            dataDate: new Date(dateYear[i], dateMonth[i], dateDay[i]),
            time: minute,
          });
          i = i + count;
        }

        arrayTime.sort(function (a, b) {
          return new Date(a.dataDate) - new Date(b.dataDate);
        });
        return arrayTime;
      } else if (format === "second") {
        for (let i = 0; i < id.length; i++) {
          let hours = Math.abs(endhours[i] - startHours[i]);
          hours = hours * 3600;
          let minute = Math.abs(endMinute[i] - startMinute[i]);
          minute = minute * 60;
          let second = Math.abs(endSecond[i] - startSecond[i]);
          second = hours + minute + second;
          arrayTimeSubstitute.push({
            id: id[i],
            dataDate: new Date(dateYear[i], dateMonth[i], dateDay[i]),
            time: second,
          });
        }
        arrayTimeSubstitute.sort(function (a, b) {
          return new Date(a.dataDate) - new Date(b.dataDate);
        });

        for (let i = 0; i < arrayTimeSubstitute.length; i++) {
          let hours = Math.abs(endhours[i] - startHours[i]);
          hours = hours * 3600;
          let minute = Math.abs(endMinute[i] - startMinute[i]);
          minute = minute * 60;
          let second = Math.abs(endSecond[i] - startSecond[i]);
          second = hours + minute + second;
          let count = 0;
          for (let x = i + 1; x < arrayTimeSubstitute.length; x++) {
            if (
              arrayTimeSubstitute[i].dataDate.toString() ===
              arrayTimeSubstitute[x].dataDate.toString()
            ) {
              //console.log("benzer")
              hours = hours + Math.abs(endhours[x] - startHours[x]);
              hours = hours * 3600;
              minute = minute + Math.abs(endMinute[x] - startMinute[x]);
              minute = minute * 60;
              second = second + Math.abs(endSecond[x] - startSecond[x]);
              second = hours + minute + second;
              count = count + 1;
            }
          }
          arrayTime.push({
            id: id[i],
            dataDate: new Date(dateYear[i], dateMonth[i], dateDay[i]),
            time: second,
          });
          i = i + count;
        }

        arrayTime.sort(function (a, b) {
          return new Date(a.dataDate) - new Date(b.dataDate);
        });

        return arrayTime;
      }
    } else {
      console.log("lineChart için veri yok");
    }
  }
  function lineChart() {
    let chart = am4core.create("linechart", am4charts.XYChart);
    chart.paddingRight = 20;

    chart.data = prepareLineChartData(apiData);

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.fontSize = "15px";
    dateAxis.tooltipDateFormat = "[purple bold font-size: 15px] d MMMM yyyy";

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.title.text = t("totalHoursOfTheMeeting");
    valueAxis.title.fontSize = "15px";
    valueAxis.title.fontWeight = "bold";
    valueAxis.renderer.fontSize = "15px";

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "dataDate";
    series.dataFields.valueY = "time";
    series.tooltipText =
      "[purple bold font-size: 20px]{valueY}[/]";
    series.fillOpacity = 0.3;

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineY.opacity = 0;

    //dateAxis.start = 0;
    dateAxis.keepSelection = true;
    return (
      <div id="linechart" style={{ width: "100%", height: "500px" }}></div>
    );
  }
  function ChoseFormat(format, event) {
    //event.preventDefault();
    switch (format) {
      case "hour":
        return setFormat("hours");
      case "minute":
        return setFormat("minute");
      case "second":
        return setFormat("second");
      default:
        return setFormat("hours");
    }
  }
  useEffect(() => {
    fetchData();
    lineChart();
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
                    <BiLineChart className={classes.iconsStyle}></BiLineChart>
                  </h1>
                </CardIcon>
                <h2 className={classes.chartsHeadStyle}>
                  {t("dailyDurationOfMeetings")}
                </h2>
                <label className={classes.chartsHeadStyle}>
                  {t("ChoseFormat")}:{" "}
                </label>
                <Button onClick={ChoseFormat.bind(this, "hour")} color="rose">
                  {t("hour")}
                </Button>
                <Button onClick={ChoseFormat.bind(this, "minute")} color="rose">
                  {t("minute")}
                </Button>
                <Button onClick={ChoseFormat.bind(this, "second")} color="rose">
                  {t("second")}
                </Button>
              </CardHeader>
              <CardBody>{lineChart()}</CardBody>
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
