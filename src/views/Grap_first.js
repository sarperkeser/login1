import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

const styles = {
    cardTitleWhite: {
        color: "#000000",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "30000px",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        fontSize:"15px"
    },
   
    

    
};


am4core.useTheme(am4themes_animated);
const useStyles = makeStyles(styles);



export default function Grap() {

    let data1 = [
        {
            "id": "day",
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
    
    let data2 = [
        {
            "id": "week",
            "week": "firstweek",
            "recorded meeting": 30
        },
        {
            "week": "secondweek",
            "recorded meeting": 40
        },
        {
            "week": "thirdweek",
            "recorded meeting": 50
        },
        {
            "week": "fourthweek ",
            "recorded meeting": 60
        },
        {
            "week": "fifthweek ",
            "recorded meeting": 70
        },
        {
            "week": "sixthhweek ",
            "recorded meeting": 80
        },
        {
            "week": "seventhweek ",
            "recorded meeting": 90
        }
    ];
    let data4 = [
        {
            "id": "month",
            "month": "Jan",
            "recorded meeting": 100
        },
        {
            "month": "Feb",
            "recorded meeting": 200
        },
        {
            "month": "Mar",
            "recorded meeting": 500
        },
        {
            "month": "Apr ",
            "recorded meeting": 700
        },
        {
            "month": "May ",
            "recorded meeting": 100
        },
        {
            "month": "June ",
            "recorded meeting": 400
        },
        {
            "month": "July ",
            "recorded meeting": 50
        }
    ];
    const [data3, setdata3] = useState(data1)
    function grap() {
        let chart = am4core.create("chartdiv", am4charts.XYChart);

        chart.data = data3



        let found = data3.find(element => element = "id");
        found = found.id
        

        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = found;
        categoryAxis.title.text = found;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "number of meeting";
        let series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "recorded meeting";
        series.dataFields.categoryX = found;
        return (<div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>)
    }


    function deneme(event) {
        const value=event.target.value
        if(value==="day"){
            setdata3(data1)
        }else if (value==="week"){
            setdata3(data2)
        }else if( value==="month"){
            setdata3(data4)
        }
        

    }
    const classes = useStyles();
    useEffect(() => {

        grap()
    });
    const mystyle = {
        color: "red",
        fontSize:"15px",
        
        
        
      };
    return (
        <div>
            
            <GridContainer justify='center'>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <GridContainer justify='center'>
                            <CardHeader color= "warning" >
                                <label  className={classes.cardTitleWhite}>Choose time:</label>

                                <select style={mystyle} onChange={deneme} name="time" id="time">
                                    <option value="day">day</option>
                                    <option value="week">week</option>
                                    <option value="month">month</option>
                                    
                                </select>
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
