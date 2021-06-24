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


const useStyles = makeStyles(styles);

export default function Dashboard() {
  const { t } = useTranslation();
  const classes = useStyles();
  const [apiData, setapiData] = useState(null);

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
      console.log("dataArray", dataArray[0]);
      return dataArray;
    } else {
      console.log("data yok");
      return [];
    }
  }
  const data = [];
  data.push(preparedData(apiData));
  console.log("data", data[0][0]);
  //console.log("apidata",apiData);

  useEffect(() => {
    fetchData();
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
    </div>
  );
}
