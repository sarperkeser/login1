import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import axios from "axios";
import { useTranslation } from "react-i18next";
import styles from "../../css/css";
//import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

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
      const meetingCount= apiData.map((element) => element.meetingCount);
      const activeMeetingCount=apiData.map((element) => element.activeMeetingCount);
      const activeParticipantCount=apiData.map((element) => element.activeParticipantCount);
      const dataArray=[]
      for (let index = 0; index < meetingCount.length; index++) {
        dataArray.push(
          meetingCount[index],
          activeMeetingCount[index],
          activeParticipantCount[index],
        )
      }
      console.log("dataArray",dataArray[0]);
      return dataArray;
    }else{
      console.log("data yok")
      return []
    }
  }
  const data=[]
  data.push(preparedData(apiData))
  console.log("data",data[0][0]);
  //console.log("apidata",apiData);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <h1>{t("changeLanguage")}</h1>
      <GridContainer>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="primary" stats>
              <p className={classes.cardTitle}>
                Bugün oluşturulan toplantı sayısı
              </p>
            </CardHeader>
            <CardBody>
              <p className={classes.cardBody}>{data[0][0]}</p>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="primary" stats>
              <p className={classes.cardTitle}>Aktif toplantı sayısı</p>
            </CardHeader>
            <CardBody>
              <p className={classes.cardBody}>{data[0][1]}</p>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="primary" stats>
              <p className={classes.cardTitle}>Aktif kullanıcı sayısı</p>
            </CardHeader>
            <CardBody>
              <p className={classes.cardBody}>{data[0][2]}</p>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
