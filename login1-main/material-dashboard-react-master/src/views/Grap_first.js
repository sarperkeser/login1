import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);
const useStyles = makeStyles(styles);

function grap() {
    let chart = am4core.create("chartdiv", am4charts.XYChart);

    chart.data = [
        {
            "day": "Monday",
            "recorded meeting": 10
        },
        {
            "day": "Tuesday",
            "recorded meeting": 11
        },
        {
            "day": "Wednesday",
            "recorded meeting": 15
        },
        {
            "day": "Thursday ",
            "recorded meeting": 7
        },
        {
            "day": "Friday ",
            "recorded meeting": 27
        },
        {
            "day": "Saturday ",
            "recorded meeting": 3
        },
        {
            "day": "Sunday ",
            "recorded meeting": 4
        }
    ];
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "day";
    categoryAxis.title.text = "days";

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "number of meeting";
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "recorded meeting";
    series.dataFields.categoryX = "day";
    return (<div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>)
}

export default function Dashboard() {
    const classes = useStyles();
    useEffect(() => {
        grap()
      });

    return (
        <div>
            <GridContainer justify='center'>
                <GridItem xs={12} sm={6} md={12}>
                    <Card>
                        <GridContainer justify='center'>
                            <CardHeader color="warning">
                                <h3 className={classes.cardTitle}>
                                    grap_first
                                </h3>
                            </CardHeader>
                        </GridContainer>

                        <CardBody>
                            {grap()}
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}
