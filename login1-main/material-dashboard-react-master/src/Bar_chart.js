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
import { data_day, data_week, data_month } from "./variables/charts";

am4core.useTheme(am4themes_animated);
const useStyles = makeStyles(styles);

export default function Bar_chart() {
  const [data, setdata3] = useState(data_day);
  function grap() {
    let chart = am4core.create("chartdiv", am4charts.XYChart);

    chart.data = data;

    let data_ıd = data.find((element) => (element = "id"));
    data_ıd = data_ıd.id;

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = data_ıd;
    categoryAxis.title.text = data_ıd;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "number of meeting";
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "recorded meeting";
    series.dataFields.categoryX = data_ıd;
    return <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>;
  }

  function Chagen_Data(event) {
    const value = event.target.value;
    if (value === "day") {
      setdata3(data_day);
    } else if (value === "week") {
      setdata3(data_week);
    } else if (value === "month") {
      setdata3(data_month);
    }
  }
  const classes = useStyles();
  useEffect(() => {
    grap();
  });

  return (
    <div>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <GridContainer justify="center">
              <CardHeader color="warning">
                <label className={classes.selectingName}>Choose time: </label>

                <select
                  className={classes.selectingName}
                  onChange={Chagen_Data}
                  name="time"
                  id="time"
                >
                  <option value="day">day</option>
                  <option value="week">week</option>
                  <option value="month">month</option>
                </select>
              </CardHeader>
            </GridContainer>
            <CardBody>{grap()}</CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
