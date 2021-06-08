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

am4core.useTheme(am4themes_animated);
const useStyles = makeStyles(styles);

export default function Bar_chart() {
  const [apiData, setapiData] = useState(null);
  const [changeTime, setchangeTime] = useState("day");
  function grap() {
    let chart = am4core.create("chartdiv", am4charts.XYChart);
    let fakeData = fakedata(apiData);
    console.log(fakeData);
    chart.data = fakeData;

    /*let data_ıd = data.find((element) => (element = "id"));
    data_ıd = data_ıd.id;*/

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "day";
    categoryAxis.title.text = changeTime;
    categoryAxis.title.fontWeight = "bold";
    categoryAxis.title.fontSize = "15px";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.fontSize = "15px";

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    valueAxis.title.text = "number of meeting";
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

  function Chagen_Time(event) {
    const value = event.target.value;
    console.log(value);
    if (value === "day") {
      setchangeTime("day");
    } else if (value === "week") {
      setchangeTime("week");
    } else if (value === "month") {
      setchangeTime("month");
    }
  }
  const classes = useStyles();

  async function fetchData(dispatch) {
    const url = "http://localhost:3000/fakeMeeting";
    const response = await fetch(url);
    const datajson = await response.json();
    console.log("datajson", datajson);
    setapiData(datajson);
    console.log("data1", apiData);
  }

  useEffect(() => {
    fetchData();
    grap();
  }, []);
  function fakedata(datajson) {
    if (datajson !== null) {
      if (changeTime === "day") {
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
      } else if (changeTime === "week") {
        alert("haftalık veri yok");
      } else if (changeTime === "month") {
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
  return (
    <div>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12}>
                <CardHeader color="primary">
                  <label className={classes.selectingName}>Choose time: </label>
                  <Button onClick={Chagen_Time} color="rose" value="day">
                    GÜN
                  </Button>
                  <Button onClick={Chagen_Time} color="rose" value="week">
                    HAFTA
                  </Button>
                  <Button onClick={Chagen_Time} color="rose" value="month">
                    AY
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
