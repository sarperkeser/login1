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
import CardIcon from "components/Card/CardIcon.js";
import { FaChartPie } from "react-icons/fa";
import Select from "react-select";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";

const useStyles = makeStyles(styles);
const selectedStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: "1px dotted pink",
    color: state.isSelected ? "red" : "blue",
    padding: 20,
    fontSize: 13,
  }),
};
export default function Dashboard() {
  const classes = useStyles();
  const { t } = useTranslation();
  const [apiData, setapiData] = useState(null);
  const [name, setName] = useState("Toplantı 1");
  function fetchData() {
    axios
      .get("http://localhost:3000/fakeMeetingServerDist")
      .then((response) => response.data)
      .then((data) => setapiData(data));
  }
  function prepareLineChartData(apiData) {
    if (apiData !== null) {
      const name = apiData.map((element) => element.name);
      const surveyCount = apiData.map((element) => element.surveyCount);
      const screenShareCount = apiData.map(
        (element) => element.screenShareCount
      );
      const participantCount = apiData.map(
        (element) => element.participantCount
      );
      const arrayPieChart = [];
      for (let index = 0; index < name.length; index++) {
        arrayPieChart.push({
          name: name[index],
          value: {
            surveyCount: surveyCount[index],
            screenShareCount: screenShareCount[index],
            participantCount: participantCount[index],
          },
        });
      }
      //console.log(arrayPieChart)
      return arrayPieChart;
    } else {
      console.log("apidata boş");
    }
  }

  function pieChart() {
    // Create chart instance
    let chart = am4core.create("pieChart", am4charts.PieChart);
    const data = prepareLineChartData(apiData);
    const pieChartData = [];
    if (data) {
      for (let index = 0; index < data.length; index++) {
        if (name === data[index].name) {
          pieChartData.push(
            {
              activity: t("surveyCount"),
              value: data[index].value.surveyCount,
            },
            {
              activity: t("screenShareCount"),
              value: data[index].value.screenShareCount,
            },
            {
              activity: t("participantCount"),
              value: data[index].value.screenShareCount,
            }
          );
        }
      }
    }

    chart.data = pieChartData;

    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "value";
    pieSeries.dataFields.category = "activity";
    pieSeries.labels.template.fontSize = "15px";
    pieSeries.labels.template.fontWeight = "bold";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeOpacity = 1;
    pieSeries.slices.template.tooltipText =
      "[bold font-size: 20px]{category}:[bold font-size: 20px]{value}[/] ";
    return <div id="pieChart" style={{ width: "100%", height: "500px" }}></div>;
  }

  function meetingName() {
    if (apiData !== null) {
      const name = apiData.map((element) => element.name);
      const option = [];
      for (let index = 0; index < name.length; index++) {
        option.push({ value: name[index], label: name[index] });
      }

      console.log(name);
      console.log(option);
      return (
        <Select
          onChange={(e) => {
            setName(e.value);
          }}
          styles={selectedStyles}
          options={option}
        />
      );
    } else {
      console.log("apidata boş");
    }
  }
  useEffect(() => {
    fetchData();
    pieChart();
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
                    <FaChartPie></FaChartPie>
                  </h1>
                </CardIcon>
                {meetingName()}
                <GridContainer justify="center">
                  <h3 className={classes.cardTitleWhite}>{name}</h3>
                </GridContainer>
              </CardHeader>
              <CardBody>{pieChart()}</CardBody>
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
